import { motion } from "framer-motion";
import { ExternalLink, TrendingDown } from "lucide-react";
import { platforms, type ProductGroup } from "@/data/mockData";

interface ComparisonCardProps {
  group: ProductGroup;
  selectedPlatforms: string[];
  index: number;
}

const ComparisonCard = ({ group, selectedPlatforms, index }: ComparisonCardProps) => {
  const filteredResults = group.results.filter(
    (r) => selectedPlatforms.includes(r.platform)
  );

  if (filteredResults.length === 0) return null;

  // Find cheapest among available platforms
  const availableResults = filteredResults.filter((r) => r.inStock && r.price > 0);
  const cheapest = availableResults.length > 0
    ? availableResults.reduce((min, r) => (r.price < min.price ? r : min), availableResults[0])
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card-elevated overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-border/50">
        {group.image ? (
          <img src={group.image} alt={group.query} className="w-16 h-16 rounded-xl object-cover" />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center text-2xl">
            🛒
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg truncate">{group.query}</h3>
          <p className="text-sm text-muted-foreground">
            {availableResults.length} of {filteredResults.length} platform{filteredResults.length !== 1 ? "s" : ""} available
          </p>
        </div>
        {cheapest && (
          <div className="best-deal-badge">
            <TrendingDown className="w-3 h-3" />
            Best: ₹{cheapest.price}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="divide-y divide-border/30">
        {filteredResults.map((result) => {
          const platform = platforms.find((p) => p.id === result.platform);
          const hasLink = result.buyLink && result.buyLink.length > 0;
          const isCheapest = cheapest && result.id === cheapest.id;

          return (
            <div
              key={result.id}
              className={`flex items-center gap-4 px-6 py-4 transition-colors ${hasLink ? "hover:bg-muted/30" : "opacity-50"
                } ${isCheapest ? "bg-success/5" : ""}`}
            >
              <img src={platform?.logo} alt={platform?.name} className="w-8 h-8 object-contain" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{platform?.name}</span>
                  {isCheapest && (
                    <span className="best-deal-badge text-[10px] py-0.5 px-2">Best Deal</span>
                  )}
                </div>
                {hasLink ? (
                  <span className="text-xs text-green-500 mt-0.5 block">Available</span>
                ) : (
                  <span className="text-xs text-muted-foreground mt-0.5 block">Not Available</span>
                )}
              </div>

              {/* Price */}
              {result.price > 0 && (
                <div className="text-right shrink-0">
                  <div className={`font-display font-bold text-lg ${isCheapest ? "text-green-500" : ""}`}>
                    ₹{result.price}
                  </div>
                </div>
              )}

              {hasLink ? (
                <a
                  href={result.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-btn text-xs px-4 py-2 flex items-center gap-1.5 shrink-0"
                >
                  Buy <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs text-muted-foreground px-4 py-2 border border-border/50 rounded-xl shrink-0">
                  Not Available
                </span>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ComparisonCard;
