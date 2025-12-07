import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    x: 15,
    y: 20,
    size: "lg",
  },
  {
    id: 2,
    text: "Imagination is the beginning of creation.",
    author: "George Bernard Shaw",
    x: 70,
    y: 15,
    size: "md",
  },
  {
    id: 3,
    text: "We are made of star stuff.",
    author: "Carl Sagan",
    x: 40,
    y: 55,
    size: "lg",
  },
  {
    id: 4,
    text: "Design is intelligence made visible.",
    author: "Alina Wheeler",
    x: 80,
    y: 60,
    size: "sm",
  },
  {
    id: 5,
    text: "Creativity takes courage.",
    author: "Henri Matisse",
    x: 20,
    y: 75,
    size: "md",
  },
  {
    id: 6,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    x: 55,
    y: 85,
    size: "sm",
  },
];

const constellationLines = [
  { from: { x: 15, y: 20 }, to: { x: 40, y: 55 } },
  { from: { x: 40, y: 55 }, to: { x: 70, y: 15 } },
  { from: { x: 70, y: 15 }, to: { x: 80, y: 60 } },
  { from: { x: 40, y: 55 }, to: { x: 20, y: 75 } },
  { from: { x: 20, y: 75 }, to: { x: 55, y: 85 } },
  { from: { x: 55, y: 85 }, to: { x: 80, y: 60 } },
];

export const Quotes = () => {
  return (
    <section id="quotes" className="relative min-h-screen py-32 overflow-hidden">
      {/* Section Title */}
      <motion.div
        className="container mx-auto px-6 text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-syne text-4xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">Stellar</span>{" "}
          <span className="text-foreground">Wisdom</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Constellations of inspiration across the cosmic void
        </p>
      </motion.div>

      {/* Constellation Map */}
      <div className="relative max-w-6xl mx-auto h-[600px] px-6">
        {/* SVG Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {constellationLines.map((line, index) => (
            <motion.line
              key={index}
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke="hsl(var(--primary) / 0.2)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            />
          ))}
        </svg>

        {/* Quote Stars */}
        {quotes.map((quote, index) => (
          <motion.div
            key={quote.id}
            className="absolute group cursor-pointer"
            style={{
              left: `${quote.x}%`,
              top: `${quote.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Star Point */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.5 }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                opacity: {
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="w-3 h-3 rounded-full bg-primary shadow-lg" style={{ boxShadow: "0 0 20px hsl(var(--primary))" }} />
              
              {/* Glow effect */}
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary animate-ping opacity-30" />
            </motion.div>

            {/* Quote Tooltip */}
            <motion.div
              className={`absolute z-50 glass-strong rounded-2xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                quote.x > 50 ? "right-6" : "left-6"
              } ${quote.y > 50 ? "bottom-6" : "top-6"}`}
              style={{
                width: quote.size === "lg" ? "280px" : quote.size === "md" ? "220px" : "180px",
              }}
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
            >
              <Quote className="w-4 h-4 text-primary mb-2" />
              <p className={`text-foreground leading-relaxed mb-2 ${
                quote.size === "lg" ? "text-sm" : quote.size === "md" ? "text-xs" : "text-xs"
              }`}>
                "{quote.text}"
              </p>
              <p className="text-xs text-muted-foreground">— {quote.author}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
