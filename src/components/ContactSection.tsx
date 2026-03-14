import { MessageSquare, Github, Linkedin, Instagram, Twitter, Coffee } from "lucide-react";

export const ContactSection = () => {
  return (
    <section className="animate-fade-in">
      <div className="p-6 md:p-8 space-y-8">
        <div className="text-center space-y-5">
          <div className="flex justify-center">
            <div className="glass-card p-4 rounded-2xl">
              <MessageSquare className="w-7 h-7 text-accent" />
            </div>
          </div>

          <h2 className="text-3xl md:text-3xl font-bold gradient-text">
            Get in Touch
          </h2>

          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Reach out on social media or drop an email to collaborate on exciting projects, discuss internship opportunities, or just to say hello :)
          </p>

          {/* Social Links */}
          <div className="flex gap-3 justify-center pt-4">
            <a
              href="https://github.com/Abhi6537"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-3 rounded-xl hover-lift group focus-ring"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinandan-ghosh-jis"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-3 rounded-xl hover-lift group focus-ring"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://x.com/abhinan38886951"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-3 rounded-xl hover-lift group focus-ring"
              aria-label="Twitter profile"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/abhindnghosh"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-3 rounded-xl hover-lift group focus-ring"
              aria-label="Instagram profile"
            >
              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          </div>
        </div>



        {/* Quick Contact Info */}
        <div className="pt-2 space-y-2 text-xs text-muted-foreground text-center">
          <p>
            <a
              href="mailto:ghoshabhinandan290@gmail.com"
              className="text-accent hover:underline"
              aria-label="Send email to ghoshabhinandan290@gmail.com"
            >
              ghoshabhinandan290@gmail.com
            </a>
          </p>

          <p>
            📍{" "}
            <a
              href="https://maps.app.goo.gl/sSHe6UQkKjD2Dx6f6?g_st=com.google.maps.preview.copy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
              aria-label="View location on Google Maps"
            >
              Kalyani, West Bengal
            </a>
          </p>
        </div>

        {/* Footer inside card */}
        <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-6 border-t border-border">
          <p>abhindnghosh</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Coffee className="w-3 h-3 text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};
