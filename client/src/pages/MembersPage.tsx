import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MemberCard, { type Member } from "@/components/MemberCard";
import FilterSidebar from "@/components/FilterSidebar";
import CreateTeamModal from "@/components/CreateTeamModal";
import Header from "@/components/Header";

import avatar1 from "@assets/generated_images/Male_CS_student_avatar_287c4fc6.png";
import avatar2 from "@assets/generated_images/Female_engineer_student_avatar_991821ab.png";
import avatar3 from "@assets/generated_images/Data_science_student_avatar_170bc2a7.png";
import avatar4 from "@assets/generated_images/Design_student_avatar_d910586d.png";
import avatar5 from "@assets/generated_images/Cybersecurity_student_avatar_49c11639.png";
import avatar6 from "@assets/generated_images/AI_student_avatar_81261bf0.png";

// todo: remove mock functionality
const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Arjun Patel",
    avatar: avatar1,
    graduationYear: 2025,
    skills: ["Leadership", "Product Management", "UI/UX Design", "Data Analysis"],
    techStack: ["React", "Node.js", "Python", "MongoDB", "AWS"],
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: avatar2,
    graduationYear: 2025,
    skills: ["Full-Stack Development", "System Design", "DevOps", "Agile"],
    techStack: ["TypeScript", "Express", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    id: "3",
    name: "Marcus Rodriguez",
    avatar: avatar3,
    graduationYear: 2026,
    skills: ["Machine Learning", "Data Science", "Statistics", "Research"],
    techStack: ["Python", "TensorFlow", "PyTorch", "Pandas", "Scikit-learn"],
  },
  {
    id: "4",
    name: "Emily Wang",
    avatar: avatar4,
    graduationYear: 2026,
    skills: ["UI/UX Design", "Frontend Development", "Prototyping", "User Research"],
    techStack: ["Figma", "React", "Tailwind CSS", "Framer", "Adobe XD"],
  },
  {
    id: "5",
    name: "James Thompson",
    avatar: avatar5,
    graduationYear: 2027,
    skills: ["Cybersecurity", "Network Security", "Penetration Testing", "Cryptography"],
    techStack: ["Python", "Bash", "C++", "Wireshark", "Metasploit"],
  },
  {
    id: "6",
    name: "Priya Sharma",
    avatar: avatar6,
    graduationYear: 2027,
    skills: ["AI Research", "Deep Learning", "NLP", "Computer Vision"],
    techStack: ["Python", "PyTorch", "Transformers", "CUDA", "OpenCV"],
  },
  {
    id: "7",
    name: "Alex Kim",
    avatar: avatar1,
    graduationYear: 2024,
    skills: ["Mobile Development", "iOS", "Android", "Cross-Platform"],
    techStack: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase"],
  },
  {
    id: "8",
    name: "Sophia Martinez",
    avatar: avatar2,
    graduationYear: 2024,
    skills: ["Backend Development", "Microservices", "API Design", "Database Design"],
    techStack: ["Java", "Spring Boot", "MySQL", "Redis", "RabbitMQ"],
  },
  {
    id: "9",
    name: "David Lee",
    avatar: avatar3,
    graduationYear: 2025,
    skills: ["Cloud Architecture", "Infrastructure", "Site Reliability", "Automation"],
    techStack: ["AWS", "Terraform", "Ansible", "Linux", "Python"],
  },
];

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  const availableYears = useMemo(
    () => Array.from(new Set(MOCK_MEMBERS.map((m) => m.graduationYear))).sort(),
    []
  );

  const availableSkills = useMemo(() => {
    const skills = new Set<string>();
    MOCK_MEMBERS.forEach((m) => m.skills.forEach((s) => skills.add(s)));
    return Array.from(skills).sort();
  }, []);

  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter((member) => {
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
  }, [searchQuery, selectedYears, selectedSkills]);

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
    console.log("Team created:", teamData);
    setSelectedMembers([]);
    setIsCreateTeamOpen(false);
  };

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
