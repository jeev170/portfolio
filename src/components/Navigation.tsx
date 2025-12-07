import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Photos", href: "#photos" },
  { name: "Blog", href: "#blog" },
  { name: "Quotes", href: "#quotes" },
];

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#home"
          className="font-syne text-2xl font-bold text-gradient"
          whileHover={{ scale: 1.05 }}
        >
          Dreamscape
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-cosmic group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <motion.button
          className="glass px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition-all glow-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
        </motion.button>
      </div>
    </motion.nav>
  );
};
