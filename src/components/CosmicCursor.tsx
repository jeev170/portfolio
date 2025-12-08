import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CosmicCursor = () => {
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const trailX = useSpring(0, { damping: 40, stiffness: 200 });
  const trailY = useSpring(0, { damping: 40, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
      {/* Soft trailing glow */}
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
          className="w-10 h-10 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, hsl(var(--cosmic-purple) / 0.6) 0%, hsl(var(--cosmic-pink) / 0.3) 50%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* Glowing outer ring */}
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
          className="w-7 h-7 rounded-full"
          style={{
            background: "transparent",
            border: "2px solid hsl(var(--cosmic-purple) / 0.8)",
            boxShadow: "0 0 15px hsl(var(--cosmic-purple) / 0.5), 0 0 30px hsl(var(--cosmic-pink) / 0.3), inset 0 0 10px hsl(var(--cosmic-purple) / 0.2)",
          }}
        />
      </motion.div>

      {/* Black center core */}
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
          className="w-2.5 h-2.5 rounded-full bg-background"
          style={{
            boxShadow: "0 0 4px hsl(var(--background))",
          }}
        />
      </motion.div>
    </>
  );
};