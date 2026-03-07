import { motion } from "framer-motion";
import { Star, ExternalLink, TrendingDown } from "lucide-react";
import { platforms, type ProductGroup } from "@/data/mockData";

interface ComparisonCardProps {
  group: ProductGroup;
  selectedPlatforms: string[];
  index: number;
}

const ComparisonCard = ({ group, selectedPlatforms, index }: ComparisonCardProps) => {
  const filteredResults = group.results.filter(
    (r) => selectedPlatforms.includes(r.platform) && r.inStock
  );

  const cheapest = filteredResults.reduce(
    (min, r) => (r.price < min.price ? r : min),
    filteredResults[0]
  );

  if (filteredResults.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card-elevated overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-border/50">
        <img
          src={group.image}
          alt={group.query}
          className="w-16 h-16 rounded-xl object-cover bg-muted"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg truncate">{group.query}</h3>
          <p className="text-sm text-muted-foreground">
            {filteredResults.length} platform{filteredResults.length !== 1 ? "s" : ""} compared
          </p>
        </div>
        {cheapest && (
          <div className="best-deal-badge">
            <TrendingDown className="w-3 h-3" />
            Best: ₹{cheapest.price.toLocaleString()}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="divide-y divide-border/30">
        {filteredResults.map((result) => {
          const platform = platforms.find((p) => p.id === result.platform);
          const isCheapest = result.id === cheapest?.id;

          return (
            <div
              key={result.id}
              className={`flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30 ${
                isCheapest ? "bg-success/5" : ""
              }`}
            >
              <span className="text-xl w-8 text-center">{platform?.logo}</span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{platform?.name}</span>
                  {isCheapest && <span className="best-deal-badge text-[10px] py-0.5 px-2">Best Deal</span>}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-warning text-warning" />
                  <span className="text-xs text-muted-foreground">
                    {result.rating} ({result.ratingCount.toLocaleString()})
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="font-display font-bold text-lg">
                  ₹{result.price.toLocaleString()}
                </div>
                {result.originalPrice && result.originalPrice > result.price && (
                  <div className="text-xs text-muted-foreground line-through">
                    ₹{result.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>

              <a
                href={result.buyLink}
                className="gradient-btn text-xs px-4 py-2 flex items-center gap-1.5 shrink-0"
              >
                Buy <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ComparisonCard;
