import { MapPin, Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import developerAvatar from "../assets/profile3.jpg";

const LIKED_KEY = "portfolio_liked";

export const ProfileCard = () => {
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState(() => localStorage.getItem(LIKED_KEY) === "true");
  const [animating, setAnimating] = useState(false);
  const [userIp, setUserIp] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch total likes
    supabase
      .from("likes")
      .select("count")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setLikeCount(data.count);
      });

    // 2. Fetch IP and check if they already liked
    const checkIpLikeStatus = async () => {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();
        setUserIp(ip);

        // Check if this IP is in our DB
        const { data } = await supabase
          .from("visitor_likes")
          .select("ip")
          .eq("ip", ip)
          .single();

        if (data) {
          setHasLiked(true);
          localStorage.setItem(LIKED_KEY, "true");
        }
      } catch (err) {
        console.error("Failed to check IP like status", err);
      }
    };

    if (!hasLiked) {
      checkIpLikeStatus();
    }
  }, [hasLiked]);

  const handleLike = async () => {
    if (hasLiked || likeCount === null) return;

    setAnimating(true);
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    setHasLiked(true);
    localStorage.setItem(LIKED_KEY, "true");

    try {
      // 1. Update total count
      await supabase.from("likes").update({ count: newCount }).eq("id", 1);
      
      // 2. Record this IP so they can't like again across devices
      if (userIp) {
        await supabase.from("visitor_likes").insert([{ ip: userIp }]);
      }
    } catch (err) {
      console.error("Failed to record like securely", err);
    }

    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <section className="animate-fade-in">
      <div className="p-6 md:p-10">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-36 h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden">
              <img
                src={developerAvatar}
                alt="Abhinandan Ghosh - Developer"
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
              <span className="w-2 h-2 bg-accent rounded-full animate-glow-pulse" aria-hidden="true"></span>
              <span>Web Developer</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-xs text-foreground/90 max-w-md">
            UI/UX Associate | Engineering Modeling (IoT) Club
          </p>

          {/* Stats */}
          <div className="flex gap-8 pt-5">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">1X</div>
              <div className="text-xs text-muted-foreground">Hackathon Winner</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">5+</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <button
                onClick={handleLike}
                disabled={hasLiked || likeCount === null}
                className={`flex items-center justify-center gap-1.5 text-xl font-bold transition-all duration-300 focus-ring rounded-lg px-2 mx-auto ${
                  hasLiked ? "text-accent" : "text-primary hover:text-accent/80"
                } ${animating ? "scale-110" : ""}`}
                aria-label="Like portfolio"
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${
                    hasLiked ? "fill-accent text-accent" : ""
                  }`}
                />
                <span className="min-w-[1ch] text-left">
                  {likeCount !== null ? likeCount.toLocaleString() : "—"}
                </span>
              </button>
              <div className="text-xs text-muted-foreground mt-1">
                {hasLiked ? "Loved it!" : "Likes"}
              </div>
            </div>
          </div>

          {/* Location */}
          <a
            href="https://maps.app.goo.gl/sSHe6UQkKjD2Dx6f6?g_st=com.google.maps.preview.copy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors focus-ring rounded-lg px-2 py-1"
            aria-label="View location: Kalyani on Google Maps"
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
              className="glass-card p-2.5 rounded-xl hover-lift group focus-ring"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinandan-ghosh-jis"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2.5 rounded-xl hover-lift group focus-ring"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://x.com/abhinan38886951"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-2.5 rounded-xl hover-lift group focus-ring"
              aria-label="Twitter profile"
            >
              <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <a
              href="mailto:ghoshabhinandan290@gmail.com"
              className="glass-card p-2.5 rounded-xl hover-lift group focus-ring"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          </div>

          {/* More About Me Button */}
          <Button
            variant="link"
            size="sm"
            className="text-xs mt-2 focus-ring"
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
