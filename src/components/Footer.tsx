import { motion } from "framer-motion";

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
            className="text-3xl font-bold text-gradient text-center block mx-auto cursor-pointer"
            style={{ fontFamily: "'Playfair Display', serif" }}
            whileHover={{ scale: 1.05 }}
          >
            Jeevietha
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};
