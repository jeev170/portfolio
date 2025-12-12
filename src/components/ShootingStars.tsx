import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  duration: number;
  size: number;
}

export const ShootingStars = () => {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const createStar = () => {
      const newStar: ShootingStar = {
        id: Date.now() + Math.random(),
        startX: Math.random() * 100,
        startY: Math.random() * 30, // Start from top 30% of viewport
        angle: 15 + Math.random() * 30, // Angle between 15-45 degrees
        duration: 1 + Math.random() * 1.5, // 1-2.5 seconds
        size: 2 + Math.random() * 2, // 2-4px
      };

      setStars((prev) => [...prev, newStar]);

      // Remove star after animation
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, newStar.duration * 1000 + 500);
    };

    // Create initial star
    createStar();

    // Create new stars periodically (every 3-6 seconds)
    const interval = setInterval(() => {
      createStar();
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: star.size,
              height: star.size,
            }}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0,
              scale: 0.5 
            }}
            animate={{ 
              x: `calc(${Math.cos(star.angle * Math.PI / 180) * 150}vw)`,
              y: `calc(${Math.sin(star.angle * Math.PI / 180) * 150}vh)`,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.3]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: star.duration,
              ease: "easeOut",
            }}
          >
            {/* Star head */}
            <div 
              className="absolute rounded-full bg-foreground"
              style={{
                width: star.size,
                height: star.size,
                boxShadow: `
                  0 0 ${star.size * 2}px hsl(var(--primary)),
                  0 0 ${star.size * 4}px hsl(var(--primary) / 0.6),
                  0 0 ${star.size * 6}px hsl(var(--primary) / 0.3)
                `,
              }}
            />
            {/* Tail */}
            <div 
              className="absolute"
              style={{
                width: star.size * 40,
                height: star.size * 0.5,
                background: `linear-gradient(to left, 
                  transparent, 
                  hsl(var(--primary) / 0.6) 20%, 
                  hsl(var(--foreground) / 0.8) 80%,
                  hsl(var(--foreground))
                )`,
                transformOrigin: 'right center',
                transform: `rotate(${star.angle}deg) translateX(-100%)`,
                borderRadius: '50%',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
