import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    id: 2,
    text: "Imagination is the beginning of creation.",
    author: "George Bernard Shaw",
  },
  {
    id: 3,
    text: "We are made of star stuff.",
    author: "Carl Sagan",
  },
  {
    id: 4,
    text: "Design is intelligence made visible.",
    author: "Alina Wheeler",
  },
  {
    id: 5,
    text: "Creativity takes courage.",
    author: "Henri Matisse",
  },
  {
    id: 6,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
];

// Cancer constellation pattern - adjusted for viewport fit
const cancerStars = [
  { x: 30, y: 20, size: 5, quoteIndex: 0 },
  { x: 45, y: 15, size: 6, quoteIndex: 1 },
  { x: 60, y: 18, size: 5, quoteIndex: 2 },
  { x: 70, y: 28, size: 4, quoteIndex: null },
  { x: 50, y: 45, size: 5, quoteIndex: 3 },
  { x: 35, y: 40, size: 4, quoteIndex: 4 },
  { x: 48, y: 30, size: 7, quoteIndex: 5 },
];

const cancerLines = [
  { from: { x: 30, y: 20 }, to: { x: 45, y: 15 } },
  { from: { x: 45, y: 15 }, to: { x: 48, y: 30 } },
  { from: { x: 48, y: 30 }, to: { x: 60, y: 18 } },
  { from: { x: 60, y: 18 }, to: { x: 70, y: 28 } },
  { from: { x: 48, y: 30 }, to: { x: 50, y: 45 } },
  { from: { x: 50, y: 45 }, to: { x: 35, y: 40 } },
  { from: { x: 35, y: 40 }, to: { x: 30, y: 20 } },
];

export const Quotes = () => {
  return (
    <section id="quotes" className="relative min-h-screen pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden flex flex-col justify-center">
      {/* Section Title */}
      <motion.div
        className="container mx-auto px-4 md:px-6 text-center mb-4 md:mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-syne text-3xl md:text-5xl font-bold mb-2">
          <span className="text-gradient">Stellar</span>{" "}
          <span className="text-foreground">Wisdom</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
          Words that guide me through the cosmos — featuring Cancer ♋
        </p>
      </motion.div>

      {/* Constellation Map - Desktop */}
      <div className="hidden md:block relative flex-1 max-w-5xl mx-auto w-full px-4 md:px-6">
        {/* SVG Cancer Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {cancerLines.map((line, index) => (
            <motion.line
              key={index}
              x1={`${line.from.x}%`}
              y1={`${line.from.y}%`}
              x2={`${line.to.x}%`}
              y2={`${line.to.y}%`}
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            />
          ))}
        </svg>

        {/* Cancer Constellation Stars with Quotes */}
        {cancerStars.map((star, index) => (
          <motion.div
            key={`cancer-star-${index}`}
            className="absolute group"
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
              className="relative cursor-pointer"
              whileHover={{ scale: 1.5 }}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                opacity: {
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <div 
                className="rounded-full bg-primary"
                style={{ 
                  width: `${star.size * 3}px`, 
                  height: `${star.size * 3}px`,
                  boxShadow: `0 0 ${star.size * 6}px hsl(var(--primary)), 0 0 ${star.size * 12}px hsl(var(--primary) / 0.5)` 
                }} 
              />
            </motion.div>

            {/* Quote Tooltip - shows on hover */}
            {star.quoteIndex !== null && quotes[star.quoteIndex] && (
              <motion.div
                className={`absolute z-50 glass-strong rounded-xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none min-w-[200px] max-w-[280px] ${
                  star.x > 50 ? "right-8" : "left-8"
                } ${star.y > 40 ? "bottom-4" : "top-4"}`}
                initial={{ scale: 0.8 }}
              >
                <Quote className="w-4 h-4 text-primary mb-2" />
                <p className="text-foreground text-sm leading-relaxed mb-2">
                  "{quotes[star.quoteIndex].text}"
                </p>
                <p className="text-xs text-muted-foreground">— {quotes[star.quoteIndex].author}</p>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Cancer label */}
        <motion.div
          className="absolute glass px-4 py-2 rounded-full"
          style={{ left: "50%", top: "55%", transform: "translate(-50%, 0)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-syne font-bold text-sm md:text-base">Cancer ♋</span>
        </motion.div>

        {/* Instruction text */}
        <motion.p
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground text-xs md:text-sm text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2 }}
          viewport={{ once: true }}
        >
          Hover over the stars to reveal wisdom ✨
        </motion.p>
      </div>

      {/* Mobile Quotes List */}
      <div className="md:hidden container mx-auto px-4 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {quotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              className="glass-strong rounded-xl p-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Quote className="w-3 h-3 text-primary mb-1" />
              <p className="text-foreground text-xs leading-relaxed mb-1 line-clamp-3">"{quote.text}"</p>
              <p className="text-[10px] text-muted-foreground">— {quote.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
