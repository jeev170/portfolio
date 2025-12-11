import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Code2, Palette, Zap } from "lucide-react";

const highlights = [
  { icon: Code2, text: "Full-Stack Developer" },
  { icon: Palette, text: "Creative Designer" },
  { icon: Zap, text: "Innovation Enthusiast" },
  { icon: Sparkles, text: "Dream Architect" },
];

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-16 md:py-20 overflow-hidden flex items-center"
    >
      {/* Fog Layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute -left-1/4 top-1/4 w-[500px] md:w-[800px] h-[500px] md:h-[800px] rounded-full bg-primary/10 blur-[120px]"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-accent/10 blur-[100px]"
        style={{ y: y3 }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          style={{ opacity }}
        >
          {/* Section Title */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne text-3xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">About</span>{" "}
              <span className="text-foreground">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-cosmic mx-auto rounded-full" />
          </motion.div>

          {/* Content */}
          <motion.div
            className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8">
              I'm{" "}
              <span className="text-gradient font-semibold">
                Jeevietha
              </span>
              , a dreamer and creator who transforms ideas into immersive digital experiences. With a passion
              for blending art and technology, I craft interfaces that feel like
              stepping into another world.
            </p>

            <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-8 md:mb-12">
              My journey spans from ethereal web applications to captivating
              visual narratives. Each project is a{" "}
              <span className="text-cosmic-pink font-semibold">
                constellation
              </span>{" "}
              of creativity, precision, and endless curiosity.
            </p>

            {/* Highlight Pills */}
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  className="glass px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 md:gap-3 group hover:bg-primary/20 transition-all cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:text-cosmic-pink transition-colors" />
                  <span className="text-foreground font-medium text-sm md:text-base">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};