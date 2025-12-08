import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CosmicCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const trailX = useSpring(0, { damping: 40, stiffness: 200 });
  const trailY = useSpring(0, { damping: 40, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  // Hide on touch devices
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer glow trail */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-screen hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="w-12 h-12 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(var(--cosmic-purple)) 0%, hsl(var(--cosmic-pink) / 0.5) 40%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      {/* Main cursor orb */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-5 h-5 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--cosmic-pink)) 0%, hsl(var(--cosmic-purple)) 60%, transparent 100%)",
            boxShadow: "0 0 20px hsl(var(--cosmic-purple) / 0.6), 0 0 40px hsl(var(--cosmic-pink) / 0.4)",
          }}
        />
      </motion.div>

      {/* Inner bright core */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-2 h-2 rounded-full bg-foreground/80"
          style={{
            boxShadow: "0 0 10px hsl(var(--foreground) / 0.8)",
          }}
        />
      </motion.div>
    </>
  );
};
