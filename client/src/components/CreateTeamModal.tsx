import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Calendar, Users, Code } from "lucide-react";
import type { Member } from "./MemberCard";

interface CreateTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMembers: Member[];
  onRemoveMember: (memberId: string) => void;
  onCreateTeam: (teamData: TeamFormData) => void;
}

export interface TeamFormData {
  eventName: string;
  eventDate: string;
  requiredTechStack: string[];
  teamSize: number;
  description: string;
  members: Member[];
}

export default function CreateTeamModal({
  open,
  onOpenChange,
  selectedMembers,
  onRemoveMember,
  onCreateTeam,
}: CreateTeamModalProps) {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [requiredTechStack, setRequiredTechStack] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState(5);
  const [description, setDescription] = useState("");

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techStackInput.trim()) {
      e.preventDefault();
      if (!requiredTechStack.includes(techStackInput.trim())) {
        setRequiredTechStack([...requiredTechStack, techStackInput.trim()]);
      }
      setTechStackInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setRequiredTechStack(requiredTechStack.filter((t) => t !== tech));
  };

  const handleSubmit = () => {
    if (!eventName || !eventDate) {
      console.log("Please fill required fields");
      return;
    }

    onCreateTeam({
      eventName,
      eventDate,
      requiredTechStack,
      teamSize,
      description,
      members: selectedMembers,
    });

    setEventName("");
    setEventDate("");
    setRequiredTechStack([]);
    setTeamSize(5);
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-create-team">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Team</DialogTitle>
          <DialogDescription>
            Set up your team for an upcoming event or project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="event-name" className="text-sm font-medium">
              Event Name *
            </Label>
            <Input
              id="event-name"
              placeholder="e.g., HackX 2025, Product Launch Sprint"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              data-testid="input-event-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-date" className="text-sm font-medium">
              Event Date *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="event-date"
                type="date"
                className="pl-10"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                data-testid="input-event-date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech-stack" className="text-sm font-medium">
              Required Tech Stack
            </Label>
            <Input
              id="tech-stack"
              placeholder="Type and press Enter to add (e.g., React, Python)"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              onKeyDown={handleAddTech}
              data-testid="input-tech-stack"
            />
            {requiredTechStack.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {requiredTechStack.map((tech, idx) => (
                  <Badge
                    key={idx}
                    className="text-xs font-mono"
                    data-testid={`badge-tech-${idx}`}
                  >
                    {tech}
                    <button
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-2 hover:text-destructive"
                      data-testid={`button-remove-tech-${idx}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="team-size" className="text-sm font-medium">
              Team Size
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="team-size"
                type="number"
                min={1}
                max={20}
                className="pl-10"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                data-testid="input-team-size"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of the team goals and project..."
              className="resize-none h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              data-testid="textarea-description"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Team Members ({selectedMembers.length}/{teamSize})
              </Label>
            </div>
            {selectedMembers.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {selectedMembers.map((member) => {
                  const initials = member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase();
                  return (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card hover-elevate"
                      data-testid={`team-member-${member.id}`}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.graduationYear}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemoveMember(member.id)}
                        data-testid={`button-remove-member-${member.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No members selected. Browse members to add them to your team.
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!eventName || !eventDate}
            data-testid="button-create-team"
          >
            Create Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
