import { useState } from "react";
import CreateTeamModal from "../CreateTeamModal";
import { Button } from "@/components/ui/button";
import avatar1 from "@assets/generated_images/Male_CS_student_avatar_287c4fc6.png";
import avatar2 from "@assets/generated_images/Female_engineer_student_avatar_991821ab.png";

export default function CreateTeamModalExample() {
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([
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
  ]);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <CreateTeamModal
        open={open}
        onOpenChange={setOpen}
        selectedMembers={selectedMembers}
        onRemoveMember={(id) =>
          setSelectedMembers(selectedMembers.filter((m) => m.id !== id))
        }
        onCreateTeam={(data) => {
          console.log("Team created:", data);
          setOpen(false);
        }}
      />
    </div>
  );
}
