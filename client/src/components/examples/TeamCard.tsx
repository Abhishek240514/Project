import TeamCard from "../TeamCard";
import avatar1 from "@assets/generated_images/Male_CS_student_avatar_287c4fc6.png";
import avatar2 from "@assets/generated_images/Female_engineer_student_avatar_991821ab.png";

export default function TeamCardExample() {
  const team = {
    id: "1",
    eventName: "HackX 2025",
    eventDate: "2025-03-15",
    requiredTechStack: ["React", "Node.js", "MongoDB", "Python", "AWS"],
    teamSize: 5,
    description: "Building an AI-powered productivity tool for students",
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
    ],
  };

  return (
    <div className="p-6">
      <TeamCard team={team} onViewDetails={(t) => console.log("View:", t.eventName)} />
    </div>
  );
}
