import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { platforms, type Platform } from "@/data/mockData";

interface PlatformSelectorProps {
  selected: string[];
  onToggle: (id: string) => void;
}

const PlatformSelector = ({ selected, onToggle }: PlatformSelectorProps) => {
  return (
    <section className="px-4 py-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-display font-semibold mb-2">Select Platforms</h2>
        <p className="text-muted-foreground text-sm">Choose which stores to compare</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {platforms.map((platform, i) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            active={selected.includes(platform.id)}
            onToggle={() => onToggle(platform.id)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};

const PlatformCard = ({
  platform,
  active,
  onToggle,
  index,
}: {
  platform: Platform;
  active: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <motion.button
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    onClick={onToggle}
    className={`platform-card flex flex-col items-center gap-3 relative ${active ? "active" : ""}`}
  >
    {active && (
      <motion.div
        layoutId={`platform-check-${platform.id}`}
        className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <Check className="w-3 h-3 text-primary-foreground" />
      </motion.div>
    )}
    <img src={platform.logo} alt={platform.name} className="w-10 h-10 object-contain" />
    <span className="font-medium text-sm">{platform.name}</span>
  </motion.button>
);

export default PlatformSelector;
