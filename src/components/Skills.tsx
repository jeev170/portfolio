import { motion } from "framer-motion";
import { Download, Code2, Database, Palette, Brain, Cloud, Terminal } from "lucide-react";

const skillCategories = [
  {
    name: "Frontend",
    icon: Code2,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    icon: Database,
    skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "Express"],
  },
  {
    name: "Design",
    icon: Palette,
    skills: ["Figma", "Adobe XD", "UI/UX", "Prototyping", "Canva"],
  },
  {
    name: "ML & Data",
    icon: Brain,
    skills: ["TensorFlow", "PyTorch", "Pandas", "Scikit-learn", "Jupyter"],
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Docker", "CI/CD", "Vercel", "Git"],
  },
  {
    name: "Tools",
    icon: Terminal,
    skills: ["VS Code", "Postman", "Linear", "Notion", "GitHub"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-3xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Skills</span>{" "}
            <span className="text-foreground">& Tools</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto mb-8">
            The cosmic toolkit powering my creations
          </p>

          {/* Download Resume Button */}
          <motion.button
            className="relative group glass-strong px-6 md:px-8 py-3 md:py-4 rounded-full font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-primary/20 blur-xl" />
            
            <span className="relative flex items-center gap-3">
              <Download className="w-5 h-5 text-primary" />
              <span className="text-foreground text-sm md:text-base">Download Resume</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="glass-strong rounded-2xl md:rounded-3xl p-4 md:p-6 group hover:bg-card/70 transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <motion.div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <category.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </motion.div>
                <h3 className="font-syne text-lg md:text-xl font-bold">{category.name}</h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 md:px-4 py-1.5 md:py-2 glass rounded-full text-xs md:text-sm font-medium hover:bg-primary/20 transition-all cursor-default"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.1 + categoryIndex * 0.1 + index * 0.05,
                      type: "spring",
                      stiffness: 200 
                    }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};