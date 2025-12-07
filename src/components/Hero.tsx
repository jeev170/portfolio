import { motion } from "framer-motion";
import { Rocket, Camera, BookOpen, User, Sparkles, Quote, Mail, Code2, FlaskConical } from "lucide-react";
import cosmicBg from "@/assets/cosmic-bg.jpg";

const satellites = [
  { icon: User, label: "About", href: "#about", delay: 0 },
  { icon: Rocket, label: "Projects", href: "#projects", delay: 0.125 },
  { icon: Camera, label: "Photos", href: "#photos", delay: 0.25 },
  { icon: BookOpen, label: "Blog", href: "#blog", delay: 0.375 },
  { icon: Code2, label: "Skills", href: "#skills", delay: 0.5 },
  { icon: FlaskConical, label: "Lab", href: "#lab", delay: 0.625 },
  { icon: Quote, label: "Quotes", href: "#quotes", delay: 0.75 },
  { icon: Mail, label: "Connect", href: "#connect", delay: 0.875 },
];

export const Hero = () => {
  const orbitRadius = 120;
  const orbitRadiusMobile = 90;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={cosmicBg}
          alt="Cosmic background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </div>

      {/* Floating Planet with Satellites */}
      <div className="relative z-10 flex flex-col items-center pt-16 md:pt-0">
        {/* Planet Container */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Orbit Path */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border border-primary/20 animate-spin-slow" />
          </div>

          {/* Planet Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-cosmic opacity-30 blur-3xl animate-pulse-glow" />
          </div>

          {/* Planet */}
          <motion.div
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-cosmic shadow-2xl animate-float"
            style={{
              boxShadow: "0 0 80px hsl(var(--cosmic-purple) / 0.5), inset -10px -10px 30px hsl(var(--cosmic-pink) / 0.3)",
            }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Planet Surface Details */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-transparent" />
            <div className="absolute top-4 left-6 w-6 md:w-8 h-3 md:h-4 rounded-full bg-cosmic-pink/20 blur-sm" />
            <div className="absolute bottom-6 right-4 w-4 md:w-6 h-2 md:h-3 rounded-full bg-cosmic-blue/20 blur-sm" />
          </motion.div>

          {/* Satellites */}
          {satellites.map((satellite, index) => (
            <motion.a
              key={satellite.label}
              href={satellite.href}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  delay: satellite.delay * 30,
                }}
                style={{ transformOrigin: "center center" }}
              >
                <motion.div
                  className="absolute glass-strong rounded-full p-2 md:p-2.5 cursor-pointer group"
                  style={{
                    transform: `translateX(${orbitRadiusMobile}px)`,
                  }}
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    delay: satellite.delay * 30,
                  }}
                >
                  <satellite.icon className="w-3 h-3 md:w-4 md:h-4 text-primary group-hover:text-cosmic-pink transition-colors" />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {satellite.label}
                  </span>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 transition-all blur-md" />
                </motion.div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Hero Text */}
        <motion.div
          className="mt-16 md:mt-20 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h1 className="font-syne text-4xl md:text-7xl font-bold mb-4 md:mb-6">
            <span className="text-gradient">Hi, I'm</span>
            <br />
            <span className="text-foreground">Jeevietha</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-md mx-auto mb-6 md:mb-8">
            A cosmic journey through creativity, code, and visual storytelling
          </p>

          <motion.a
            href="#about"
            className="inline-flex items-center gap-2 glass px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-primary/20 transition-all glow-primary group text-sm md:text-base"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Begin Journey</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};