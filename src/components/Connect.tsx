import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, ArrowRight, Sparkles } from "lucide-react";

const socialLinks = [
  { 
    icon: Mail, 
    label: "Email", 
    href: "mailto:hello@dreamscape.dev",
    color: "cosmic-purple",
    description: "Drop me a message"
  },
  { 
    icon: Github, 
    label: "GitHub", 
    href: "#",
    color: "cosmic-blue",
    description: "Check my code"
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    href: "#",
    color: "cosmic-cyan",
    description: "Let's connect"
  },
  { 
    icon: Instagram, 
    label: "Instagram", 
    href: "#",
    color: "cosmic-pink",
    description: "See my world"
  },
];

export const Connect = () => {
  return (
    <section id="connect" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
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

      <div className="container mx-auto px-6 relative z-10">
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-strong mb-8"
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
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>

          <h2 className="font-syne text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">Let's Build</span>
            <br />
            <span className="text-gradient">Something Beautiful</span>
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Have a project in mind? Want to collaborate on something cosmic? 
            I'm always excited to connect with fellow dreamers and creators.
          </p>

          {/* CTA Button */}
          <motion.a
            href="mailto:hello@dreamscape.dev"
            className="inline-flex items-center gap-3 glass-strong px-8 py-4 rounded-full font-medium text-lg mb-16 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full bg-gradient-cosmic opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[2px] rounded-full bg-card" />
            
            <span className="relative flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span>Start a Conversation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
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
                  className="glass-strong rounded-2xl p-6 text-center relative overflow-hidden"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-xl glass flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 10 }}
                  >
                    <social.icon className={`w-7 h-7 text-${social.color}`} />
                  </motion.div>

                  <h3 className="font-syne font-bold text-lg mb-1">{social.label}</h3>
                  <p className="text-muted-foreground text-sm">{social.description}</p>

                  {/* Hover glow */}
                  <div className={`absolute -inset-1 bg-${social.color}/20 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity -z-10`} />
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* Decorative line */}
          <motion.div
            className="w-32 h-1 bg-gradient-cosmic mx-auto mt-16 rounded-full"
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
