import { motion } from "framer-motion";
import { Rocket, Camera, BookOpen, Mail } from "lucide-react";
import cosmicBg from "@/assets/cosmic-bg.jpg";

const satellites = [
  { icon: Rocket, label: "Projects", href: "#projects", delay: 0, orbitRadius: 140 },
  { icon: Camera, label: "Photos", href: "#photos", delay: 0.33, orbitRadius: 140 },
  { icon: BookOpen, label: "Blog", href: "#blog", delay: 0.66, orbitRadius: 140 },
];

export const Hero = () => {
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
      <div className="relative z-10 flex flex-col items-center">
        {/* Planet Container */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Orbit Path */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[280px] h-[280px] rounded-full border border-primary/20 animate-spin-slow" />
          </div>

          {/* Planet Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-cosmic opacity-30 blur-3xl animate-pulse-glow" />
          </div>

          {/* Planet */}
          <motion.div
            className="relative w-32 h-32 rounded-full bg-gradient-cosmic shadow-2xl animate-float"
            style={{
              boxShadow: "0 0 80px hsl(var(--cosmic-purple) / 0.5), inset -10px -10px 30px hsl(var(--cosmic-pink) / 0.3)",
            }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Planet Surface Details */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-transparent" />
            <div className="absolute top-4 left-6 w-8 h-4 rounded-full bg-cosmic-pink/20 blur-sm" />
            <div className="absolute bottom-6 right-4 w-6 h-3 rounded-full bg-cosmic-blue/20 blur-sm" />
          </motion.div>

          {/* Satellites */}
          {satellites.map((satellite, index) => (
            <motion.a
              key={satellite.label}
              href={satellite.href}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.2 }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: satellite.delay * 20,
                }}
                style={{ transformOrigin: "center center" }}
              >
                <motion.div
                  className="absolute glass-strong rounded-full p-3 cursor-pointer group"
                  style={{
                    transform: `translateX(${satellite.orbitRadius}px)`,
                  }}
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: satellite.delay * 20,
                  }}
                >
                  <satellite.icon className="w-5 h-5 text-primary group-hover:text-cosmic-pink transition-colors" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h1 className="font-syne text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Explore the</span>
            <br />
            <span className="text-foreground">Dreamscape</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto mb-8">
            A cosmic journey through creativity, code, and visual storytelling
          </p>

          <motion.a
            href="#about"
            className="inline-flex items-center gap-2 glass px-8 py-4 rounded-full font-medium hover:bg-primary/20 transition-all glow-primary group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Begin Journey</span>
            <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
