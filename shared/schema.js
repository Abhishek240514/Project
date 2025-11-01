import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  avatar: text("avatar").notNull(),
  graduationYear: integer("graduation_year").notNull(),
  skills: text("skills").array().notNull(),
  techStack: text("tech_stack").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventName: text("event_name").notNull(),
  eventDate: text("event_date").notNull(),
  requiredTechStack: text("required_tech_stack").array().notNull(),
  teamSize: integer("team_size").notNull(),
  description: text("description").notNull(),
  memberIds: text("member_ids").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertMemberSchema = createInsertSchema(members).omit({
  id: true,
  createdAt: true,
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
});
