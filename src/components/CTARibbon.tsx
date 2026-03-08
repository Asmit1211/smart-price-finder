import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface CTARibbonProps {
    onExploreCategories: () => void;
}

const CTARibbon = ({ onExploreCategories }: CTARibbonProps) => {
    return (
        <section className="px-4 py-16 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card-elevated p-10 text-center relative overflow-hidden"
            >
                {/* Background glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-primary/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-60 h-30 bg-accent/10 blur-3xl rounded-full" />
                </div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold mb-3">
                        Need help choosing?
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Compare prices across all platforms and find the best deals on your everyday essentials
                    </p>
                    <button
                        onClick={onExploreCategories}
                        className="gradient-btn inline-flex items-center gap-2"
                    >
                        <ArrowUp className="w-4 h-4" />
                        Explore All Categories
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default CTARibbon;
