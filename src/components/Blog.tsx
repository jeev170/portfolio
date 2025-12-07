import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, MapPin, Briefcase, Heart, Sparkles } from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "conference",
    title: "Speaking at DevCon 2024",
    excerpt: "Reflections on presenting 'The Future of Spatial Interfaces' to 500+ developers and the unexpected connections made.",
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
    date: "Aug 10, 2024",
    readTime: "7 min",
    location: "Tokyo",
    gradient: "from-cosmic-cyan/30 to-cosmic-blue/30",
    icon: MapPin,
  },
  {
    id: 5,
    type: "story",
    title: "The Project That Changed Everything",
    excerpt: "How a failed side project taught me more about product design than any successful launch ever did.",
    date: "Jul 05, 2024",
    readTime: "10 min",
    gradient: "from-cosmic-purple/30 to-cosmic-blue/30",
    icon: Sparkles,
  },
  {
    id: 6,
    type: "learning",
    title: "Finding My Creative Voice",
    excerpt: "The journey from copying others' styles to developing a unique aesthetic that feels authentically mine.",
    date: "Jun 12, 2024",
    readTime: "9 min",
    gradient: "from-cosmic-pink/30 to-cosmic-cyan/30",
    icon: Heart,
  },
];

export const Blog = () => {
  return (
    <section id="blog" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
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
            <span className="text-foreground">My</span>{" "}
            <span className="text-gradient">Experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Stories, reflections, and lessons from my journey through the creative cosmos
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.article
          className="mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="glass-strong rounded-3xl p-8 md:p-12 bg-gradient-to-br from-cosmic-purple/20 via-cosmic-pink/10 to-cosmic-blue/20 cursor-pointer group overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Featured badge */}
            <motion.span 
              className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="w-2 h-2 rounded-full bg-cosmic-pink animate-pulse" />
              Featured Story
            </motion.span>

            <h3 className="font-syne text-2xl md:text-4xl font-bold mb-4 group-hover:text-gradient transition-all">
              {experiences[0].title}
            </h3>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-2xl">
              {experiences[0].excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {experiences[0].date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {experiences[0].readTime}
              </span>
              {experiences[0].location && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {experiences[0].location}
                </span>
              )}
            </div>

            <motion.span
              className="inline-flex items-center gap-2 text-primary font-medium"
              whileHover={{ x: 5 }}
            >
              Read Full Story
              <ArrowRight className="w-5 h-5" />
            </motion.span>

            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-cosmic-purple/20 rounded-full blur-3xl group-hover:bg-cosmic-purple/30 transition-all" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cosmic-pink/20 rounded-full blur-3xl group-hover:bg-cosmic-pink/30 transition-all" />
          </motion.div>
        </motion.article>

        {/* Experience Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                className={`glass-strong rounded-2xl p-6 h-full bg-gradient-to-br ${post.gradient} cursor-pointer relative overflow-hidden`}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <post.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
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
                <h3 className="font-syne text-lg font-bold mb-3 group-hover:text-gradient transition-all line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Location if exists */}
                {post.location && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mb-4">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </span>
                )}

                {/* Read More */}
                <motion.span
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium"
                  whileHover={{ x: 5 }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </motion.span>

                {/* Glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
