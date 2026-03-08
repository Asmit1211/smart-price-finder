import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import PlatformSelector from "@/components/PlatformSelector";
import ProductList from "@/components/ProductList";
import ComparisonCard from "@/components/ComparisonCard";
import CTARibbon from "@/components/CTARibbon";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import { mockProductGroups, categories, type ProductGroup } from "@/data/mockData";

const Index = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "blinkit",
    "flipkartMinutes",
    "swiggyInstamart",
    "zepto",
  ]);
  const [searchResults, setSearchResults] = useState<ProductGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSearch = useCallback((query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    setLastQuery(query);
    setSelectedCategory(null);

    // Simulate API call
    setTimeout(() => {
      const results = mockProductGroups.filter((g) =>
        g.query.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    setHasSearched(false);
    setSearchResults([]);

    // Scroll to products section
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleExploreCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <HeroSection onSearch={handleSearch} onExploreCategories={handleExploreCategories} />

        {/* Categories section */}
        <div ref={categoriesRef}>
          <FeaturedCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        <PlatformSelector selected={selectedPlatforms} onToggle={togglePlatform} />

        {/* Search Results */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loading" exit={{ opacity: 0 }}>
              <LoadingState />
            </motion.div>
          ) : hasSearched && searchResults.length === 0 ? (
            <motion.div key="empty" exit={{ opacity: 0 }}>
              <EmptyState query={lastQuery} />
            </motion.div>
          ) : hasSearched && searchResults.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10 max-w-3xl mx-auto px-4 pb-10"
            >
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6 text-center">
                  Search Results for "{lastQuery}"
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
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Category-based Product List (shown when not searching) */}
        {!hasSearched && (selectedCategory !== null) && (
          <div ref={productsRef}>
            <ProductList
              products={mockProductGroups}
              selectedPlatforms={selectedPlatforms}
              selectedCategory={selectedCategory}
            />
          </div>
        )}

        <CTARibbon onExploreCategories={handleExploreCategories} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
