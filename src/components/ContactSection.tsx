import { Mail, MessageSquare, Send, Github, Linkedin, Instagram, Twitter, Coffee, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "61264c35-95a7-48b4-a15e-66630ba71526",
          name: data.name,
          email: data.email,
          message: data.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="animate-fade-in">
      <div className="neumorphic-card p-6 md:p-8 space-y-8">
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

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="name" className="block text-[11px] font-medium text-foreground mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                {...register("name")}
                className="w-full px-3 py-2 rounded-lg bg-secondary text-foreground text-xs placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-background transition-colors"
              />
              {errors.name && (
                <p className="text-[10px] text-destructive mt-0.5" role="alert">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-[11px] font-medium text-foreground mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full px-3 py-2 rounded-lg bg-secondary text-foreground text-xs placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-background transition-colors"
              />
              {errors.email && (
                <p className="text-[10px] text-destructive mt-0.5" role="alert">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-[11px] font-medium text-foreground mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={2}
              placeholder="Your message..."
              {...register("message")}
              className="w-full px-3 py-2 rounded-lg bg-secondary text-foreground text-xs placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-background resize-none transition-colors"
            />
            {errors.message && (
              <p className="text-[10px] text-destructive mt-0.5" role="alert">{errors.message.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 font-medium text-xs py-2 focus-ring"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Send Message
              </>
            )}
          </Button>
        </form>

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
