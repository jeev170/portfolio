import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    x: 30,
    y: 25,
    size: "lg",
  },
  {
    id: 2,
    text: "Imagination is the beginning of creation.",
    author: "George Bernard Shaw",
    x: 50,
    y: 15,
    size: "md",
  },
  {
    id: 3,
    text: "We are made of star stuff.",
    author: "Carl Sagan",
    x: 70,
    y: 30,
    size: "lg",
  },
  {
    id: 4,
    text: "Design is intelligence made visible.",
    author: "Alina Wheeler",
    x: 25,
    y: 55,
    size: "sm",
  },
  {
    id: 5,
    text: "Creativity takes courage.",
    author: "Henri Matisse",
    x: 45,
    y: 70,
    size: "md",
  },
  {
    id: 6,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    x: 75,
    y: 60,
    size: "sm",
  },
];

// Cancer constellation pattern - the crab shape
const cancerStars = [
  { x: 35, y: 30, size: 4 },  // Acubens (α)
  { x: 45, y: 25, size: 5 },  // Altarf (β) - brightest
  { x: 55, y: 28, size: 4 },  // Asellus Australis (δ)
  { x: 60, y: 35, size: 3 },  // Asellus Borealis (γ)
  { x: 50, y: 45, size: 4 },  // Tegmine (ζ)
  { x: 40, y: 42, size: 3 },  // ι Cancri
  { x: 48, y: 35, size: 6 },  // Praesepe (Beehive cluster center)
];

const cancerLines = [
  { from: { x: 35, y: 30 }, to: { x: 45, y: 25 } },
  { from: { x: 45, y: 25 }, to: { x: 48, y: 35 } },
  { from: { x: 48, y: 35 }, to: { x: 55, y: 28 } },
  { from: { x: 55, y: 28 }, to: { x: 60, y: 35 } },
  { from: { x: 48, y: 35 }, to: { x: 50, y: 45 } },
  { from: { x: 50, y: 45 }, to: { x: 40, y: 42 } },
  { from: { x: 40, y: 42 }, to: { x: 35, y: 30 } },
];

export const Quotes = () => {
  return (
    <section id="quotes" className="relative min-h-screen py-24 md:py-32 overflow-hidden">
      {/* Section Title */}
      <motion.div
        className="container mx-auto px-4 md:px-6 text-center mb-8 md:mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-syne text-3xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">Stellar</span>{" "}
          <span className="text-foreground">Wisdom</span>
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
          Constellations of inspiration - featuring Cancer ♋
        </p>
      </motion.div>

      {/* Constellation Map */}
      <div className="relative max-w-6xl mx-auto h-[500px] md:h-[600px] px-4 md:px-6">
        {/* SVG Cancer Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {cancerLines.map((line, index) => (
            <motion.line
              key={index}
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            />
          ))}
        </svg>

        {/* Cancer Constellation Stars */}
        {cancerStars.map((star, index) => (
          <motion.div
            key={`cancer-star-${index}`}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div 
                className="rounded-full bg-primary"
                style={{ 
                  width: `${star.size * 2}px`, 
                  height: `${star.size * 2}px`,
                  boxShadow: `0 0 ${star.size * 4}px hsl(var(--primary)), 0 0 ${star.size * 8}px hsl(var(--primary) / 0.5)` 
                }} 
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Cancer label */}
        <motion.div
          className="absolute glass px-3 md:px-4 py-1.5 md:py-2 rounded-full"
          style={{ left: "48%", top: "52%", transform: "translate(-50%, 0)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-syne font-bold text-xs md:text-sm">Cancer ♋</span>
        </motion.div>

        {/* Quote Stars */}
        {quotes.map((quote, index) => (
          <motion.div
            key={quote.id}
            className="absolute group cursor-pointer hidden md:block"
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
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                opacity: {
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="w-2 h-2 rounded-full bg-accent" style={{ boxShadow: "0 0 10px hsl(var(--accent))" }} />
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
                quote.size === "lg" ? "text-sm" : "text-xs"
              }`}>
                "{quote.text}"
              </p>
              <p className="text-xs text-muted-foreground">— {quote.author}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Quotes List */}
      <div className="md:hidden container mx-auto px-4 mt-8">
        <div className="space-y-4">
          {quotes.slice(0, 4).map((quote, index) => (
            <motion.div
              key={quote.id}
              className="glass-strong rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Quote className="w-4 h-4 text-primary mb-2" />
              <p className="text-foreground text-sm leading-relaxed mb-2">"{quote.text}"</p>
              <p className="text-xs text-muted-foreground">— {quote.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};