import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MemberCard, { type Member } from "@/components/MemberCard";
import FilterSidebar from "@/components/FilterSidebar";
import CreateTeamModal from "@/components/CreateTeamModal";
import Header from "@/components/Header";
import type { InsertTeam } from "@shared/schema";

export default function MembersPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  const { data: members = [], isLoading } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  const createTeamMutation = useMutation({
    mutationFn: async (teamData: InsertTeam) => {
      return await apiRequest("POST", "/api/teams", teamData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teams"] });
    },
  });

  const availableYears = useMemo(
    () => Array.from(new Set(members.map((m) => m.graduationYear))).sort(),
    [members]
  );

  const availableSkills = useMemo(() => {
    const skills = new Set<string>();
    members.forEach((m) => m.skills.forEach((s) => skills.add(s)));
    return Array.from(skills).sort();
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        searchQuery === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesYear =
        selectedYears.length === 0 || selectedYears.includes(member.graduationYear);

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => member.skills.includes(skill));

      return matchesSearch && matchesYear && matchesSkills;
    });
  }, [members, searchQuery, selectedYears, selectedSkills]);

  const handleAddToTeam = (member: Member) => {
    if (selectedMembers.find((m) => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter((m) => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
  };

  const handleClearFilters = () => {
    setSelectedYears([]);
    setSelectedSkills([]);
  };

  const handleCreateTeam = (teamData: any) => {
    const teamPayload: InsertTeam = {
      eventName: teamData.eventName,
      eventDate: teamData.eventDate,
      requiredTechStack: teamData.requiredTechStack,
      teamSize: teamData.teamSize,
      description: teamData.description || "",
      memberIds: teamData.members.map((m: Member) => m.id),
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
            <p className="text-xl text-muted-foreground">Loading members...</p>
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
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold" data-testid="text-page-title">
                  Member Directory
                </h1>
                <p className="text-muted-foreground mt-1" data-testid="text-members-count">
                  {filteredMembers.length} members found
                </p>
              </div>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search members by name or skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                selectedYears={selectedYears}
                selectedSkills={selectedSkills}
                onYearsChange={setSelectedYears}
                onSkillsChange={setSelectedSkills}
                onClearFilters={handleClearFilters}
                availableYears={availableYears}
                availableSkills={availableSkills}
              />
            </aside>

            <div className="flex-1">
              {filteredMembers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMembers.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onAddToTeam={handleAddToTeam}
                      isSelected={selectedMembers.some((m) => m.id === member.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16" data-testid="empty-state">
                  <p className="text-xl text-muted-foreground">No members found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
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
