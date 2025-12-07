import { motion } from "framer-motion";
import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export const Footer = () => {
  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <motion.h3
            className="font-syne text-3xl font-bold text-gradient mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Dreamscape
          </motion.h3>

          {/* Tagline */}
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Crafting ethereal digital experiences from the depths of imagination
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="glass p-3 rounded-full hover:bg-primary/20 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
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
          <p className="text-xs text-muted-foreground/60 mt-2">
            © 2024 Dreamscape. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
