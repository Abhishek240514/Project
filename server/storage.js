import { randomUUID } from "crypto";

export class MemStorage {
  constructor() {
    this.members = new Map();
    this.teams = new Map();
  }

  async getAllMembers() {
    return Array.from(this.members.values());
  }

  async getMember(id) {
    return this.members.get(id);
  }

  async createMember(insertMember) {
    const id = randomUUID();
    const member = {
      ...insertMember,
      id,
      createdAt: new Date(),
    };
    this.members.set(id, member);
    return member;
  }

  async getAllTeams() {
    return Array.from(this.teams.values());
  }

  async getTeam(id) {
    return this.teams.get(id);
  }

  async createTeam(insertTeam) {
    const id = randomUUID();
    const team = {
      ...insertTeam,
      id,
      createdAt: new Date(),
    };
    this.teams.set(id, team);
    return team;
  }

  async getTeamWithMembers(id) {
    const team = this.teams.get(id);
    if (!team) {
      return undefined;
    }

    const members = team.memberIds
      .map((memberId) => this.members.get(memberId))
      .filter((m) => m !== undefined);

    return { team, members };
  }
}

export const storage = new MemStorage();
