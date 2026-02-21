import { MapPin, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import developerAvatar from "../assets/profile3.jpg";

export const ProfileCard = () => {
  return (
    <section className="animate-fade-in">
      {/* Add neumorphic only for md and above */}
      <div className="p-6 md:p-10 md:neumorphic-card md:rounded-3xl">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-36 h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden">
              <img
                src={developerAvatar}
                alt="Developer Avatar"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-3">
            <h1 className="text-sm md:text-lg text-muted-foreground">Hey 👋 I'm ..</h1>
            <p className="text-xl font-bold gradient-text text-foreground">
              Abhinandan Ghosh
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-1">
              <span className="w-2 h-2 bg-accent rounded-full animate-glow-pulse"></span>
              <span>Web Developer</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-xs text-foreground/90 max-w-md">
            JISTech 2k25 Winner | Hack4Bengal 4.O Participant
          </p>

          {/* Stats */}
          <div className="flex gap-10 pt-5">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">1X</div>
              <div className="text-xs text-muted-foreground">Hackathon Winner</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">5+</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
          </div>

          {/* Location */}
          <a
            href="https://maps.app.goo.gl/sSHe6UQkKjD2Dx6f6?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>Kalyani</span>
          </a>

          {/* Social Links */}
          <div className="flex gap-2 justify-center">
            <a
              href="https://github.com/Abhi6537"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2.5 rounded-xl hover-lift group"
            >
              <Github className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinandan-ghosh-jis"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2.5 rounded-xl hover-lift group"
            >
              <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://x.com/abhinan38886951"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2.5 rounded-xl hover-lift group"
            >
              <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="mailto:ghoshabhinandan290@gmail.com"
              className="glass-card p-2.5 rounded-xl hover-lift group"
            >
              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          </div>

          {/* More About Me Button */}
          <Button
            variant="link"
            size="sm"
            className="text-xs mt-2"
            onClick={() => {
              const event = new CustomEvent("switchTab", { detail: "about" });
              window.dispatchEvent(event);
            }}
          >
            Who Am I →
          </Button>
        </div>
      </div>
    </section>
  );
};
