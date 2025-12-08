import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Rocket, Camera, BookOpen, User, Sparkles, Quote, Mail, Code2, FlaskConical } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
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
  const orbitRadius = 180; // Bigger orbit for desktop
  const orbitRadiusMobile = 120; // Bigger orbit for mobile
  const [buttonHovered, setButtonHovered] = useState(false);

  // Create organic floating motion for satellites
  const useSatellitePosition = (index: number) => {
    const time = useMotionValue(0);
    const baseAngle = (index / satellites.length) * 360;
    
    useEffect(() => {
      const controls = animate(time, 360, {
        duration: 50 + index * 3,
        repeat: Infinity,
        ease: "linear",
      });
      return controls.stop;
    }, [time, index]);

    // Create organic wobble
    const wobbleX = useTransform(time, (t) => {
      const angle = ((baseAngle + t) * Math.PI) / 180;
      const wobble = Math.sin(t * 0.05 + index) * 8;
      return Math.cos(angle) * (orbitRadius + wobble);
    });
    
    const wobbleY = useTransform(time, (t) => {
      const angle = ((baseAngle + t) * Math.PI) / 180;
      const wobble = Math.cos(t * 0.07 + index * 0.5) * 6;
      return Math.sin(angle) * (orbitRadius + wobble);
    });

    const wobbleXMobile = useTransform(time, (t) => {
      const angle = ((baseAngle + t) * Math.PI) / 180;
      const wobble = Math.sin(t * 0.05 + index) * 5;
      return Math.cos(angle) * (orbitRadiusMobile + wobble);
    });
    
    const wobbleYMobile = useTransform(time, (t) => {
      const angle = ((baseAngle + t) * Math.PI) / 180;
      const wobble = Math.cos(t * 0.07 + index * 0.5) * 4;
      return Math.sin(angle) * (orbitRadiusMobile + wobble);
    });

    return { wobbleX, wobbleY, wobbleXMobile, wobbleYMobile };
  };

  // Satellite component with organic motion
  const Satellite = ({ satellite, index }: { satellite: typeof satellites[0]; index: number }) => {
    const { wobbleX, wobbleY, wobbleXMobile, wobbleYMobile } = useSatellitePosition(index);

    return (
      <motion.a
        href={satellite.href}
        className="absolute top-1/2 left-1/2 cursor-pointer group z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + index * 0.1 }}
      >
        {/* Desktop position */}
        <motion.div
          className="hidden md:block absolute glass-strong rounded-full p-3 cursor-pointer"
          style={{
            x: wobbleX,
            y: wobbleY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          whileHover={{ scale: 1.3 }}
        >
          <satellite.icon className="w-5 h-5 text-primary group-hover:text-cosmic-pink transition-colors" />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
            {satellite.label}
          </span>
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 transition-all blur-md" />
        </motion.div>

        {/* Mobile position */}
        <motion.div
          className="md:hidden absolute glass-strong rounded-full p-2.5 cursor-pointer"
          style={{
            x: wobbleXMobile,
            y: wobbleYMobile,
            translateX: "-50%",
            translateY: "-50%",
          }}
          whileHover={{ scale: 1.3 }}
        >
          <satellite.icon className="w-4 h-4 text-primary group-hover:text-cosmic-pink transition-colors" />
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 transition-all blur-md" />
        </motion.div>
      </motion.a>
    );
  };

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
          {/* Orbit Path - dashed for organic feel */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="rounded-full border border-dashed border-primary/15"
              style={{
                width: `${orbitRadiusMobile * 2 + 20}px`,
                height: `${orbitRadiusMobile * 2 + 20}px`,
              }}
            />
          </div>
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div 
              className="rounded-full border border-dashed border-primary/15"
              style={{
                width: `${orbitRadius * 2 + 30}px`,
                height: `${orbitRadius * 2 + 30}px`,
              }}
            />
          </div>

          {/* Planet Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-cosmic opacity-30 blur-3xl animate-pulse-glow" />
          </div>

          {/* Planet - BIGGER */}
          <motion.div
            className="relative w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-cosmic shadow-2xl animate-float"
            style={{
              boxShadow: "0 0 100px hsl(var(--cosmic-purple) / 0.5), inset -12px -12px 40px hsl(var(--cosmic-pink) / 0.3)",
            }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Planet Surface Details */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cosmic-purple/30 to-transparent" />
            <div className="absolute top-6 left-8 w-10 h-5 rounded-full bg-cosmic-pink/20 blur-sm" />
            <div className="absolute bottom-8 right-6 w-8 h-4 rounded-full bg-cosmic-blue/20 blur-sm" />
          </motion.div>

          {/* Satellites with organic movement */}
          {satellites.map((satellite, index) => (
            <Satellite key={satellite.label} satellite={satellite} index={index} />
          ))}
        </motion.div>

        {/* Hero Text with Galaxy Ripple */}
        <motion.div
          className="mt-24 md:mt-32 text-center px-4 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Galaxy Ripple Effect behind name */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -top-8">
            <motion.div
              className="w-[400px] h-[200px] md:w-[600px] md:h-[300px] rounded-full opacity-40"
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
            {/* Secondary ripple layer */}
            <motion.div
              className="absolute w-[300px] h-[150px] md:w-[500px] md:h-[250px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, hsl(var(--cosmic-pink) / 0.2) 0%, transparent 60%)",
                filter: "blur(30px)",
              }}
              animate={{
                scale: [1.02, 1, 1.02],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>

          <h1 className="font-display text-5xl md:text-8xl font-bold mb-4 md:mb-6 tracking-tight relative z-10">
            <span className="text-gradient">Hey, I'm</span>
            <br />
            <span className="text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Jeevietha</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-lg mx-auto mb-6 md:mb-8 leading-relaxed relative z-10">
            Exploring the intersection of creativity, code, and curiosity — one project at a time.
          </p>

          {/* Explore Button with Particle Burst */}
          <motion.a
            href="#about"
            className="relative inline-flex items-center gap-2 glass px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-primary/20 transition-all glow-primary group text-sm md:text-base overflow-visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setButtonHovered(true)}
            onHoverEnd={() => setButtonHovered(false)}
          >
            <ParticleBurst isActive={buttonHovered} />
            <span className="relative z-10">Let's explore</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform relative z-10" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};