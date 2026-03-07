import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformSelector from "@/components/PlatformSelector";
import ComparisonCard from "@/components/ComparisonCard";
import SmartRecommendation from "@/components/SmartRecommendation";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import { mockProductGroups, type ProductGroup } from "@/data/mockData";

const Index = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "amazon",
    "flipkart",
    "jiomart",
    "blinkit",
  ]);
  const [searchResults, setSearchResults] = useState<ProductGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSearch = useCallback((query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setLastQuery(query);

    // Simulate API call
    setTimeout(() => {
      const results = mockProductGroups.filter((g) =>
        g.query.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <HeroSection onSearch={handleSearch} />
        <PlatformSelector selected={selectedPlatforms} onToggle={togglePlatform} />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" exit={{ opacity: 0 }}>
              <LoadingState />
            </motion.div>
          ) : hasSearched && searchResults.length === 0 ? (
            <motion.div key="empty" exit={{ opacity: 0 }}>
              <EmptyState query={lastQuery} />
            </motion.div>
          ) : searchResults.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10 max-w-3xl mx-auto px-4 pb-10"
            >
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6 text-center">
                  Price Comparison
                </h2>
                <div className="space-y-6">
                  {searchResults.map((group, i) => (
                    <ComparisonCard
                      key={group.query}
                      group={group}
                      selectedPlatforms={selectedPlatforms}
                      index={i}
                    />
                  ))}
                </div>
              </div>

              <SmartRecommendation
                groups={searchResults}
                selectedPlatforms={selectedPlatforms}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
