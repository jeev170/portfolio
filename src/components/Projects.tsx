import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "A cosmic analytics platform with real-time data visualization and AI-powered insights.",
    tags: ["React", "Three.js", "AI"],
    gradient: "from-cosmic-purple to-cosmic-blue",
    delay: 0,
  },
  {
    id: 2,
    title: "Aurora Studio",
    description: "Creative design tool for generating ethereal visual effects and animations.",
    tags: ["Canvas", "WebGL", "Animation"],
    gradient: "from-cosmic-pink to-cosmic-purple",
    delay: 0.1,
  },
  {
    id: 3,
    title: "Stellar Commerce",
    description: "E-commerce platform with immersive 3D product showcases and AR integration.",
    tags: ["Next.js", "AR", "Stripe"],
    gradient: "from-cosmic-cyan to-cosmic-blue",
    delay: 0.2,
  },
  {
    id: 4,
    title: "Dreamweaver CMS",
    description: "Content management system designed for storytellers and visual creators.",
    tags: ["TypeScript", "GraphQL", "Cloud"],
    gradient: "from-cosmic-purple to-cosmic-pink",
    delay: 0.3,
  },
];

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
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group perspective-1000"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: project.delay }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative glass-strong rounded-2xl md:rounded-3xl p-5 md:p-8 h-full preserve-3d cursor-pointer overflow-hidden"
                whileHover={{
                  rotateX: 5,
                  rotateY: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Portal Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 rounded-2xl md:rounded-3xl blur-xl transition-opacity duration-500`}
                />

                {/* Portal Ring */}
                <div
                  className={`absolute top-4 right-4 w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-r ${project.gradient} opacity-20 group-hover:opacity-60 group-hover:scale-150 transition-all duration-500 blur-sm`}
                />

                {/* Content */}
                <div className="relative z-10">
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
                  className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl md:rounded-3xl`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};