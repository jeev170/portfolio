import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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

// Masonry photo card with staggered animation
const MasonryCard = ({ 
  photo, 
  index, 
  onClick,
  size = "normal"
}: { 
  photo: typeof photos[0]; 
  index: number;
  onClick: () => void;
  size?: "normal" | "tall" | "wide";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Different entrance angles for variety
  const entranceAngles = [
    { x: -30, y: 20, rotate: -5 },
    { x: 30, y: 30, rotate: 5 },
    { x: 0, y: 40, rotate: 0 },
    { x: -20, y: 25, rotate: -3 },
    { x: 20, y: 35, rotate: 3 },
  ];
  const entrance = entranceAngles[index % entranceAngles.length];

  const heightClass = size === "tall" ? "row-span-2" : size === "wide" ? "col-span-2" : "";

  return (
    <motion.div
      ref={ref}
      className={`cursor-pointer group ${heightClass}`}
      initial={{ 
        opacity: 0, 
        x: entrance.x, 
        y: entrance.y, 
        rotate: entrance.rotate,
        scale: 0.8 
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        rotate: 0,
        scale: 1 
      } : {}}
      transition={{ 
        duration: 0.7, 
        delay: (index % 6) * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className={`relative w-full ${size === "tall" ? "h-80 md:h-96" : "h-48 md:h-64"} rounded-xl md:rounded-2xl overflow-hidden glass-strong`}>
        {/* Gradient placeholder */}
        <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all duration-300" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-background/80 to-transparent">
          <h3 className="font-syne font-bold text-sm md:text-lg">{photo.title}</h3>
          <p className="text-muted-foreground text-xs md:text-sm truncate">{photo.description}</p>
        </div>

        {/* Hover glow */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300 -z-10`} />
      </div>
    </motion.div>
  );
};

// Cosmic lightbox component
const CosmicLightbox = ({ 
  photo, 
  onClose, 
  onPrev, 
  onNext,
  currentIndex,
  totalCount
}: { 
  photo: typeof photos[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Starry dimmed background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl">
        {/* Subtle stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-foreground/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <motion.button
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 glass p-2 md:p-3 rounded-full hover:bg-primary/20 transition-all z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      <motion.button
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 glass p-2 md:p-3 rounded-full hover:bg-primary/20 transition-all z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      <motion.div
        className="relative max-w-4xl w-full z-10"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute -top-12 md:-top-14 right-0 glass p-2 rounded-full hover:bg-primary/20 transition-all"
          onClick={onClose}
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Photo with cosmic glow border */}
        <div className="relative">
          {/* Glow border effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${photo.gradient} opacity-50 rounded-2xl md:rounded-3xl blur-md`} />
          
          <div className="relative glass-strong rounded-2xl md:rounded-3xl overflow-hidden">
            <div className={`w-full aspect-[4/3] md:aspect-[16/10] bg-gradient-to-br ${photo.gradient}`} />
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-syne text-xl md:text-3xl font-bold mb-1 md:mb-2">
              {photo.title}
            </h3>
            <p className="text-muted-foreground text-sm md:text-lg">
              {photo.description}
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
          {currentIndex + 1} / {totalCount}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const Photography = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [displayedPhotos, setDisplayedPhotos] = useState(photos);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const photosPerPage = 12;

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedPhotos.length < photos.length * 10) {
          // Simulate loading more photos by duplicating with new IDs
          setPage((prev) => prev + 1);
          setDisplayedPhotos((prev) => [
            ...prev,
            ...photos.map((p, i) => ({ ...p, id: prev.length + i + 1 }))
          ]);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [displayedPhotos.length]);

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    const currentIdx = displayedPhotos.findIndex(p => p.id === selectedPhoto.id);
    let newIdx: number;
    
    if (direction === "next") {
      newIdx = (currentIdx + 1) % displayedPhotos.length;
    } else {
      newIdx = currentIdx === 0 ? displayedPhotos.length - 1 : currentIdx - 1;
    }
    
    setSelectedPhoto(displayedPhotos[newIdx]);
  };

  // Determine size pattern for masonry effect
  const getSize = (index: number): "normal" | "tall" | "wide" => {
    const pattern = index % 8;
    if (pattern === 0 || pattern === 5) return "tall";
    if (pattern === 3) return "wide";
    return "normal";
  };

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

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
          {displayedPhotos.slice(0, page * photosPerPage).map((photo, index) => (
            <MasonryCard
              key={`${photo.id}-${index}`}
              photo={photo}
              index={index}
              size={getSize(index)}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>

        {/* Infinite scroll loader */}
        <div ref={loaderRef} className="h-20 flex items-center justify-center mt-8">
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary/50"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Cosmic Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <CosmicLightbox
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            onPrev={() => navigatePhoto("prev")}
            onNext={() => navigatePhoto("next")}
            currentIndex={displayedPhotos.findIndex(p => p.id === selectedPhoto.id)}
            totalCount={displayedPhotos.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
