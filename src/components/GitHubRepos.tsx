import { useEffect, useState } from "react";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#701516",
  PHP: "#4F5D95",
};

export const GitHubRepos = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/Abhi6537/repos?sort=updated&per_page=100&type=public"
        );
        if (!res.ok) throw new Error("Failed to fetch repos");
        const data: GitHubRepo[] = await res.json();
        // Filter out forked repos implicitly (API returns all public)
        setRepos(data);
      } catch (err) {
        setError("Couldn't load repos right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const displayed = showAll ? repos : repos.slice(0, 4);

  return (
    <section className="animate-fade-in">
      <div className="neumorphic-car p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4 text-accent" />
            <h2 className="text-md md:text-lg font-semibold gradient-text">
              GitHub Repos
            </h2>
          </div>
          <a
            href="https://github.com/Abhi6537"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
          >
            View Profile
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {loading && (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-4 animate-pulse"
              >
                <div className="h-4 bg-foreground/10 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-foreground/5 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayed.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card rounded-xl p-4 hover-lift transition-all duration-300 group block"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xs md:text-sm font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                      {repo.name}
                    </h3>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                  </div>

                  {repo.description && (
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              LANGUAGE_COLORS[repo.language] || "#8b8b8b",
                          }}
                        ></span>
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-0.5">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {repos.length > 4 && (
              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                >
                  {showAll ? "Show Less" : `View All ${repos.length} Repos`}
                  <svg
                    className={`w-3 h-3 transition-transform ${showAll ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
