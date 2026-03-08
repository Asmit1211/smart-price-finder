import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ComparisonCard from "./ComparisonCard";
import { type ProductGroup, categories, platforms } from "@/data/mockData";

interface ProductListProps {
    products: ProductGroup[];
    selectedPlatforms: string[];
    selectedCategory: string | null;
}

const ProductList = ({ products, selectedPlatforms, selectedCategory }: ProductListProps) => {
    const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

    const toggleProduct = (query: string) => {
        setExpandedProducts((prev) => {
            const next = new Set(prev);
            if (next.has(query)) {
                next.delete(query);
            } else {
                next.add(query);
            }
            return next;
        });
    };

    const filtered =
        selectedCategory && selectedCategory !== "all"
            ? products.filter((p) => p.category === selectedCategory)
            : products;

    const categoryName =
        selectedCategory && selectedCategory !== "all"
            ? categories.find((c) => c.id === selectedCategory)?.name
            : "All Products";

    if (filtered.length === 0) return null;

    return (
        <section id="products" className="px-4 py-12 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h2 className="text-2xl font-display font-bold text-center mb-2">
                    {categoryName}
                </h2>
                <p className="text-sm text-muted-foreground text-center">
                    {filtered.length} product{filtered.length !== 1 ? "s" : ""} available — click to compare across platforms
                </p>
            </motion.div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((group, i) => {
                    const isExpanded = expandedProducts.has(group.query);
                    const availablePlatforms = group.results.filter((r) => r.inStock).length;
                    const categoryIcon = categories.find((c) => c.id === group.category)?.icon || "📦";

                    return (
                        <motion.div
                            key={group.query}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className={`glass-card overflow-hidden transition-all duration-300 cursor-pointer ${isExpanded ? "border-primary/50 shadow-lg ring-2 ring-primary/10" : "hover:shadow-lg"
                                }`}
                            onClick={() => toggleProduct(group.query)}
                        >
                            {/* Card top section */}
                            <div className="p-5">
                                <div className="flex items-start gap-3 mb-4">
                                    {group.image ? (
                                        <img
                                            src={group.image}
                                            alt={group.query}
                                            className="w-14 h-14 rounded-xl object-cover shrink-0"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-xl bg-muted/80 flex items-center justify-center text-2xl shrink-0">
                                            {categoryIcon}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-display font-semibold text-base leading-tight mb-1 truncate">
                                            {group.query}
                                        </h3>
                                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full inline-block ${availablePlatforms === 4
                                            ? "bg-green-500/10 text-green-500"
                                            : availablePlatforms >= 2
                                                ? "bg-yellow-500/10 text-yellow-500"
                                                : "bg-red-500/10 text-red-500"
                                            }`}>
                                            {availablePlatforms === 4 ? "All Platforms" : `${availablePlatforms}/4 Platforms`}
                                        </span>
                                    </div>
                                </div>

                                {/* Platform logos row */}
                                <div className="flex items-center gap-2">
                                    {group.results.map((result) => {
                                        const platform = platforms.find((p) => p.id === result.platform);
                                        if (!platform) return null;
                                        return (
                                            <div
                                                key={result.id}
                                                className={`w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center p-1 ${result.inStock ? "" : "opacity-30 grayscale"
                                                    }`}
                                                title={`${platform.name}${result.inStock ? "" : " — Not Available"}`}
                                            >
                                                <img src={platform.logo} alt={platform.name} className="w-full h-full object-contain" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Compare button strip */}
                            <div className="px-5 py-3 border-t border-border/30 bg-muted/20 flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                    {isExpanded ? "Click to collapse" : "Click to compare"}
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded comparisons */}
            {expandedProducts.size > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-8 max-w-3xl mx-auto space-y-6"
                >
                    {filtered
                        .filter((g) => expandedProducts.has(g.query))
                        .map((group, i) => (
                            <ComparisonCard
                                key={group.query}
                                group={group}
                                selectedPlatforms={selectedPlatforms}
                                index={i}
                            />
                        ))}
                </motion.div>
            )}
        </section>
    );
};

export default ProductList;
