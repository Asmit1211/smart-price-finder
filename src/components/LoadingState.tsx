import { motion } from "framer-motion";

const LoadingState = () => (
  <div className="max-w-3xl mx-auto px-4 space-y-6">
    {[1, 2].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1 }}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 skeleton-pulse rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-48 skeleton-pulse" />
            <div className="h-3 w-32 skeleton-pulse" />
          </div>
        </div>
        {[1, 2, 3].map((j) => (
          <div key={j} className="flex items-center gap-4">
            <div className="w-8 h-8 skeleton-pulse rounded-full" />
            <div className="flex-1 h-4 skeleton-pulse" />
            <div className="w-20 h-4 skeleton-pulse" />
            <div className="w-16 h-8 skeleton-pulse rounded-xl" />
          </div>
        ))}
      </motion.div>
    ))}
  </div>
);

export default LoadingState;
