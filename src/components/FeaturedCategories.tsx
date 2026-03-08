import { motion } from "framer-motion";
import { type Category } from "@/data/mockData";

interface FeaturedCategoriesProps {
    categories: Category[];
    selectedCategory: string | null;
    onSelectCategory: (id: string) => void;
}

const FeaturedCategories = ({ categories, selectedCategory, onSelectCategory }: FeaturedCategoriesProps) => {
    return (
        <section id="categories" className="px-4 py-16 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <h2 className="text-3xl font-display font-bold mb-3">
                    Browse by <span className="gradient-text">Category</span>
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                    Explore curated product lists across popular categories and compare prices instantly
                </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, i) => (
                    <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => onSelectCategory(category.id)}
                        className={`glass-card p-5 flex flex-col items-center gap-3 text-center cursor-pointer transition-all duration-300 group ${selectedCategory === category.id
                                ? "border-primary ring-2 ring-primary/20 shadow-lg"
                                : "hover:shadow-lg"
                            }`}
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                            {category.icon}
                        </span>
                        <div>
                            <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                            <p className="text-xs text-muted-foreground leading-tight">{category.description}</p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {category.productCount} product{category.productCount !== 1 ? "s" : ""}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* "All Products" button */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-6"
            >
                <button
                    onClick={() => onSelectCategory("all")}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === "all" || selectedCategory === null
                            ? "gradient-btn"
                            : "border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30"
                        }`}
                >
                    View All Products
                </button>
            </motion.div>
        </section>
    );
};

export default FeaturedCategories;
