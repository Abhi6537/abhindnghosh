import { Briefcase, ChevronDown } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/button";
import { useState } from "react";

const projects = [
  {
    title: "NAMASTE-ICD-API ",
    description: "#SIH2025--Unified API connecting AYUSH ↔ ICD-11 ↔ FHIR — one unified.",
    technologies: ["Fast API", "Python", "Docker","Supabase" ],
    githubUrl: "https://github.com/Abhi6537/NAMASTE-ICD-API",
    liveUrl: "https://namaste-icd-api.vercel.app/",
    image: "/Project/project1.png"
,
  },
  {
    title: "AYUBRIDGE",
    description: "#SIH2025--Web-based EMR connecting AYUSH with ICD-11 & FHIR using our NAMASTE ICD API.",
    technologies: ["TypeScript", "CSS", "React","FastAPI" ],
    githubUrl: "https://github.com/Abhi6537/AYUBRIDGE",
    liveUrl: "https://ayubridge.vercel.app/",
    image: "/Project/project2.png",
  },
  {
    title: "GharKaKaam",
    description: "#Hack4Bengal4.0--Web platform designed to efficiently connect households with verified and skilled domestic service professionals.",
    technologies: ["TypeScript","MongoDB","Talwind CSS","Python"],
    githubUrl: "https://github.com/Abhi6537/GharKaKaam",
    liveUrl: "https://youtu.be/28vppcNVrNU?si=kqwxvV4ddSKIIiY8",
    image: "/Project/project3.png",
  },
  {
    title: "Mess Sathi",
    description: "#JISTech2k25--Smart web platform designed to help students discover, compare, and manage nearby mess services efficiently for a seamless dining experience",
    technologies: ["TypeScript", "Python", "Supabase", "CSS"],
    githubUrl: "https://github.com/Abhi6537/MessSathi-Frontend",
    liveUrl: "https://github.com/Abhi6537/MessSathi-Backend",
    image: "/Project/project4.png",
  },
  {
    title: "Portfolio",
    description: "#Learning-- Personal porfotlio to showcase skills, projects, and experiences.",
    technologies: ["TypeScript", "React", "TailwindCSS", "CSS"],
    githubUrl: "https://github.com/Abhi6537/personal-portfolio",
    liveUrl: "https://abhinadanghosh-portfolio.vercel.app/",
    image: "/Project/project5.png",
  },
];

export const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section className="animate-fade-in">
      <div className="neumorphic-car p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-4 h-4 text-accent" />
          <h2 className="text-md md:text-lg font-semibold gradient-text">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {projects.length > 3 && (
          <div className="mt-3 flex justify-center">
            <Button
              variant="link"
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-muted-foreground"
            >
              {showAll ? "Show Less" : "View More"}
              <ChevronDown
                className={`w-3 h-3 ml-1 transition-transform ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
