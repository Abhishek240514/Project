import TeamCard from "../TeamCard";
import avatar1 from "@assets/generated_images/Male_CS_student_avatar_287c4fc6.png";
import avatar2 from "@assets/generated_images/Female_engineer_student_avatar_991821ab.png";

export default function TeamCardExample() {
  const team = {
    id: "1", eventName, eventDate, requiredTechStack, "Node.js", "MongoDB", "Python", "AWS"], teamSize, description, members, name, avatar, graduationYear, skills, techStack,
      }, {
        id, name, avatar, graduationYear, skills, techStack,
      },
    ],
  };

  return (
    <div className="p-6">
      <TeamCard team={team} onViewDetails={(t) => console.log("View:", t.eventName)} />
    </div>
  );
}
