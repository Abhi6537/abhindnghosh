import {
  Sparkles,
  FileText,
  Image as ImageIcon,
  Download,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "./ui/button";

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState<"about" | "resume" | "gallery">("about");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const resumeFile = "/resume/resume.pdf";

  const galleryImages = [
    "/gallery/photo1.jpg",
    "/gallery/photo2.jpg",
    "/gallery/photo3.jpg",
    "/gallery/photo4.jpg",
    "/gallery/photo5.jpg",
    "/gallery/photo6.jpg",
    "/gallery/photo7.jpg",
    "/gallery/photo8.jpg",
    "/gallery/photo9.jpg",
    "/gallery/photo10.jpg",
    "/gallery/photo11.jpg",
    "/gallery/photo12.jpg",
    "/gallery/photo13.jpg",
    "/gallery/photo14.jpg",
    "/gallery/photo15.jpg",
    "/gallery/photo16.jpg",
    "/gallery/photo17.jpg",
    "/gallery/photo18.jpg",
    "/gallery/photo19.jpg",
  ];

  useEffect(() => {
    if (activeTab !== "gallery") {
      setVisibleCount(6);
      setSelectedImage(null);
      setSelectedIndex(null);
    }
  }, [activeTab]);

  // Swipe / Keyboard navigation
  const showPrev = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedImage(galleryImages[selectedIndex - 1]);
    }
  }, [selectedIndex, galleryImages]);

  const showNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < galleryImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedImage(galleryImages[selectedIndex + 1]);
    }
  }, [selectedIndex, galleryImages]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "Escape") setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, showNext, showPrev]);

  return (
    <section className="animate-fade-in">
      <div className="neumorphic-car p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-4 h-4 text-accent" />
          <h2 className="text-lg :text-xl font-bold gradient-text">Who Am I</h2>
        </div>

        <div className="space-y-5">
          <p className="text-sm text-foreground/90 leading-relaxed">
            Just an ordinary techie who loves mixing code with creativity! A 2nd-year IT student at
            JISCE learning, building, and experimenting with technologies that shape the web.
          </p>

          {/* Academics and Hobbies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-semibold text-foreground text-sm mb-3">Academics</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Chhay Hazari High School (2011 - 2021)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Jhargram Nanibala Vidyalaya (2021 - 2023)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>JIS College Of Engineering (2024 - Present)</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-start gap-3 hover-lift">
              <Heart className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Outside of Tech</h3>
                <p className="text-xs text-muted-foreground">Photography | Cricket | Movies</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="glass-card p-4 rounded-xl">
            <h3 className="font-semibold text-foreground text-sm mb-3">Highlights</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span>1st runner-up at JISTECH 2k25 App E-Teaser</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                <span>Intern at InAmigos Foundation for two weeks</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 pt-2 text-sm text-muted-foreground">
            <button
              onClick={() => setActiveTab("resume")}
              className={`flex items-center gap-1 transition-colors ${
                activeTab === "resume" ? "text-accent" : "hover:text-accent"
              }`}
            >
              <FileText className="w-4 h-4" />
              Resume
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center gap-1 transition-colors ${
                activeTab === "gallery" ? "text-accent" : "hover:text-accent"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Gallery
            </button>
          </div>

          {/* Resume */}
          {activeTab === "resume" && (
            <div className="glass-card p-4 rounded-xl animate-fade-in relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground text-sm">My Resume</h3>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <button
                    onClick={() => setSelectedImage("resume")}
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <a
                    href={resumeFile}
                    download
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </a>
                </div>
              </div>

              {selectedImage === "resume" && (
                <div
                  className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  <div
                    className="bg-background rounded-lg overflow-hidden shadow-xl w-[90%] md:w-[60%] lg:w-[50%] h-[80vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center p-3 border-b border-white/10">
                      <h4 className="text-sm font-medium text-foreground">Abhinandan Ghosh - Resume</h4>
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="text-xs hover:text-accent transition-colors"
                      >
                        Close
                      </button>
                    </div>
                    <iframe src={resumeFile} className="w-full flex-1" title="Resume Preview" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Gallery */}
          {activeTab === "gallery" && (
            <div className="glass-card p-4 rounded-xl animate-fade-in relative">
              <h3 className="font-semibold text-foreground text-sm mb-3">no context, just vibes</h3>

              {/* Popup with arrows */}
              {selectedImage && selectedIndex !== null && (
                <div
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="relative max-w-[90%] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="max-h-[85vh] rounded-lg shadow-lg border border-white/10"
                    />
                    {selectedIndex > 0 && (
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                        onClick={showPrev}
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                    )}
                    {selectedIndex < galleryImages.length - 1 && (
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                        onClick={showNext}
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {galleryImages.slice(0, visibleCount).map((src, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-background/50 rounded-lg overflow-hidden hover:scale-[1.03] transition-transform cursor-pointer"
                    onClick={() => {
                      setSelectedImage(src);
                      setSelectedIndex(i);
                    }}
                  >
                    <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {visibleCount < galleryImages.length && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setVisibleCount(visibleCount + 6)}
                    className="text-xs hover:text-accent transition-colors"
                  >
                    View More
                  </button>
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center mt-3">
                Little snippets of my chaos
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
