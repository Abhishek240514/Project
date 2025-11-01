import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TeamCard from "@/components/TeamCard";
import CreateTeamModal from "@/components/CreateTeamModal";
import Header from "@/components/Header";

export default function TeamsPage() {
  const { toast } = useToast();
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { data: backendTeams = [], isLoading } = useQuery({
    queryKey: ["/api/teams"],
  });

  const { data: members = [] } = useQuery({
    queryKey: ["/api/members"],
  });

  const createTeamMutation = useMutation({
    mutationFn: async (teamData) => {
      return await apiRequest("POST", "/api/teams", teamData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teams"] });
    },
  });

  const teams = backendTeams.map((team) => ({
    ...team,
    members: team.memberIds
      .map((id) => members.find((m) => m.id === id))
      .filter((m) => m !== undefined),
  }));

  const handleViewDetails = (team) => {
    console.log("View team details:", team);
  };

  const handleRemoveMember = (memberId) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
  };

  const handleCreateTeam = (teamData) => {
    const teamPayload = {
      eventName: teamData.eventName,
      eventDate: teamData.eventDate,
      requiredTechStack: teamData.requiredTechStack,
      teamSize: teamData.teamSize,
      description: teamData.description || "",
      memberIds: teamData.members.map((m) => m.id),
    };

    createTeamMutation.mutate(teamPayload, {
      onSuccess: () => {
        setSelectedMembers([]);
        setIsCreateTeamOpen(false);
        toast({
          title: "Team created successfully",
          description: `${teamPayload.eventName} has been created with ${teamPayload.memberIds.length} members.`,
        });
      },
      onError: (error) => {
        console.error("Failed to create team:", error);
        toast({
          title: "Failed to create team",
          description: error instanceof Error ? error.message : "An error occurred while creating the team. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCreateTeam={() => setIsCreateTeamOpen(true)} />
        <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Loading teams...</p>
          </div>
        </main>
      </div>
    );
  }

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
