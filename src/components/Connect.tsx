import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, ArrowRight, Sparkles } from "lucide-react";

const socialLinks = [
  { 
    icon: Mail, 
    label: "Email", 
    href: "mailto:jeevietha11@gmail.com",
    description: "Drop by"
  },
  { 
    icon: Github, 
    label: "GitHub", 
    href: "https://github.com/jeev170",
    description: "Check my code"
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    href: "https://linkedin.com/in/jeevietha",
    description: "Let's connect"
  },
  { 
    icon: Instagram, 
    label: "Instagram", 
    href: "https://instagram.com/jeevietha_",
    description: "See my world"
  },
];

export const Connect = () => {
  return (
    <section id="connect" className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Content */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Floating icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full glass-strong mb-6 md:mb-8"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </motion.div>

          <h2 className="font-syne text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
            <span className="text-foreground">Let's Build</span>
            <br />
            <span className="text-gradient">Something Beautiful</span>
          </h2>

          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-12 px-4">
            Looking to discuss a project or potential collaboration?
            I’m available for opportunities and open conversations.
          </p>

          {/* CTA Button */}
          <motion.a
            href="mailto:jeevietha@example.com"
            className="inline-flex items-center gap-2 md:gap-3 glass-strong px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-sm md:text-lg mb-12 md:mb-16 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full bg-gradient-cosmic opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[2px] rounded-full bg-card" />
            
            <span className="relative flex items-center gap-2 md:gap-3">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="glass-strong rounded-xl md:rounded-2xl p-4 md:p-6 text-center relative overflow-hidden"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl glass flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 10 }}
                  >
                    <social.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                  </motion.div>

                  <h3 className="font-syne font-bold text-sm md:text-lg mb-1">{social.label}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{social.description}</p>

                  {/* Hover glow */}
                  <div className="absolute -inset-1 bg-primary/20 opacity-0 group-hover:opacity-100 rounded-xl md:rounded-2xl blur-xl transition-opacity -z-10" />
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* Decorative line */}
          <motion.div
            className="w-24 md:w-32 h-1 bg-gradient-cosmic mx-auto mt-12 md:mt-16 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </div>
    </section>
  );
};
