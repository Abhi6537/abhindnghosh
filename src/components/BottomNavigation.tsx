import { User, Info, Code2, FolderGit2, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-scale-in"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="glass-card px-4 py-3 rounded-3xl flex items-center gap-1.5 shadow-2xl border border-white/10 dark:border-white/10"
        role="tablist"
        aria-label="Page sections"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(e) => {
                const currentIndex = tabs.findIndex((t) => t.id === tab.id);
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  const nextIndex = (currentIndex + 1) % tabs.length;
                  onTabChange(tabs[nextIndex].id);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                  onTabChange(tabs[prevIndex].id);
                }
              }}
              className={`relative p-3 rounded-2xl transition-all duration-300 transform-gpu focus-ring
                ${isActive
                  ? "bg-accent text-accent-foreground shadow-lg ring-2 ring-accent/30"
                  : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                }
              `}
              style={{ transform: isActive ? "translateY(-3px)" : "translateY(0)" }}
            >
              <Icon className="w-5 h-5 transition-transform duration-300" />
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1" aria-hidden="true" />

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="p-3 rounded-2xl text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all duration-300 focus-ring"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </nav>
  );
};
