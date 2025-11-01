import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TeamCard, { type Team } from "@/components/TeamCard";
import CreateTeamModal from "@/components/CreateTeamModal";
import Header from "@/components/Header";
import type { Member } from "@/components/MemberCard";

import avatar1 from "@assets/generated_images/Male_CS_student_avatar_287c4fc6.png";
import avatar2 from "@assets/generated_images/Female_engineer_student_avatar_991821ab.png";
import avatar3 from "@assets/generated_images/Data_science_student_avatar_170bc2a7.png";

// todo: remove mock functionality
const MOCK_TEAMS: Team[] = [
  {
    id: "1",
    eventName: "HackX 2025 - AI Innovation Track",
    eventDate: "2025-03-15",
    requiredTechStack: ["React", "Node.js", "MongoDB", "Python", "TensorFlow"],
    teamSize: 5,
    description: "Building an AI-powered productivity tool that helps students manage their time more effectively using machine learning algorithms.",
    members: [
      {
        id: "1",
        name: "Arjun Patel",
        avatar: avatar1,
        graduationYear: 2025,
        skills: ["Leadership"],
        techStack: ["React"],
      },
      {
        id: "2",
        name: "Sarah Chen",
        avatar: avatar2,
        graduationYear: 2025,
        skills: ["Backend"],
        techStack: ["Node.js"],
      },
      {
        id: "3",
        name: "Marcus Rodriguez",
        avatar: avatar3,
        graduationYear: 2026,
        skills: ["ML"],
        techStack: ["Python"],
      },
    ],
  },
  {
    id: "2",
    eventName: "Startup Weekend - EdTech Challenge",
    eventDate: "2025-04-20",
    requiredTechStack: ["Vue.js", "Firebase", "TypeScript", "Stripe"],
    teamSize: 4,
    description: "Creating a gamified learning platform for K-12 students with real-time collaboration features.",
    members: [
      {
        id: "4",
        name: "Emily Wang",
        avatar: avatar1,
        graduationYear: 2026,
        skills: ["Design"],
        techStack: ["Figma"],
      },
      {
        id: "5",
        name: "James Thompson",
        avatar: avatar2,
        graduationYear: 2027,
        skills: ["Security"],
        techStack: ["TypeScript"],
      },
    ],
  },
];

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const handleViewDetails = (team: Team) => {
    console.log("View team details:", team);
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
  };

  const handleCreateTeam = (teamData: any) => {
    const newTeam: Team = {
      id: String(teams.length + 1),
      ...teamData,
    };
    setTeams([...teams, newTeam]);
    setSelectedMembers([]);
    setIsCreateTeamOpen(false);
    console.log("New team created:", newTeam);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateTeam={() => setIsCreateTeamOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-page-title">
                My Teams
              </h1>
              <p className="text-muted-foreground mt-1" data-testid="text-teams-count">
                {teams.length} active teams
              </p>
            </div>
            <Button
              onClick={() => setIsCreateTeamOpen(true)}
              className="gap-2"
              data-testid="button-create-team"
            >
              <Plus className="h-4 w-4" />
              Create New Team
            </Button>
          </div>

          {teams.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} onViewDetails={handleViewDetails} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16" data-testid="empty-state">
              <p className="text-xl text-muted-foreground">No teams yet</p>
              <p className="text-sm text-muted-foreground mt-2 mb-6">
                Create your first team to get started
              </p>
              <Button onClick={() => setIsCreateTeamOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Team
              </Button>
            </div>
          )}
        </div>
      </main>

      <CreateTeamModal
        open={isCreateTeamOpen}
        onOpenChange={setIsCreateTeamOpen}
        selectedMembers={selectedMembers}
        onRemoveMember={handleRemoveMember}
        onCreateTeam={handleCreateTeam}
      />
    </div>
  );
}
