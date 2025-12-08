import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "A cosmic analytics platform with real-time data visualization and AI-powered insights.",
    tags: ["React", "Three.js", "AI"],
    gradient: "from-cosmic-purple to-cosmic-blue",
    thumbnail: "linear-gradient(135deg, hsl(258 90% 40%) 0%, hsl(220 90% 35%) 50%, hsl(258 90% 25%) 100%)",
    delay: 0,
  },
  {
    id: 2,
    title: "Aurora Studio",
    description: "Creative design tool for generating ethereal visual effects and animations.",
    tags: ["Canvas", "WebGL", "Animation"],
    gradient: "from-cosmic-pink to-cosmic-purple",
    thumbnail: "linear-gradient(135deg, hsl(330 85% 45%) 0%, hsl(258 90% 50%) 50%, hsl(330 85% 35%) 100%)",
    delay: 0.1,
  },
  {
    id: 3,
    title: "Stellar Commerce",
    description: "E-commerce platform with immersive 3D product showcases and AR integration.",
    tags: ["Next.js", "AR", "Stripe"],
    gradient: "from-cosmic-cyan to-cosmic-blue",
    thumbnail: "linear-gradient(135deg, hsl(185 85% 40%) 0%, hsl(220 90% 45%) 50%, hsl(185 85% 30%) 100%)",
    delay: 0.2,
  },
  {
    id: 4,
    title: "Dreamweaver CMS",
    description: "Content management system designed for storytellers and visual creators.",
    tags: ["TypeScript", "GraphQL", "Cloud"],
    gradient: "from-cosmic-purple to-cosmic-pink",
    thumbnail: "linear-gradient(135deg, hsl(258 90% 45%) 0%, hsl(330 85% 50%) 50%, hsl(280 85% 40%) 100%)",
    delay: 0.3,
  },
];

// Portal opening animation variants
const portalVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
    filter: "blur(10px)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
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
            <span className="text-foreground">Project</span>{" "}
            <span className="text-gradient">Portals</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Step through each portal to explore my creative dimensions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
          {projects.map((project) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-100px" });
            
            return (
              <motion.div
                key={project.id}
                ref={ref}
                className="group perspective-1000"
                variants={portalVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={project.delay}
              >
                <motion.div
                  className="relative glass-strong rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer"
                  whileHover={{
                    rotateX: 3,
                    rotateY: -3,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Portal Opening Glow Effect - expands on viewport entry */}
                  <motion.div
                    className={`absolute -inset-2 bg-gradient-to-r ${project.gradient} rounded-2xl md:rounded-3xl blur-xl`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, delay: project.delay + 0.2 }}
                  />

                  {/* Hover Glow Enhancement */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-40 rounded-2xl md:rounded-3xl blur-xl transition-opacity duration-500`}
                  />

                  {/* Project Thumbnail */}
                  <div 
                    className="relative h-32 md:h-40 w-full overflow-hidden"
                    style={{ background: project.thumbnail }}
                  >
                    {/* Abstract cosmic pattern overlay */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-white/20 blur-xl" />
                      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
                    </div>
                    {/* Gradient fade to card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                    
                    {/* Portal Ring in thumbnail */}
                    <motion.div
                      className={`absolute top-4 right-4 w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-r ${project.gradient} opacity-40 blur-sm`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-5 md:p-8">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                        Portal #{project.id}
                      </span>
                    </div>

                    <h3 className="font-syne text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-gradient transition-all">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full bg-secondary text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 md:gap-4">
                      <motion.button
                        className="glass px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 text-xs md:text-sm hover:bg-primary/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                        <span>View</span>
                      </motion.button>
                      <motion.button
                        className="glass px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 text-xs md:text-sm hover:bg-primary/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-3 h-3 md:w-4 md:h-4" />
                        <span>Code</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl md:rounded-3xl pointer-events-none`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};