import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

export const ProjectCard = ({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  image,
}: ProjectCardProps) => {
  return (
    <div className=" ">
      <div className="flex gap-3 ">
        {/* Image */}
        <div className="relative w-24 h-20  shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-covr group-hover:scale-105 transition-transform duration-500"
          />
          <div className="" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between py-1">
          <div>
            <h3 className="text-xs md:text-base font-semibol text-foreground group-hover:text-accent transition-colors">
              {title}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
              {description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 mt-2">
            {technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mediu  text-primary rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-1 mt-2">
            {githubUrl && (
              <Button
               variant="link"
                size="sm"
                className=" flex items-center gap-1  text-xs px-2 py-0 h-6 "
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button
              variant="link"
                size="sm"
                className="flex items-center gap-1   text-xs px-2 py-0 h-6"
                asChild
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Live
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
