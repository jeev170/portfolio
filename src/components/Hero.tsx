import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Rocket, Camera, BookOpen, User, Sparkles, Quote, Mail, Code2, FlaskConical } from "lucide-react";
import { useEffect, useState } from "react";
import cosmicBg from "@/assets/cosmic-bg.jpg";

const satellites = [
  { icon: User, label: "About", sectionId: "about", delay: 0 },
  { icon: Rocket, label: "Projects", sectionId: "projects", delay: 0.125 },
  { icon: Camera, label: "Photos", sectionId: "photos", delay: 0.25 },
  { icon: BookOpen, label: "Blog", sectionId: "blog", delay: 0.375 },
  { icon: Code2, label: "Skills", sectionId: "skills", delay: 0.5 },
  { icon: FlaskConical, label: "Lab", sectionId: "lab", delay: 0.625 },
  { icon: Quote, label: "Quotes", sectionId: "quotes", delay: 0.75 },
  { icon: Mail, label: "Connect", sectionId: "connect", delay: 0.875 },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Particle burst component
const ParticleBurst = ({ isActive }: { isActive: boolean }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
    delay: i * 0.02,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--cosmic-pink)), hsl(var(--cosmic-purple)))`,
            boxShadow: "0 0 6px hsl(var(--cosmic-pink))",
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={
            isActive
              ? {
                  x: Math.cos((particle.angle * Math.PI) / 180) * 60,
                  y: Math.sin((particle.angle * Math.PI) / 180) * 60,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }
              : { x: 0, y: 0, opacity: 0, scale: 0 }
          }
          transition={{
            duration: 0.6,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const orbitRadius = 110; // Smaller orbit for desktop
  const orbitRadiusMobile = 80; // Smaller orbit for mobile
  const [buttonHovered, setButtonHovered] = useState(false);

  // Clean circular orbit motion for satellites
  const useSatellitePosition = (index: number) => {
    const time = useMotionValue(0);
    const baseAngle = (index / satellites.length) * 360;
    
    useEffect(() => {
      const controls = animate(time, 360, {
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      });
      return controls.stop;
    }, [time]);

    const posX = useTransform(time, (t) => {
      const angle = ((baseAngle + t) * Math.PI) / 180;
      return Math.cos(angle) * orbitRadius;
    });
    
    const posY = useTransform(time, (t) => {
      const angle = ((baseAngle + t) * Math.PI) / 180;
      return Math.sin(angle) * orbitRadius;
    });

    const posXMobile = useTransform(time, (t) => {
      const angle = ((baseAngle + t) * Math.PI) / 180;
      return Math.cos(angle) * orbitRadiusMobile;
    });
    
    const posYMobile = useTransform(time, (t) => {
      const angle = ((baseAngle + t) * Math.PI) / 180;
      return Math.sin(angle) * orbitRadiusMobile;
    });

    return { posX, posY, posXMobile, posYMobile };
  };

  // Satellite component with clean circular motion
  const Satellite = ({ satellite, index }: { satellite: typeof satellites[0]; index: number }) => {
    const { posX, posY, posXMobile, posYMobile } = useSatellitePosition(index);

    return (
      <motion.button
        onClick={() => scrollToSection(satellite.sectionId)}
        className="absolute top-1/2 left-1/2 cursor-pointer group z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + index * 0.1 }}
      >
        {/* Desktop position */}
        <motion.div
          className="hidden md:block absolute glass-strong rounded-full p-2.5 cursor-pointer"
          style={{
            x: posX,
            y: posY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          whileHover={{ scale: 1.3 }}
        >
          <satellite.icon className="w-4 h-4 text-primary group-hover:text-cosmic-pink transition-colors" />
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
            {satellite.label}
          </span>
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 transition-all blur-md" />
        </motion.div>

        {/* Mobile position */}
        <motion.div
          className="md:hidden absolute glass-strong rounded-full p-2 cursor-pointer"
          style={{
            x: posXMobile,
            y: posYMobile,
            translateX: "-50%",
            translateY: "-50%",
          }}
          whileHover={{ scale: 1.3 }}
        >
          <satellite.icon className="w-3.5 h-3.5 text-primary group-hover:text-cosmic-pink transition-colors" />
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 transition-all blur-md" />
        </motion.div>
      </motion.button>
    );
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
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

      {/* Content Container - centered vertically */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Planet Container */}
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Planet Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-cosmic opacity-30 blur-3xl animate-pulse-glow" />
          </div>

          {/* Planet */}
          <motion.div
            className="relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-cosmic shadow-2xl animate-float"
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

          {/* Satellites with clean circular movement */}
          {satellites.map((satellite, index) => (
            <Satellite key={satellite.label} satellite={satellite} index={index} />
          ))}
        </motion.div>

        {/* Hero Text */}
        <motion.div
          className="mt-16 md:mt-20 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Galaxy Ripple Effect behind name */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -top-6">
            <motion.div
              className="w-[300px] h-[150px] md:w-[500px] md:h-[200px] rounded-full opacity-40"
              style={{
                background: "radial-gradient(ellipse, hsl(var(--cosmic-purple) / 0.3) 0%, hsl(var(--cosmic-pink) / 0.15) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <h1 className="text-4xl md:text-7xl font-bold mb-3 md:mb-4 tracking-tight relative z-10">
            <span className="text-gradient font-body">Hey, I'm</span>
            <br />
            <span className="text-foreground font-retro text-5xl md:text-8xl tracking-wide">JEEVIETHA</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg max-w-md mx-auto mb-5 md:mb-6 leading-relaxed relative z-10 font-body">
            A dreamer who codes, creates, and captures moments — crafting stories through pixels and passion.
          </p>

          {/* Explore Button with Particle Burst */}
          <motion.button
            onClick={() => scrollToSection("about")}
            className="relative inline-flex items-center gap-2 glass px-5 md:px-7 py-2.5 md:py-3 rounded-full font-medium hover:bg-primary/20 transition-all glow-primary group text-sm overflow-visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setButtonHovered(true)}
            onHoverEnd={() => setButtonHovered(false)}
          >
            <ParticleBurst isActive={buttonHovered} />
            <span className="relative z-10">Let's explore</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform relative z-10" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
