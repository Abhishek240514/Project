import { storage } from "./storage.js";

const SEED_MEMBERS = [
  {
    name: "Arjun Patel",
    avatar: "/attached_assets/generated_images/Male_CS_student_avatar_287c4fc6.png",
    graduationYear: 2025,
    skills: ["Leadership", "Product Management", "UI/UX Design", "Data Analysis"],
    techStack: ["React", "Node.js", "Python", "MongoDB", "AWS"],
  },
  {
    name: "Sarah Chen",
    avatar: "/attached_assets/generated_images/Female_engineer_student_avatar_991821ab.png",
    graduationYear: 2025,
    skills: ["Full-Stack Development", "System Design", "DevOps", "Agile"],
    techStack: ["TypeScript", "Express", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    name: "Marcus Rodriguez",
    avatar: "/attached_assets/generated_images/Data_science_student_avatar_170bc2a7.png",
    graduationYear: 2026,
    skills: ["Machine Learning", "Data Science", "Statistics", "Research"],
    techStack: ["Python", "TensorFlow", "PyTorch", "Pandas", "Scikit-learn"],
  },
  {
    name: "Emily Wang",
    avatar: "/attached_assets/generated_images/Design_student_avatar_d910586d.png",
    graduationYear: 2026,
    skills: ["UI/UX Design", "Frontend Development", "Prototyping", "User Research"],
    techStack: ["Figma", "React", "Tailwind CSS", "Framer", "Adobe XD"],
  },
  {
    name: "James Thompson",
    avatar: "/attached_assets/generated_images/Cybersecurity_student_avatar_49c11639.png",
    graduationYear: 2027,
    skills: ["Cybersecurity", "Network Security", "Penetration Testing", "Cryptography"],
    techStack: ["Python", "Bash", "C++", "Wireshark", "Metasploit"],
  },
  {
    name: "Priya Sharma",
    avatar: "/attached_assets/generated_images/AI_student_avatar_81261bf0.png",
    graduationYear: 2027,
    skills: ["AI Research", "Deep Learning", "NLP", "Computer Vision"],
    techStack: ["Python", "PyTorch", "Transformers", "CUDA", "OpenCV"],
  },
  {
    name: "Alex Kim",
    avatar: "/attached_assets/generated_images/Male_CS_student_avatar_287c4fc6.png",
    graduationYear: 2024,
    skills: ["Mobile Development", "iOS", "Android", "Cross-Platform"],
    techStack: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase"],
  },
  {
    name: "Sophia Martinez",
    avatar: "/attached_assets/generated_images/Female_engineer_student_avatar_991821ab.png",
    graduationYear: 2024,
    skills: ["Backend Development", "Microservices", "API Design", "Database Design"],
    techStack: ["Java", "Spring Boot", "MySQL", "Redis", "RabbitMQ"],
  },
  {
    name: "David Lee",
    avatar: "/attached_assets/generated_images/Data_science_student_avatar_170bc2a7.png",
    graduationYear: 2025,
    skills: ["Cloud Architecture", "Infrastructure", "Site Reliability", "Automation"],
    techStack: ["AWS", "Terraform", "Ansible", "Linux", "Python"],
  },
];

export async function seedDatabase() {
  try {
    const existingMembers = await storage.getAllMembers();
    
    if (existingMembers.length === 0) {
      console.log("Seeding database with initial members...");
      for (const member of SEED_MEMBERS) {
        await storage.createMember(member);
      }
      console.log(`Added ${SEED_MEMBERS.length} members to the database`);
    } else {
      console.log(`Database already has ${existingMembers.length} members, skipping seed`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    // Don't crash the server if seeding fails
  }
}
