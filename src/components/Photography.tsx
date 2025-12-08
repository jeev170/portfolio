import { motion } from "framer-motion";

// Generate photos for gallery
const photos = [
  { id: 1, title: "Cosmic Dawn", gradient: "from-cosmic-purple to-cosmic-pink" },
  { id: 2, title: "Ethereal Forest", gradient: "from-cosmic-blue to-cosmic-cyan" },
  { id: 3, title: "Aurora Dreams", gradient: "from-cosmic-pink to-cosmic-purple" },
  { id: 4, title: "Stellar Ocean", gradient: "from-cosmic-cyan to-cosmic-blue" },
  { id: 5, title: "Mountain Whispers", gradient: "from-cosmic-purple to-cosmic-blue" },
  { id: 6, title: "Desert Stars", gradient: "from-cosmic-pink to-cosmic-cyan" },
  { id: 7, title: "Frozen Galaxy", gradient: "from-cosmic-blue to-cosmic-purple" },
  { id: 8, title: "Cloud Kingdom", gradient: "from-cosmic-cyan to-cosmic-pink" },
];

// Duplicate for seamless loop
const row1Photos = [...photos, ...photos];
const row2Photos = [...photos.reverse(), ...photos.reverse()];

export const Photography = () => {
  return (
    <section id="photos" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-3xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Photo</span>{" "}
            <span className="text-foreground">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Moments frozen in time, drifting through space
          </p>
        </motion.div>

        {/* Scrolling Rows */}
        <div className="space-y-6">
          {/* Row 1 - Left to Right */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {row1Photos.map((photo, index) => (
                <div
                  key={`row1-${photo.id}-${index}`}
                  className="flex-shrink-0 w-64 h-48 md:w-80 md:h-56 rounded-xl md:rounded-2xl overflow-hidden glass-strong group cursor-pointer"
                >
                  <div className={`w-full h-full bg-gradient-to-br ${photo.gradient} relative`}>
                    <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                      <h3 className="font-syne font-bold text-sm md:text-base">{photo.title}</h3>
                    </div>
                    <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10`} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Left to Right (same direction, different speed) */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {row2Photos.map((photo, index) => (
                <div
                  key={`row2-${photo.id}-${index}`}
                  className="flex-shrink-0 w-64 h-48 md:w-80 md:h-56 rounded-xl md:rounded-2xl overflow-hidden glass-strong group cursor-pointer"
                >
                  <div className={`w-full h-full bg-gradient-to-br ${photo.gradient} relative`}>
                    <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                      <h3 className="font-syne font-bold text-sm md:text-base">{photo.title}</h3>
                    </div>
                    <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10`} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
