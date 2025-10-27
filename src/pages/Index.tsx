import { useState, useEffect } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { AboutSection } from "@/components/AboutSection";
import { TechStack } from "@/components/TechStack";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("profile");

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
        return <ProjectsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <ProfileCard />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="w-full max-w-full sm:max-w-2xl lg:max-w-2xl mx-auto px-4 py-8 pb-24 relative z-10">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
