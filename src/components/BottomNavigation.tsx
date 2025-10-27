import { User, Info, Code2, FolderGit2, Mail } from "lucide-react";
import { useState } from "react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "profile", icon: User, label: "Profile" },
  { id: "about", icon: Info, label: "About" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "projects", icon: FolderGit2, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-scale-in">
      <div className="glass-card px-6 py-3 rounded-3xl flex items-center gap-2 shadow-2xl border border-white/10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isHovered = hoveredTab === tab.id;

          return (
            <div key={tab.id} className="relative flex justify-center items-center">
              <button
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative p-3 rounded-2xl transition-all duration-300 transform-gpu
                  ${isActive
                    ? "bg-accent text-card shadow-lg ring-2 ring-accent/30"
                    : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                  }
                `}
                style={{ transform: isActive ? "translateY(-3px)" : "translateY(0)" }}
                aria-label={tab.label}
              >
                <Icon className="w-5 h-5 transition-transform duration-300" />
              </button>

              {/* Tooltip on hover */}
              {isHovered && !isActive && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-fade-in">
                  <div className="glass-card px-3 py-1.5 rounded-lg whitespace-nowrap">
                    <span className="text-xs font-medium text-foreground">
                      {tab.label}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-glass rotate-45 absolute bottom-[-4px] left-1/2 -translate-x-1/2" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
