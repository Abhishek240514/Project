import { type Member, type InsertMember, type Team, type InsertTeam } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Member operations
  getAllMembers(): Promise<Member[]>;
  getMember(id: string): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  
  // Team operations
  getAllTeams(): Promise<Team[]>;
  getTeam(id: string): Promise<Team | undefined>;
  createTeam(team: InsertTeam): Promise<Team>;
  getTeamWithMembers(id: string): Promise<{ team: Team; members: Member[] } | undefined>;
}

export class MemStorage implements IStorage {
  private members: Map<string, Member>;
  private teams: Map<string, Team>;

  constructor() {
    this.members = new Map();
    this.teams = new Map();
  }

  async getAllMembers(): Promise<Member[]> {
    return Array.from(this.members.values());
  }

  async getMember(id: string): Promise<Member | undefined> {
    return this.members.get(id);
  }

  async createMember(insertMember: InsertMember): Promise<Member> {
    const id = randomUUID();
    const member: Member = {
      ...insertMember,
      id,
      createdAt: new Date(),
    };
    this.members.set(id, member);
    return member;
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeam(id: string): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = randomUUID();
    const team: Team = {
      ...insertTeam,
      id,
      createdAt: new Date(),
    };
    this.teams.set(id, team);
    return team;
  }

  async getTeamWithMembers(id: string): Promise<{ team: Team; members: Member[] } | undefined> {
    const team = this.teams.get(id);
    if (!team) {
      return undefined;
    }

    const members = team.memberIds
      .map((memberId) => this.members.get(memberId))
      .filter((m): m is Member => m !== undefined);

    return { team, members };
  }
}

export const storage = new MemStorage();
