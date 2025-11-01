import MemberCard from "../MemberCard";
import avatar1 from "@assets/generated_images/Male_CS_student_avatar_287c4fc6.png";

export default function MemberCardExample() {
  const member = {
    id: "1",
    name: "Arjun Patel",
    avatar: avatar1,
    graduationYear: 2025,
    skills: ["Leadership", "Product Management", "UI/UX Design", "Data Analysis"],
    techStack: ["React", "Node.js", "Python", "MongoDB", "AWS"],
  };

  return (
    <div className="p-6">
      <MemberCard member={member} onAddToTeam={(m) => console.log("Added:", m.name)} />
    </div>
  );
}
