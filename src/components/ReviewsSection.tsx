import { useEffect, useState, useCallback } from "react";
import { Star, Send, Loader2, MessageSquareHeart, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Review {
  id: number;
  name: string;
  rating: number;
  suggestion: string | null;
  created_at: string;
}

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [suggestion, setSuggestion] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setReviews(data || []);
    } catch {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (rating === 0) { toast.error("Please select a rating"); return; }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("reviews").insert([
        { name: name.trim(), rating, suggestion: suggestion.trim() || null },
      ]);
      if (error) throw error;
      toast.success("Thanks for your review! 🎉");
      setName(""); setRating(0); setSuggestion("");
      fetchReviews();
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "now";
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    return days < 30 ? `${days}d` : `${Math.floor(days / 30)}mo`;
  };

  return (
    <section className="animate-fade-in">
      <div className="neumorphic-card p-4 md:p-5 space-y-4">
        {/* Header with avg rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-bold gradient-text">Reviews</h2>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{avgRating}</span>
            <span>· {reviews.length}</span>
          </div>
        </div>

        {/* Compact Form */}
        <form onSubmit={handleSubmit} className="glass-card p-3 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-2.5 py-1.5 rounded-md bg-secondary text-foreground text-xs placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            />
            <div className="flex gap-0.5 ml-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 focus-ring rounded"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-4 h-4 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Feedback (optional)"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="flex-1 px-2.5 py-1.5 rounded-md bg-secondary text-foreground text-xs placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-3 py-1.5 rounded-md bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/90 transition-colors focus-ring flex items-center gap-1"
            >
              {submitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
            </button>
          </div>
        </form>

        {/* Reviews List */}
        {loading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card rounded-lg p-2.5 animate-pulse">
                <div className="h-2.5 bg-foreground/10 rounded w-1/3 mb-1.5"></div>
                <div className="h-2 bg-foreground/5 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-[11px] text-muted-foreground text-center py-2">
            No reviews yet. Be the first! ✨
          </p>
        ) : (
          <>
            <div className="space-y-1.5">
              {displayedReviews.map((review) => (
                <div key={review.id} className="glass-card rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-foreground">{review.name}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-2.5 h-2.5 ${
                              star <= review.rating ? "fill-accent text-accent" : "text-muted-foreground/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] text-muted-foreground">{timeAgo(review.created_at)}</span>
                  </div>
                  {review.suggestion && (
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{review.suggestion}</p>
                  )}
                </div>
              ))}
            </div>

            {reviews.length > 3 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-[11px] text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
                >
                  {showAll ? "Less" : `All ${reviews.length}`}
                  <ChevronDown className={`w-3 h-3 transition-transform ${showAll ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
