import { Code, Layout, Database, Globe, Server, Layers } from "lucide-react";
import { SkillCard } from "@/components/skill-card";

const skills = [
  {
    title: "C++",
    description: "Proficient in systems and performance-focused programming.",
    icon: Code,
  },
  {
    title: "C# and Java",
    description: "Object-oriented development for desktop and enterprise applications.",
    icon: Server,
  },
  {
    title: "UI design (CSS & React)",
    description: "Responsive component-driven UI design using Tailwind and React.",
    icon: Layout,
  },
  {
    title: "Database Management",
    description: "Designing schemas, queries, and maintaining data integrity.",
    icon: Database,
  },
  {
    title: "Web Applications (JavaScript)",
    description: "Building interactive frontends and API-driven apps.",
    icon: Globe,
  },
  {
    title: "System Architecture & Design",
    description: "Planning scalable systems and service interactions.",
    icon: Layers,
  },
];

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Josiah Cook</h1>
        <p className="text-muted-foreground max-w-2xl">
          I am currently a student in MATC's web and software development program. I
          have been taking classes part time since 2023, and am on track to graduate
          in December of this year.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ title, description, icon: Icon }) => (
            <SkillCard key={title} title={title} description={description} Icon={Icon} />
          ))}
        </div>
      </section>
    </div>
  );
}
