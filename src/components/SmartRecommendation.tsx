import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import { platforms, type ProductGroup } from "@/data/mockData";

interface SmartRecommendationProps {
  groups: ProductGroup[];
  selectedPlatforms: string[];
}

const SmartRecommendation = ({ groups, selectedPlatforms }: SmartRecommendationProps) => {
  // Count wins per platform
  const wins: Record<string, number> = {};
  let totalSavings = 0;

  groups.forEach((group) => {
    const results = group.results.filter(
      (r) => selectedPlatforms.includes(r.platform) && r.inStock
    );
    if (results.length === 0) return;

    const cheapest = results.reduce((min, r) => (r.price < min.price ? r : min), results[0]);
    const most = results.reduce((max, r) => (r.price > max.price ? r : max), results[0]);
    wins[cheapest.platform] = (wins[cheapest.platform] || 0) + 1;
    totalSavings += most.price - cheapest.price;
  });

  const bestPlatformId = Object.entries(wins).sort((a, b) => b[1] - a[1])[0]?.[0];
  const bestPlatform = platforms.find((p) => p.id === bestPlatformId);

  if (!bestPlatform) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="glass-card-elevated p-8 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Award className="w-7 h-7 text-primary" />
          </div>

          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Best Platform to Buy From
          </h3>
          <p className="text-3xl font-display font-bold mb-1">
            {bestPlatform.logo} {bestPlatform.name}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Won {wins[bestPlatformId]} of {groups.length} comparisons — save up to{" "}
            <span className="text-success font-semibold">₹{totalSavings.toLocaleString()}</span>
          </p>

          <button className="gradient-btn inline-flex items-center gap-2">
            Shop on {bestPlatform.name} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartRecommendation;
