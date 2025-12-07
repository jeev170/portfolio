import { motion } from "framer-motion";
import { Download, Code2, Database, Palette, Brain, Cloud, Terminal } from "lucide-react";

const skillCategories = [
  {
    name: "Frontend",
    icon: Code2,
    color: "cosmic-purple",
    skills: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    icon: Database,
    color: "cosmic-blue",
    skills: ["Node.js", "Python", "PostgreSQL", "GraphQL", "REST APIs", "Prisma"],
  },
  {
    name: "Design",
    icon: Palette,
    color: "cosmic-pink",
    skills: ["Figma", "Adobe XD", "After Effects", "Blender", "UI/UX", "Prototyping"],
  },
  {
    name: "ML & Data",
    icon: Brain,
    color: "cosmic-cyan",
    skills: ["TensorFlow", "PyTorch", "Pandas", "Scikit-learn", "Jupyter", "Data Viz"],
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    color: "cosmic-purple",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel", "Supabase"],
  },
  {
    name: "Tools",
    icon: Terminal,
    color: "cosmic-pink",
    skills: ["Git", "VS Code", "Vim", "Postman", "Linear", "Notion"],
  },
];

const SkillBubble = ({ skill, index, categoryIndex }: { skill: string; index: number; categoryIndex: number }) => {
  return (
    <motion.span
      className="px-4 py-2 glass rounded-full text-sm font-medium hover:bg-primary/20 hover:scale-105 transition-all cursor-default"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: 0.1 + categoryIndex * 0.1 + index * 0.05,
        type: "spring",
        stiffness: 200 
      }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
    >
      {skill}
    </motion.span>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Skills</span>{" "}
            <span className="text-foreground">& Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            The cosmic toolkit powering my creations
          </p>

          {/* Download Resume Button */}
          <motion.button
            className="relative group glass-strong px-8 py-4 rounded-full font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-primary/20 blur-xl" />
            
            <span className="relative flex items-center gap-3">
              <Download className="w-5 h-5 text-primary" />
              <span className="text-foreground">Download Resume</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="glass-strong rounded-3xl p-6 group hover:bg-card/70 transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className={`w-12 h-12 rounded-xl glass flex items-center justify-center`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <category.icon className={`w-6 h-6 text-${category.color}`} />
                </motion.div>
                <h3 className="font-syne text-xl font-bold">{category.name}</h3>
              </div>

              {/* Skills Bubbles */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <SkillBubble 
                    key={skill} 
                    skill={skill} 
                    index={index} 
                    categoryIndex={categoryIndex} 
                  />
                ))}
              </div>

              {/* Hover glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-${category.color}/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity -z-10`} />
            </motion.div>
          ))}
        </div>

        {/* Floating Skill Orbs - Decorative */}
        <div className="relative h-32 mt-16 hidden lg:block">
          {["React", "Python", "Figma", "AWS", "TypeScript"].map((skill, index) => (
            <motion.div
              key={skill}
              className="absolute glass rounded-full px-4 py-2 text-sm font-medium"
              style={{
                left: `${15 + index * 18}%`,
                top: `${20 + (index % 2) * 30}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, index % 2 === 0 ? 5 : -5, 0],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
