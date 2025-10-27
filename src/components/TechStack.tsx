import { useState } from "react";
import { Terminal, Code2, LucideGoal, Notebook, ChevronDown, ChevronUp } from "lucide-react";

const technologies = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Canva", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-plain.svg" },
];

// ✅ You can now customize “in / from / at” individually
const skills = [
  { title: "Web Development", prefix: "at", from: "IBM SkillsBuild", cert: "/certificates/IBM Web Dev.pdf" },
  { title: "Cloud Computing", prefix: "from", from: "AWS Academy", cert: "/certificates/AWS Cloud Foundations.pdf" },
  { title: "Machine Learning", prefix: "in", from: "AWS Academy", cert: "/certificates/AWS AIML.pdf" },
];

const achievements = [
  { title: "1st Runner Up", prefix: "at", from: "JISTech | App-e-Teaser", cert: "/certificates/jistech-runnerup.pdf" },
  { title: "Student Member", prefix: "of", from: "ISTE", cert: "/certificates/hack4bengal.pdf" },
  { title: "Participant", prefix: "in", from: "Hack4Bengal 4.O", cert: "/certificates/hack4bengal.pdf" },
];

const internships = [
  { title: "Content Writer", prefix: "at", from: "InAmigos Foundation", cert: "/certificates/InAmigos Intern.pdf" },
  { title: "AIML Virtual Internship", prefix: "by", from: "Eduskill | AICTE | AWS", cert: "/certificates/AIML internship.pdf" },
  { title: "Android Dev. Virtual Internship", prefix: "by", from: "Eduskill | AICTE | GOOGLE", cert: "/certificates/android developer internship.pdf" },
];

export const TechStack = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="animate-fade-in text-foreground min-h-screen py-10">
      {/* Tech Stack Section */}
      <div className="neumorphic-car p-6 md:p-8 mb-10 ">
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="w-5 h-5 text-accent" />
          <h2 className="text-lg md:text-lg font-bold gradient-text">Tech Stack</h2>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="p-2 rounded-2xl group cursor-default flex flex-col items-center gap-2"
              style={{
                animationDelay: `${index * 0.03}s`,
                animation: "fade-in 0.4s ease-out forwards",
                opacity: 0,
              }}
            >
              <img src={tech.logo} alt={tech.name} className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Collapsible Sections */}
      {[
        { id: "skills", title: "Skills", icon: <Code2 className="w-4 h-4 text-accent" />, content: skills },
        { id: "achievements", title: "Achievements", icon: <LucideGoal className="w-4 h-4 text-accent" />, content: achievements },
        { id: "internships", title: "Internships", icon: <Notebook className="w-4 h-4 text-accent" />, content: internships },
      ].map((section) => (
        <div key={section.id} className="neumorphic-card p-5 md:p-5 mb-1 rounded-2xl bg-[#292828]">
          {/* Header */}
          <div
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              {section.icon}
              <h2 className="text-xs md:text-sm font-bold gradient-text">{section.title}</h2>
            </div>
            {openSection === section.id ? (
              <ChevronUp className="w-4 h-4 text-accent transition-transform" />
            ) : (
              <ChevronDown className="w-4 h-4 text-accent transition-transform" />
            )}
          </div>

          {/* Collapsible Content */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              openSection === section.id ? "max-h-96 mt-4" : "max-h-0"
            }`}
          >
            <div className="space-y-1">
              {(section.content as any[]).map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <div>
                    <p className="font-semibold text-xs">{item.title}</p>
                    <p className="text-xs text-gray-400">
                      {item.prefix ? `${item.prefix} ${item.from}` : `from ${item.from}`}
                    </p>
                  </div>
                  <a
                    href={item.cert}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-xs hover:underline"
                  >
                    View Certificate →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
