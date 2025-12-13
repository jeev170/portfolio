import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Shuffle, Globe } from "lucide-react";

// Since the portfolio is at /portfolio/, we need the site parameter
const SITE_PATH = "jeev170.github.io/portfolio";

export const Webring = () => {
  return (
    <motion.div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="glass-strong rounded-full px-4 py-2 flex items-center gap-3 text-xs">
        <a
          href={`https://amrita.town/prev?site=${SITE_PATH}`}
          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          title="Previous site"
        >
          <ArrowLeft className="w-3 h-3" />
          <span className="hidden sm:inline">prev</span>
        </a>
        
        <a
          href={`https://amrita.town/random?site=${SITE_PATH}`}
          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          title="Random site"
        >
          <Shuffle className="w-3 h-3" />
        </a>
        
        <a
          href="https://amrita.town"
          className="flex items-center gap-1.5 text-primary font-medium hover:text-foreground transition-colors"
          title="amrita.town webring"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>amrita.town</span>
        </a>
        
        <a
          href={`https://amrita.town/next?site=${SITE_PATH}`}
          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          title="Next site"
        >
          <span className="hidden sm:inline">next</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
};
