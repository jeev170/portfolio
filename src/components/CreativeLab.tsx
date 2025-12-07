import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Paintbrush, RefreshCw, Wand2, Play, Pause } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  life: number;
}

export const CreativeLab = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mode, setMode] = useState<"particles" | "draw" | "generative">("particles");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);

  // Particle system
  const createParticle = useCallback((x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    return {
      id: particleIdRef.current++,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 6 + 2,
      hue: Math.random() * 60 + 260, // Purple-pink range
      life: 1,
    };
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (mode === "particles") {
      const newParticles = Array.from({ length: 20 }, () => createParticle(x, y));
      setParticles(prev => [...prev.slice(-100), ...newParticles]);
    }
  }, [mode, createParticle]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    if (mode === "particles" && isPlaying) {
      if (Math.random() > 0.7) {
        const newParticle = createParticle(e.clientX - rect.left, e.clientY - rect.top);
        setParticles(prev => [...prev.slice(-80), newParticle]);
      }
    }
  }, [mode, isPlaying, createParticle]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!isPlaying && mode !== "generative") {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "rgba(10, 10, 26, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (mode === "particles") {
        // Draw particles
        setParticles(prev => 
          prev
            .map(p => ({
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              vy: p.vy + 0.05, // gravity
              life: p.life - 0.01,
            }))
            .filter(p => p.life > 0 && p.y < canvas.height)
        );

        particles.forEach(p => {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${p.life})`);
          gradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw cursor glow
        const cursorGradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, 50
        );
        cursorGradient.addColorStop(0, "hsla(280, 80%, 60%, 0.3)");
        cursorGradient.addColorStop(1, "hsla(280, 80%, 60%, 0)");
        ctx.fillStyle = cursorGradient;
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 50, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mode === "generative") {
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < 5; i++) {
          const x = canvas.width / 2 + Math.cos(time + i) * (100 + i * 30);
          const y = canvas.height / 2 + Math.sin(time * 1.5 + i) * (80 + i * 20);
          
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30 + i * 10);
          gradient.addColorStop(0, `hsla(${260 + i * 15}, 80%, 60%, 0.5)`);
          gradient.addColorStop(1, `hsla(${260 + i * 15}, 80%, 60%, 0)`);
          
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(x, y, 30 + i * 10, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw orbiting circles
        for (let i = 0; i < 8; i++) {
          const angle = (time * 0.5 + (i / 8) * Math.PI * 2);
          const radius = 150 + Math.sin(time + i) * 30;
          const x = canvas.width / 2 + Math.cos(angle) * radius;
          const y = canvas.height / 2 + Math.sin(angle) * radius * 0.6;
          
          ctx.beginPath();
          ctx.fillStyle = `hsla(${330 - i * 10}, 80%, 60%, 0.6)`;
          ctx.arc(x, y, 4 + Math.sin(time * 2 + i) * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, mousePos, isPlaying, mode]);

  const clearCanvas = () => {
    setParticles([]);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "rgba(10, 10, 26, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <section id="lab" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Creative</span>{" "}
            <span className="text-foreground">Lab</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            An interactive playground where art meets code
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Mode Buttons */}
          <div className="flex gap-2 glass-strong rounded-full p-1">
            <button
              onClick={() => setMode("particles")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                mode === "particles" ? "bg-primary/30 text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Particles
            </button>
            <button
              onClick={() => setMode("generative")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                mode === "generative" ? "bg-primary/30 text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Wand2 className="w-4 h-4" />
              Generative
            </button>
          </div>

          {/* Action Buttons */}
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="glass px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? "Pause" : "Play"}
          </motion.button>

          <motion.button
            onClick={clearCanvas}
            className="glass px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" />
            Clear
          </motion.button>
        </motion.div>

        {/* Canvas Container */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass-strong rounded-3xl p-2 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-[400px] md:h-[500px] rounded-2xl cursor-crosshair"
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
              style={{ background: "rgba(10, 10, 26, 1)" }}
            />
          </div>

          {/* Instructions */}
          <motion.p
            className="text-center text-muted-foreground text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {mode === "particles" && "Click or move your cursor to create cosmic particles ✨"}
            {mode === "generative" && "Watch the generative art unfold in real-time 🌌"}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
