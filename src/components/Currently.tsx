import { motion } from "framer-motion";
import { BookOpen, Hammer, Compass } from "lucide-react";
import { useEffect, useRef } from "react";

const currentlyItems = [
  {
    icon: BookOpen,
    label: "Learning",
    title: "Machine Learning & AI",
    description: "Diving deep into neural networks, NLP, and building small ML projects to understand how AI thinks.",
    gradient: "from-cosmic-purple/30 to-cosmic-pink/30",
  },
  {
    icon: Hammer,
    label: "Building",
    title: "A Personal Knowledge Base",
    description: "Creating a second brain app that connects ideas visually — think mind maps meets note-taking.",
    gradient: "from-cosmic-blue/30 to-cosmic-cyan/30",
  },
  {
    icon: Compass,
    label: "Exploring",
    title: "The Art of Slowing Down",
    description: "Learning that productivity isn't everything. Rediscovering hobbies, long walks, and doing nothing guilt-free.",
    gradient: "from-cosmic-pink/30 to-cosmic-purple/30",
  },
];

// Rotating nebula texture component
const RotatingNebula = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px]"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, hsl(var(--cosmic-purple) / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, hsl(var(--cosmic-pink) / 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(var(--cosmic-blue) / 0.04) 0%, transparent 60%)
          `,
          filter: "blur(60px)",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const Currently = () => {
  return (
    <section id="currently" className="relative py-16 md:py-20 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Rotating Nebula Background */}
      <RotatingNebula />

      {/* Static Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-3xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Right</span>{" "}
            <span className="text-gradient">Now</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            What's keeping me curious these days
          </p>
        </motion.div>

        {/* Currently Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {currentlyItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={`relative glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8 h-full bg-gradient-to-br ${item.gradient} group overflow-hidden`}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Hover Glow Outline */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--cosmic-purple) / 0.4), hsl(var(--cosmic-pink) / 0.4), hsl(var(--cosmic-blue) / 0.4))",
                    padding: "1px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                  }}
                />

                {/* Icon with Breathe Effect */}
                <motion.div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl glass flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </motion.div>

                {/* Label */}
                <span className="inline-block glass px-3 py-1 rounded-full text-xs font-medium text-primary mb-3 md:mb-4">
                  {item.label}
                </span>

                {/* Title */}
                <h3 className="font-syne text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-gradient transition-all">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Personal note */}
        <motion.p
          className="text-center text-muted-foreground text-sm mt-10 md:mt-14 max-w-lg mx-auto italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          "I believe the best work comes from people who never stop being curious."
        </motion.p>
      </div>
    </section>
  );
};