import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const navLinks = [
  { name: "Home", sectionId: "home" },
  { name: "About", sectionId: "about" },
  { name: "Projects", sectionId: "projects" },
  { name: "Photos", sectionId: "photos" },
  { name: "Blog", sectionId: "blog" },
  { name: "Skills", sectionId: "skills" },
  { name: "Lab", sectionId: "lab" },
  { name: "Quotes", sectionId: "quotes" },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const Footer = () => {
  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("home")}
            className="text-3xl font-bold text-gradient text-center mb-8 block mx-auto cursor-pointer"
            style={{ fontFamily: "'Playfair Display', serif" }}
            whileHover={{ scale: 1.05 }}
          >
            Jeevietha
          </motion.button>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-32 h-px bg-gradient-cosmic mx-auto mb-8 opacity-50" />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with{" "}
            <Heart className="w-4 h-4 text-cosmic-pink fill-cosmic-pink animate-pulse" />{" "}
            in the cosmos
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
