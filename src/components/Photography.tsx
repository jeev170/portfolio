import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

const photos = [
  {
    id: 1,
    title: "Cosmic Dawn",
    description: "A sunrise through the nebula clouds",
    gradient: "from-cosmic-purple to-cosmic-pink",
  },
  {
    id: 2,
    title: "Ethereal Forest",
    description: "Misty woods at twilight",
    gradient: "from-cosmic-blue to-cosmic-cyan",
  },
  {
    id: 3,
    title: "Aurora Dreams",
    description: "Northern lights dancing above",
    gradient: "from-cosmic-pink to-cosmic-purple",
  },
  {
    id: 4,
    title: "Stellar Ocean",
    description: "Stars reflected on calm waters",
    gradient: "from-cosmic-cyan to-cosmic-blue",
  },
  {
    id: 5,
    title: "Mountain Whispers",
    description: "Peaks touching the cosmos",
    gradient: "from-cosmic-purple to-cosmic-blue",
  },
];

export const Photography = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  return (
    <section id="photos" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Photo</span>{" "}
            <span className="text-foreground">Booklet</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Floating polaroids from another dimension
          </p>
        </motion.div>

        {/* Polaroid Carousel */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="relative cursor-pointer"
              initial={{ opacity: 0, y: 50, rotate: (index % 2 === 0 ? -5 : 5) }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                rotate: 0,
                y: -20,
                zIndex: 50,
              }}
              onClick={() => setSelectedPhoto(photo)}
              style={{
                rotate: index % 2 === 0 ? -5 : 5,
              }}
            >
              {/* Polaroid Frame */}
              <div className="bg-foreground/95 p-3 pb-12 rounded-sm shadow-2xl animate-float-slow" style={{ animationDelay: `${index * 0.5}s` }}>
                {/* Photo placeholder with gradient */}
                <div
                  className={`w-40 h-48 bg-gradient-to-br ${photo.gradient} rounded-sm`}
                />
                {/* Polaroid label */}
                <p className="absolute bottom-3 left-0 right-0 text-center text-background text-sm font-medium">
                  {photo.title}
                </p>
              </div>

              {/* Hover glow */}
              <div className={`absolute -inset-4 bg-gradient-to-r ${photo.gradient} opacity-0 hover:opacity-30 blur-2xl transition-opacity -z-10`} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-lg w-full mx-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute -top-12 right-0 glass p-2 rounded-full hover:bg-primary/20 transition-all"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Polaroid */}
              <div className="bg-foreground/95 p-6 pb-16 rounded-md shadow-2xl">
                <div
                  className={`w-full aspect-[4/3] bg-gradient-to-br ${selectedPhoto.gradient} rounded-md`}
                />
              </div>

              {/* Info */}
              <div className="mt-6 text-center">
                <h3 className="font-syne text-2xl font-bold mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-muted-foreground">
                  {selectedPhoto.description}
                </p>
                <motion.button
                  className="mt-4 glass px-6 py-2 rounded-full inline-flex items-center gap-2 hover:bg-primary/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-4 h-4" />
                  <span>Like</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
