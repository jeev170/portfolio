import { motion } from "framer-motion";
import { BookOpen, Hammer, Compass } from "lucide-react";

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

export const Currently = () => {
  return (
    <section id="currently" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
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
                className={`glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8 h-full bg-gradient-to-br ${item.gradient} group`}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl glass flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>

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