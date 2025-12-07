import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Generate more photos for infinite gallery effect
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxX = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Auto-scroll effect
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
    <section id="photos" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10">
        {/* Section Title */}
        <motion.div
          className="container mx-auto px-6 text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-syne text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Photo</span>{" "}
            <span className="text-foreground">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Infinite moments captured across dimensions
          </p>
        </motion.div>

        {/* Infinite Horizontal Gallery */}
        <div className="relative">
          {/* Row 1 - Scrolls right */}
          <motion.div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-hidden py-4 mb-6"
            style={{ x: parallaxX }}
          >
            {/* Duplicate photos for infinite scroll effect */}
            {[...photos, ...photos].map((photo, index) => (
              <motion.div
                key={`${photo.id}-${index}`}
                className="flex-shrink-0 cursor-pointer group"
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden glass-strong">
                  {/* Gradient placeholder */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                    <h3 className="font-syne font-bold text-lg">{photo.title}</h3>
                    <p className="text-muted-foreground text-sm truncate">{photo.description}</p>
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity -z-10`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2 - Different photos, offset */}
          <motion.div
            className="flex gap-6 overflow-hidden py-4"
            style={{ x: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          >
            {[...photos.slice(6), ...photos.slice(0, 6), ...photos.slice(6), ...photos.slice(0, 6)].map((photo, index) => (
              <motion.div
                key={`row2-${photo.id}-${index}`}
                className="flex-shrink-0 cursor-pointer group"
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative w-48 h-64 rounded-2xl overflow-hidden glass-strong">
                  <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
                  <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                    <h3 className="font-syne font-bold text-sm">{photo.title}</h3>
                  </div>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity -z-10`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Masonry-style Grid */}
        <div className="container mx-auto px-6 mt-16">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {photos.slice(0, 8).map((photo, index) => (
              <motion.div
                key={photo.id}
                className={`cursor-pointer group ${
                  index === 0 || index === 5 ? "row-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className={`relative w-full rounded-2xl overflow-hidden glass-strong ${
                  index === 0 || index === 5 ? "h-[420px]" : "h-[200px]"
                }`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
                  <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-all" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                    <h3 className="font-syne font-bold">{photo.title}</h3>
                    <p className="text-muted-foreground text-sm truncate">{photo.description}</p>
                  </div>
                  <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity -z-10`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Expanded Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 glass p-3 rounded-full hover:bg-primary/20 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); navigatePhoto("prev"); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 glass p-3 rounded-full hover:bg-primary/20 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); navigatePhoto("next"); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            <motion.div
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute -top-14 right-0 glass p-2 rounded-full hover:bg-primary/20 transition-all"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Photo */}
              <div className="glass-strong rounded-3xl overflow-hidden">
                <div className={`w-full aspect-[16/10] bg-gradient-to-br ${selectedPhoto.gradient}`} />
              </div>

              {/* Info */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="font-syne text-3xl font-bold mb-2">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {selectedPhoto.description}
                  </p>
                </div>
                <motion.button
                  className="glass px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-primary/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="w-5 h-5" />
                  <span>Like</span>
                </motion.button>
              </div>

              {/* Photo counter */}
              <p className="text-center text-muted-foreground text-sm mt-4">
                {photos.findIndex(p => p.id === selectedPhoto.id) + 1} / {photos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
