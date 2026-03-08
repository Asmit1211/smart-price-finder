import { useState, useRef, useEffect } from "react";
import { Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchSuggestions } from "@/data/mockData";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onExploreCategories: () => void;
}

const HeroSection = ({ onSearch, onExploreCategories }: HeroSectionProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      setFilteredSuggestions(
        searchSuggestions.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (value?: string) => {
    const searchValue = value || query;
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setShowSuggestions(false);
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm mb-8 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            Smart price comparison across platforms
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Find the{" "}
          <span className="gradient-text">Smartest Price</span>
          <br />
          for Anything
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Compare prices across Blinkit, Flipkart Minutes, Swiggy Instamart & Zepto in seconds.
          Never overpay again.
        </motion.p>

        {/* Explore Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-8 flex justify-center"
        >
          <button
            onClick={onExploreCategories}
            className="px-6 py-3 rounded-full border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200 text-sm font-medium"
          >
            🛒 Explore Categories
          </button>
        </motion.div>

        <motion.div
          ref={wrapperRef}
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onFocus={() => query.length > 0 && setShowSuggestions(true)}
              placeholder="Search for any product..."
              className="search-input pl-14 pr-32"
            />
            <button
              onClick={() => handleSubmit()}
              className="absolute right-3 top-1/2 -translate-y-1/2 gradient-btn text-sm px-5 py-2.5"
            >
              Compare
            </button>
          </div>

          <AnimatePresence>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full mt-2 w-full glass-card-elevated p-2 z-50"
              >
                {filteredSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setQuery(s);
                      handleSubmit(s);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-muted/60 transition-colors flex items-center gap-3"
                  >
                    <Search className="w-4 h-4 text-muted-foreground" />
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span>Popular:</span>
          {["Amul Toned Milk", "Tata Salt", "KitKat"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setQuery(item);
                handleSubmit(item);
              }}
              className="px-3 py-1.5 rounded-full border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
