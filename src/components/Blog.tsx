import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, MapPin, Briefcase, Heart, Sparkles, X } from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "conference",
    title: "Speaking at DevCon 2024",
    excerpt: "Reflections on presenting 'The Future of Spatial Interfaces' to 500+ developers and the unexpected connections made.",
    fullContent: "What started as a terrifying opportunity turned into one of the most rewarding experiences of my career. Standing on that stage, looking at 500+ developers, I realized something important: we're all just figuring things out together. The Q&A session afterwards led to three coffee chats, two collaboration ideas, and one amazing friendship that continues today.",
    date: "Nov 28, 2024",
    readTime: "5 min",
    location: "San Francisco",
    gradient: "from-cosmic-purple/30 to-cosmic-pink/30",
    icon: Sparkles,
  },
  {
    id: 2,
    type: "career",
    title: "Joining Stellar Labs",
    excerpt: "A new chapter begins. Why I chose to pursue my passion for immersive experiences at a cutting-edge startup.",
    fullContent: "Sometimes the scariest decisions lead to the most growth. Leaving a comfortable position for a startup felt risky, but following my curiosity about immersive experiences was worth it. Three months in, I've learned more than I did in two years at my previous role. The lesson? Bet on yourself, especially when it scares you.",
    date: "Oct 15, 2024",
    readTime: "8 min",
    location: "Remote",
    gradient: "from-cosmic-blue/30 to-cosmic-cyan/30",
    icon: Briefcase,
  },
  {
    id: 3,
    type: "learning",
    title: "Lessons from Burnout",
    excerpt: "The hard truths I learned about sustainable creativity and why taking breaks made me a better creator.",
    fullContent: "I used to wear 14-hour workdays like a badge of honor. Then my body said 'enough.' Burnout taught me that rest isn't lazy—it's strategic. Now I protect my weekends, take real vacations, and surprisingly, I'm more productive and creative than ever. Your brain needs downtime to connect dots and generate ideas.",
    date: "Sep 20, 2024",
    readTime: "6 min",
    gradient: "from-cosmic-pink/30 to-cosmic-purple/30",
    icon: Heart,
  },
  {
    id: 4,
    type: "conference",
    title: "AI Design Summit Tokyo",
    excerpt: "Exploring how Japanese design philosophy is shaping the future of human-AI interaction and creative tools.",
    fullContent: "Tokyo taught me that the best interfaces are invisible. Japanese designers approach AI differently—not as a replacement for human creativity, but as a quiet partner that enhances it. The concept of 'ma' (negative space) applies beautifully to AI: sometimes what the AI doesn't do matters as much as what it does.",
    date: "Aug 10, 2024",
    readTime: "7 min",
    location: "Tokyo",
    gradient: "from-cosmic-cyan/30 to-cosmic-blue/30",
    icon: MapPin,
  },
];

export const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<typeof experiences[0] | null>(null);

  return (
    <section id="blog" className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
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
          <h2 className="font-syne text-2xl md:text-5xl font-bold mb-3">
            <span className="text-foreground">My</span>{" "}
            <span className="text-gradient">Experiences</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Honest stories, messy learnings, and the occasional "aha!" moment
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.article
          className="mb-6 md:mb-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glass-strong rounded-2xl md:rounded-3xl p-5 md:p-12 bg-gradient-to-br from-cosmic-purple/20 via-cosmic-pink/10 to-cosmic-blue/20 cursor-pointer group overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setSelectedPost(experiences[0])}
          >
            {/* Featured badge */}
            <motion.span 
              className="inline-flex items-center gap-2 glass px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium mb-4 md:mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="w-2 h-2 rounded-full bg-cosmic-pink animate-pulse" />
              Featured Story
            </motion.span>

            <h3 className="font-syne text-xl md:text-4xl font-bold mb-3 md:mb-4 group-hover:text-gradient transition-all">
              {experiences[0].title}
            </h3>
            
            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed mb-4 md:mb-6 max-w-2xl">
              {experiences[0].excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-muted-foreground mb-6 md:mb-8">
              <span className="flex items-center gap-1 md:gap-2">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                {experiences[0].date}
              </span>
              <span className="flex items-center gap-1 md:gap-2">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                {experiences[0].readTime}
              </span>
              {experiences[0].location && (
                <span className="flex items-center gap-1 md:gap-2">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  {experiences[0].location}
                </span>
              )}
            </div>

            <motion.span
              className="inline-flex items-center gap-2 text-primary font-medium text-sm md:text-base"
              whileHover={{ x: 5 }}
            >
              Read Full Story
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.span>

            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -right-20 w-40 md:w-60 h-40 md:h-60 bg-cosmic-purple/20 rounded-full blur-3xl group-hover:bg-cosmic-purple/30 transition-all" />
            <div className="absolute -bottom-20 -left-20 w-32 md:w-40 h-32 md:h-40 bg-cosmic-pink/20 rounded-full blur-3xl group-hover:bg-cosmic-pink/30 transition-all" />
          </motion.div>
        </motion.article>

        {/* Experience Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {experiences.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              className="group"
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={`glass-strong rounded-xl md:rounded-2xl p-4 md:p-6 h-full bg-gradient-to-br ${post.gradient} cursor-pointer relative overflow-hidden`}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedPost(post)}
              >
                {/* Icon */}
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl glass flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                  <post.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-muted-foreground mb-3 md:mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-syne text-base md:text-lg font-bold mb-2 md:mb-3 group-hover:text-gradient transition-all line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Location if exists */}
                {post.location && (
                  <span className="inline-flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground mb-3 md:mb-4">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </span>
                )}

                {/* Read More */}
                <motion.span
                  className="inline-flex items-center gap-2 text-primary text-xs md:text-sm font-medium"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </motion.span>

                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl md:rounded-2xl pointer-events-none" />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-2xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full glass-strong rounded-2xl md:rounded-3xl p-6 md:p-10 max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 glass p-2 rounded-full hover:bg-primary/20 transition-all"
                onClick={() => setSelectedPost(null)}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-6">
                <selectedPost.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {selectedPost.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime}
                </span>
                {selectedPost.location && (
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedPost.location}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-syne text-2xl md:text-4xl font-bold mb-6 text-gradient">
                {selectedPost.title}
              </h2>

              {/* Content */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                {selectedPost.fullContent}
              </p>

              {/* Reflection prompt */}
              <div className="glass rounded-xl p-4 border-l-4 border-primary">
                <p className="text-sm text-foreground italic">
                  "Every experience teaches us something. What's yours?"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};