import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";

export interface Member {
  id: string;
  name: string;
  avatar: string;
  graduationYear: number;
  skills: string[];
  techStack: string[];
}

interface MemberCardProps {
  member: Member;
  onAddToTeam?: (member: Member) => void;
  isSelected?: boolean;
}

export default function MemberCard({ member, onAddToTeam, isSelected = false }: MemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      className={`p-6 hover-elevate active-elevate-2 transition-all ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      data-testid={`card-member-${member.id}`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="h-16 w-16" data-testid={`avatar-member-${member.id}`}>
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="space-y-1 w-full">
          <h3 className="text-lg font-semibold" data-testid={`text-member-name-${member.id}`}>
            {member.name}
          </h3>
          <Badge
            variant="secondary"
            className="text-xs"
            data-testid={`badge-year-${member.id}`}
          >
            Class of {member.graduationYear}
          </Badge>
        </div>

        <div className="w-full space-y-3">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Skills</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.skills.slice(0, 4).map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs"
                  data-testid={`badge-skill-${member.id}-${idx}`}
                >
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{member.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Tech Stack</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {member.techStack.slice(0, 5).map((tech, idx) => (
                <Badge
                  key={idx}
                  className="text-xs font-mono"
                  data-testid={`badge-tech-${member.id}-${idx}`}
                >
                  {tech}
                </Badge>
              ))}
              {member.techStack.length > 5 && (
                <Badge className="text-xs font-mono">
                  +{member.techStack.length - 5}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {onAddToTeam && (
          <Button
            variant={isSelected ? "default" : "secondary"}
            className="w-full"
            onClick={() => onAddToTeam(member)}
            data-testid={`button-add-to-team-${member.id}`}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isSelected ? "Added" : "Add to Team"}
          </Button>
        )}
      </div>
    </Card>
  );
}
