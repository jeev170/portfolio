import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Shuffle, Globe } from "lucide-react";

// Since the portfolio is at /portfolio/, we need the site parameter
const SITE_PATH = "jeev170.github.io/portfolio";

export const Webring = () => {
  return (
    <footer className="relative py-8 border-t border-border/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Name */}
          <motion.span 
            className="font-bebas text-xl md:text-2xl tracking-wide text-foreground/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Jeevietha
          </motion.span>

          {/* Webring */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
        </div>
      </div>
    </footer>
  );
};
