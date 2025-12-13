import { motion, useInView } from "framer-motion";
import { Sparkles, Github } from "lucide-react";
import { useRef } from "react";
import { TiltCard } from "./TiltCard";

// ==========================================
// UPDATE YOUR PROJECT DETAILS HERE
// Add your project images to src/assets/projects/
// Add GitHub links for each project
// ==========================================
const projects = [
  {
    id: 1,
    title: "Aurora Studio",
    description: "Creative design tool for ethereal visual effects.",
    tags: ["Canvas", "WebGL", "Animation"],
    gradient: "from-cosmic-pink to-cosmic-purple",
    thumbnail: "linear-gradient(135deg, hsl(330 85% 45%) 0%, hsl(258 90% 50%) 50%, hsl(330 85% 35%) 100%)",
    delay: 0,
    github: "https://github.com/jeev170/aurora-studio",
  },
  {
    id: 2,
    title: "Stellar Commerce",
    description: "E-commerce platform with immersive 3D showcases.",
    tags: ["Next.js", "AR", "Stripe"],
    gradient: "from-cosmic-cyan to-cosmic-blue",
    thumbnail: "linear-gradient(135deg, hsl(185 85% 40%) 0%, hsl(220 90% 45%) 50%, hsl(185 85% 30%) 100%)",
    delay: 0.1,
    github: "https://github.com/jeev170/stellar-commerce",
  },
  {
    id: 3,
    title: "Dreamweaver CMS",
    description: "Content management for storytellers and creators.",
    tags: ["TypeScript", "GraphQL", "Cloud"],
    gradient: "from-cosmic-purple to-cosmic-pink",
    thumbnail: "linear-gradient(135deg, hsl(258 90% 45%) 0%, hsl(330 85% 50%) 50%, hsl(280 85% 40%) 100%)",
    delay: 0.2,
    github: "https://github.com/jeev170/dreamweaver-cms",
  },
  {
    id: 4,
    title: "Cosmic Chat",
    description: "Real-time messaging with AI-powered translation.",
    tags: ["Socket.io", "AI", "React"],
    gradient: "from-cosmic-blue to-cosmic-cyan",
    thumbnail: "linear-gradient(135deg, hsl(220 90% 40%) 0%, hsl(185 85% 45%) 50%, hsl(220 90% 30%) 100%)",
    delay: 0.3,
    github: "https://github.com/jeev170/cosmic-chat",
  },
  {
    id: 5,
    title: "Starlight Portfolio",
    description: "Animated portfolio with cosmic 3D elements.",
    tags: ["Framer Motion", "GSAP", "CSS"],
    gradient: "from-cosmic-pink to-cosmic-cyan",
    thumbnail: "linear-gradient(135deg, hsl(330 85% 40%) 0%, hsl(185 85% 50%) 50%, hsl(330 85% 30%) 100%)",
    delay: 0.4,
    github: "https://github.com/jeev170/starlight-portfolio",
  },
  {
    id: 6,
    title: "Nova Analytics",
    description: "Data visualization dashboard with cosmic theme.",
    tags: ["D3.js", "React", "Python"],
    gradient: "from-cosmic-purple to-cosmic-blue",
    thumbnail: "linear-gradient(135deg, hsl(258 90% 40%) 0%, hsl(220 90% 50%) 50%, hsl(258 90% 30%) 100%)",
    delay: 0.5,
    github: "https://github.com/jeev170/nova-analytics",
  },
];

// Portal opening animation variants
const portalVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const Projects = () => {
  return (
    <section id="projects" className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="font-syne text-2xl md:text-4xl font-bold">
              <span className="text-foreground">Project</span>{" "}
              <span className="text-gradient">Portals</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm max-w-md mx-auto">
            Step through each portal to explore my creative dimensions
          </p>
        </motion.div>

        {/* Projects Grid - 2 rows x 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {projects.map((project) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true, margin: "-50px" });
            
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
                <TiltCard 
                  tiltAmount={10} 
                  glareEnabled={true}
                  className="h-full"
                >
                  <div className="relative glass-strong rounded-xl md:rounded-2xl overflow-hidden cursor-pointer h-full">
                    {/* Portal Opening Glow Effect */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-xl md:rounded-2xl blur-lg`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, delay: project.delay + 0.2 }}
                    />

                    {/* Hover Glow Enhancement */}
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 rounded-xl md:rounded-2xl blur-lg transition-opacity duration-500`}
                    />

                    {/* Project Thumbnail */}
                    <div 
                      className="relative h-24 md:h-28 w-full overflow-hidden"
                      style={{ background: project.thumbnail }}
                    >
                      {/* Abstract cosmic pattern overlay */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-white/20 blur-xl" />
                        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-white/10 blur-2xl" />
                      </div>
                      {/* Gradient fade to card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                      
                      {/* Portal Ring in thumbnail */}
                      <motion.div
                        className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-r ${project.gradient} opacity-40 blur-sm`}
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
                    <div className="relative z-10 p-4 md:p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">
                          Portal #{project.id}
                        </span>
                      </div>

                      <h3 className="font-syne text-base md:text-lg font-bold mb-1.5 group-hover:text-gradient transition-all">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-xs md:text-sm mb-3 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags and GitHub */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[9px] md:text-[10px] rounded-full bg-secondary text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                        </motion.a>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl md:rounded-2xl pointer-events-none`}
                    />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
