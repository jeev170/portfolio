import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Trash2, Download, Star } from "lucide-react";

interface ConstellationStar {
  id: number;
  x: number;
  y: number;
}

interface SavedConstellation {
  id: number;
  name: string;
  stars: ConstellationStar[];
}

export const CreativeLab = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<ConstellationStar[]>([]);
  const [savedConstellations, setSavedConstellations] = useState<SavedConstellation[]>([]);
  const [constellationName, setConstellationName] = useState("");
  const starIdRef = useRef(0);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newStar: ConstellationStar = {
      id: starIdRef.current++,
      x,
      y,
    };
    setStars(prev => [...prev, newStar]);
  }, []);

  const clearCanvas = () => {
    setStars([]);
    setConstellationName("");
  };

  const saveConstellation = () => {
    if (stars.length < 2 || !constellationName.trim()) return;
    
    const newConstellation: SavedConstellation = {
      id: Date.now(),
      name: constellationName.trim(),
      stars: [...stars],
    };
    
    setSavedConstellations(prev => [...prev, newConstellation]);
    clearCanvas();
  };

  const loadConstellation = (constellation: SavedConstellation) => {
    setStars(constellation.stars);
    setConstellationName(constellation.name);
  };

  const deleteConstellation = (id: number) => {
    setSavedConstellations(prev => prev.filter(c => c.id !== id));
  };

  // Download constellation as PNG
  const downloadConstellation = () => {
    if (stars.length < 2 || !constellationName.trim()) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 500;

    // Background
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars and lines
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
    ctx.lineWidth = 2;

    // Draw lines
    if (stars.length >= 2) {
      ctx.beginPath();
      stars.forEach((star, index) => {
        const px = (star.x / 100) * canvas.width;
        const py = (star.y / 100) * canvas.height;
        if (index === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      });
      ctx.stroke();
    }

    // Draw stars
    stars.forEach((star) => {
      const px = (star.x / 100) * canvas.width;
      const py = (star.y / 100) * canvas.height;
      
      // Glow
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, 15);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 1)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(px, py, 15, 0, Math.PI * 2);
      ctx.fill();

      // Star center
      ctx.fillStyle = '#8b5cf6';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw name
    ctx.fillStyle = '#8b5cf6';
    ctx.font = 'bold 24px Syne, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(constellationName, canvas.width / 2, canvas.height - 30);

    // Download
    const link = document.createElement('a');
    link.download = `${constellationName.replace(/\s+/g, '-').toLowerCase()}-constellation.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Generate SVG lines connecting stars in order
  const generateLines = () => {
    if (stars.length < 2) return null;
    
    return stars.slice(0, -1).map((star, index) => {
      const nextStar = stars[index + 1];
      return (
        <motion.line
          key={`line-${star.id}-${nextStar.id}`}
          x1={`${star.x}%`}
          y1={`${star.y}%`}
          x2={`${nextStar.x}%`}
          y2={`${nextStar.y}%`}
          stroke="hsl(var(--primary) / 0.4)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      );
    });
  };

  return (
    <section id="lab" className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-3xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Creative</span>{" "}
            <span className="text-foreground">Lab</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Create your own constellation — name it, save it, make it yours
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            placeholder="Name your constellation..."
            value={constellationName}
            onChange={(e) => setConstellationName(e.target.value)}
            className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground placeholder:text-muted-foreground bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/30 w-full sm:w-64"
          />
          
          <motion.button
            onClick={saveConstellation}
            disabled={stars.length < 2 || !constellationName.trim()}
            className="glass px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-4 h-4" />
            Save
          </motion.button>

          <motion.button
            onClick={downloadConstellation}
            disabled={stars.length < 2 || !constellationName.trim()}
            className="glass px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Download
          </motion.button>

          <motion.button
            onClick={clearCanvas}
            className="glass px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="w-4 h-4" />
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
          <div className="glass-strong rounded-2xl md:rounded-3xl p-2 overflow-hidden">
            <div
              ref={canvasRef}
              className="relative w-full h-[300px] md:h-[500px] rounded-xl md:rounded-2xl cursor-crosshair overflow-hidden"
              style={{ background: "rgba(10, 10, 26, 1)" }}
              onClick={handleCanvasClick}
            >
              {/* Stars background effect */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-foreground/50 rounded-full animate-twinkle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>

              {/* SVG for constellation lines and stars */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Lines */}
                {generateLines()}
                
                {/* Stars as SVG circles for perfect alignment */}
                {stars.map((star, index) => (
                  <g key={star.id}>
                    {/* Outer glow */}
                    <motion.circle
                      cx={`${star.x}%`}
                      cy={`${star.y}%`}
                      r="16"
                      fill="hsl(var(--primary) / 0.3)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    {/* Main star */}
                    <motion.circle
                      cx={`${star.x}%`}
                      cy={`${star.y}%`}
                      r="8"
                      fill="hsl(var(--primary))"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary)))" }}
                    />
                    {/* Star number */}
                    <motion.text
                      x={`${star.x}%`}
                      y={`${star.y - 4}%`}
                      textAnchor="middle"
                      fill="hsl(var(--muted-foreground))"
                      fontSize="12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {index + 1}
                    </motion.text>
                  </g>
                ))}
              </svg>

              {/* Constellation name display */}
              {constellationName && stars.length >= 2 && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="text-primary font-syne font-bold text-sm md:text-base">{constellationName}</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <motion.p
            className="text-center text-muted-foreground text-xs md:text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Click anywhere to place stars. Connect at least 2 stars and name your constellation to save or download it.
          </motion.p>
        </motion.div>

        {/* Saved Constellations */}
        {savedConstellations.length > 0 && (
          <motion.div
            className="max-w-4xl mx-auto mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-syne text-lg md:text-xl font-bold mb-4 text-center">Your Constellations</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {savedConstellations.map((constellation) => (
                <motion.div
                  key={constellation.id}
                  className="glass px-4 py-2 rounded-full flex items-center gap-3 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <Star className="w-4 h-4 text-primary" />
                  <button
                    onClick={() => loadConstellation(constellation)}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {constellation.name}
                  </button>
                  <span className="text-muted-foreground text-xs">({constellation.stars.length} stars)</span>
                  <button
                    onClick={() => deleteConstellation(constellation.id)}
                    className="text-muted-foreground hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};