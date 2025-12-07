import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Generate photos for gallery
const generatePhotos = () => {
  const basePhotos = [
    { title: "Cosmic Dawn", description: "A sunrise through the nebula clouds", gradient: "from-cosmic-purple to-cosmic-pink" },
    { title: "Ethereal Forest", description: "Misty woods at twilight", gradient: "from-cosmic-blue to-cosmic-cyan" },
    { title: "Aurora Dreams", description: "Northern lights dancing above", gradient: "from-cosmic-pink to-cosmic-purple" },
    { title: "Stellar Ocean", description: "Stars reflected on calm waters", gradient: "from-cosmic-cyan to-cosmic-blue" },
    { title: "Mountain Whispers", description: "Peaks touching the cosmos", gradient: "from-cosmic-purple to-cosmic-blue" },
    { title: "Desert Stars", description: "Milky way over sand dunes", gradient: "from-cosmic-pink to-cosmic-cyan" },
    { title: "Frozen Galaxy", description: "Ice caves under starlight", gradient: "from-cosmic-blue to-cosmic-purple" },
    { title: "Cloud Kingdom", description: "Above the clouds at dawn", gradient: "from-cosmic-cyan to-cosmic-pink" },
    { title: "Violet Horizon", description: "Where sky meets infinity", gradient: "from-cosmic-purple to-cosmic-pink" },
    { title: "Nebula Falls", description: "Waterfalls in cosmic light", gradient: "from-cosmic-blue to-cosmic-cyan" },
    { title: "Starlit Meadow", description: "Fireflies and galaxies", gradient: "from-cosmic-pink to-cosmic-blue" },
    { title: "Crystal Caves", description: "Underground light show", gradient: "from-cosmic-cyan to-cosmic-purple" },
  ];

  return basePhotos.map((photo, index) => ({
    ...photo,
    id: index + 1,
  }));
};

const photos = generatePhotos();

export const Photography = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef2 = useRef<HTMLDivElement>(null);

  // Auto-scroll effect for row 1 (left to right)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPosition = 0;

    const autoScroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= container.scrollWidth / 2) {
        scrollPosition = 0;
      }
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Auto-scroll effect for row 2 (right to left)
  useEffect(() => {
    const container = scrollContainerRef2.current;
    if (!container) return;

    let animationId: number;
    let scrollPosition = container.scrollWidth / 2;

    const autoScroll = () => {
      scrollPosition -= 0.3;
      if (scrollPosition <= 0) {
        scrollPosition = container.scrollWidth / 2;
      }
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    const currentIdx = photos.findIndex(p => p.id === selectedPhoto.id);
    let newIdx: number;
    
    if (direction === "next") {
      newIdx = (currentIdx + 1) % photos.length;
    } else {
      newIdx = currentIdx === 0 ? photos.length - 1 : currentIdx - 1;
    }
    
    setSelectedPhoto(photos[newIdx]);
  };

  return (
    <section id="photos" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10">
        {/* Section Title */}
        <motion.div
          className="container mx-auto px-4 md:px-6 text-center mb-12 md:mb-16"
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
            Infinite moments captured across dimensions
          </p>
        </motion.div>

        {/* Row 1 - Scrolls left to right */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-hidden py-4 mb-4 md:mb-6"
        >
          {[...photos, ...photos].map((photo, index) => (
            <motion.div
              key={`row1-${photo.id}-${index}`}
              className="flex-shrink-0 cursor-pointer group"
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative w-48 h-64 md:w-64 md:h-80 rounded-xl md:rounded-2xl overflow-hidden glass-strong">
                {/* Gradient placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-background/80 to-transparent">
                  <h3 className="font-syne font-bold text-sm md:text-lg">{photo.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm truncate">{photo.description}</p>
                </div>

                {/* Hover glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2 - Scrolls right to left (offset photos) */}
        <div
          ref={scrollContainerRef2}
          className="flex gap-4 md:gap-6 overflow-hidden py-4"
        >
          {[...photos.slice(6), ...photos.slice(0, 6), ...photos.slice(6), ...photos.slice(0, 6)].map((photo, index) => (
            <motion.div
              key={`row2-${photo.id}-${index}`}
              className="flex-shrink-0 cursor-pointer group"
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative w-40 h-52 md:w-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden glass-strong">
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all" />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-background/80 to-transparent">
                  <h3 className="font-syne font-bold text-xs md:text-sm">{photo.title}</h3>
                </div>
                <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-2xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 glass p-2 md:p-3 rounded-full hover:bg-primary/20 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); navigatePhoto("prev"); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            <motion.button
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 glass p-2 md:p-3 rounded-full hover:bg-primary/20 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); navigatePhoto("next"); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute -top-12 md:-top-14 right-0 glass p-2 rounded-full hover:bg-primary/20 transition-all"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Photo */}
              <div className="glass-strong rounded-2xl md:rounded-3xl overflow-hidden">
                <div className={`w-full aspect-[4/3] md:aspect-[16/10] bg-gradient-to-br ${selectedPhoto.gradient}`} />
              </div>

              {/* Info */}
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-syne text-xl md:text-3xl font-bold mb-1 md:mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-lg">
                    {selectedPhoto.description}
                  </p>
                </div>
                <motion.button
                  className="glass px-4 md:px-6 py-2 md:py-3 rounded-full inline-flex items-center gap-2 hover:bg-primary/20 transition-all text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Like</span>
                </motion.button>
              </div>

              {/* Photo counter */}
              <p className="text-center text-muted-foreground text-xs md:text-sm mt-4">
                {photos.findIndex(p => p.id === selectedPhoto.id) + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};