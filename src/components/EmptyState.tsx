import { motion } from "framer-motion";
import { PackageSearch } from "lucide-react";

const EmptyState = ({ query }: { query: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-md mx-auto text-center py-16 px-4"
  >
    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
      <PackageSearch className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="font-display font-semibold text-lg mb-2">No results found</h3>
    <p className="text-sm text-muted-foreground">
      We couldn't find "{query}" on any platform. Try a different search term.
    </p>
  </motion.div>
);

export default EmptyState;
