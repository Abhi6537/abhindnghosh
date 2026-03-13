import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProfileCard } from "@/components/ProfileCard";
import { AboutSection } from "@/components/AboutSection";
import { TechStack } from "@/components/TechStack";
import { ProjectsSection } from "@/components/ProjectsSection";
import { GitHubRepos } from "@/components/GitHubRepos";
import { ContactSection } from "@/components/ContactSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const TAB_TITLES: Record<string, string> = {
  profile: "Abhinandan Ghosh",
  about: "About | Abhinandan Ghosh",
  skills: "Skills | Abhinandan Ghosh",
  projects: "Projects | Abhinandan Ghosh",
  contact: "Contact | Abhinandan Ghosh",
};

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pageTransition = {
  duration: 0.3,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("profile");

  useDocumentTitle(TAB_TITLES[activeTab] || "Abhinandan Ghosh");

  useEffect(() => {
    const handleSwitchTab = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('switchTab', handleSwitchTab as EventListener);
    return () => window.removeEventListener('switchTab', handleSwitchTab as EventListener);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileCard />;
      case "about":
        return <AboutSection />;
      case "skills":
        return <TechStack />;
      case "projects":
        return (
          <div className="space-y-6">
            <ProjectsSection />
            <GitHubRepos />
          </div>
        );
      case "contact":
        return (
          <div className="space-y-6">
            <ReviewsSection />
            <ContactSection />
          </div>
        );
      default:
        return <ProfileCard />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="w-full max-w-full sm:max-w-2xl lg:max-w-2xl mx-auto px-4 py-8 pb-24 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
