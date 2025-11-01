import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Users, Eye } from "lucide-react";
import type { Member } from "./MemberCard";

export interface Team {
  id: string;
  eventName: string;
  eventDate: string;
  requiredTechStack: string[];
  teamSize: number;
  description: string;
  members: Member[];
}

interface TeamCardProps {
  team: Team;
  onViewDetails?: (team: Team) => void;
}

export default function TeamCard({ team, onViewDetails }: TeamCardProps) {
  const formattedDate = new Date(team.eventDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="p-6 space-y-4 hover-elevate active-elevate-2" data-testid={`card-team-${team.id}`}>
      <div className="space-y-2">
        <h3 className="text-xl font-bold" data-testid={`text-team-name-${team.id}`}>
          {team.eventName}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span data-testid={`text-team-date-${team.id}`}>{formattedDate}</span>
        </div>
      </div>

      {team.description && (
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-team-description-${team.id}`}>
          {team.description}
        </p>
      )}

      {team.requiredTechStack.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {team.requiredTechStack.slice(0, 6).map((tech, idx) => (
              <Badge key={idx} className="text-xs font-mono" data-testid={`badge-team-tech-${team.id}-${idx}`}>
                {tech}
              </Badge>
            ))}
            {team.requiredTechStack.length > 6 && (
              <Badge className="text-xs font-mono">
                +{team.requiredTechStack.length - 6}
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium" data-testid={`text-team-members-count-${team.id}`}>
              {team.members.length}/{team.teamSize} Members
            </span>
          </div>
        </div>

        {team.members.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {team.members.slice(0, 4).map((member, idx) => {
                const initials = member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase();
                return (
                  <Avatar
                    key={member.id}
                    className="h-8 w-8 border-2 border-card"
                    data-testid={`avatar-team-member-${team.id}-${idx}`}
                  >
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
            {team.members.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{team.members.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {onViewDetails && (
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onViewDetails(team)}
          data-testid={`button-view-team-${team.id}`}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      )}
    </Card>
  );
}
