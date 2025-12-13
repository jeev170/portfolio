import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Shuffle, Globe, Clock } from "lucide-react";
import { useEffect, useState } from "react";

// Since the portfolio is at /portfolio/, we need the site parameter
const SITE_PATH = "jeev170.github.io/portfolio";

// Status options that rotate
const statusOptions = ["Exploring", "Building", "Learning", "Creating", "Dreaming"];

export const Webring = () => {
  const [time, setTime] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Convert to India Standard Time (UTC+5:30)
      const indiaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const hours = indiaTime.getHours();
      const minutes = indiaTime.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      setTime(`${displayHours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Rotate status every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => {
        const currentIndex = statusOptions.indexOf(prev);
        return statusOptions[(currentIndex + 1) % statusOptions.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative py-6 border-t border-border/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-4">
          {/* Live Status */}
          <motion.div
            className="flex items-center gap-2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Clock className="w-3 h-3 text-primary" />
            <span>Currently: {time} in India</span>
            <span className="text-foreground/30">•</span>
            <motion.span 
              key={status}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary"
            >
              {status}
            </motion.span>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
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
      </div>
    </footer>
  );
};
