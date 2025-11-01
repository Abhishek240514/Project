import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMemberSchema, insertTeamSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Member routes
  app.get("/api/members", async (_req, res) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ error: "Failed to fetch members" });
    }
  });

  app.post("/api/members", async (req, res) => {
    try {
      const result = insertMemberSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }
      
      const member = await storage.createMember(result.data);
      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating member:", error);
      res.status(500).json({ error: "Failed to create member" });
    }
  });

  // Team routes
  app.get("/api/teams", async (_req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ error: "Failed to fetch teams" });
    }
  });

  app.get("/api/teams/:id", async (req, res) => {
    try {
      const teamWithMembers = await storage.getTeamWithMembers(req.params.id);
      if (!teamWithMembers) {
        return res.status(404).json({ error: "Team not found" });
      }
      res.json(teamWithMembers);
    } catch (error) {
      console.error("Error fetching team:", error);
      res.status(500).json({ error: "Failed to fetch team" });
    }
  });

  app.post("/api/teams", async (req, res) => {
    try {
      const result = insertTeamSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
      }
      
      // Validate that all member IDs exist
      const allMembers = await storage.getAllMembers();
      const memberIds = new Set(allMembers.map(m => m.id));
      const invalidMemberIds = result.data.memberIds.filter(id => !memberIds.has(id));
      
      if (invalidMemberIds.length > 0) {
        return res.status(400).json({ 
          error: `Invalid member IDs: ${invalidMemberIds.join(", ")}` 
        });
      }
      
      const team = await storage.createTeam(result.data);
      res.status(201).json(team);
    } catch (error) {
      console.error("Error creating team:", error);
      res.status(500).json({ error: "Failed to create team" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
