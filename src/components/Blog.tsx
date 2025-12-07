import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "The Art of Dreaming in Code",
    excerpt: "Exploring the intersection of creativity and technology in modern web development.",
    date: "Nov 28, 2024",
    readTime: "5 min",
    gradient: "from-cosmic-purple/20 to-cosmic-pink/20",
  },
  {
    id: 2,
    title: "Building Ethereal Experiences",
    excerpt: "How to craft immersive interfaces that transport users to another realm.",
    date: "Nov 15, 2024",
    readTime: "8 min",
    gradient: "from-cosmic-blue/20 to-cosmic-cyan/20",
  },
  {
    id: 3,
    title: "The Future is Glass",
    excerpt: "A deep dive into glassmorphism and spatial design trends shaping tomorrow.",
    date: "Oct 30, 2024",
    readTime: "6 min",
    gradient: "from-cosmic-pink/20 to-cosmic-purple/20",
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
            <span className="text-foreground">Dream</span>{" "}
            <span className="text-gradient">Journal</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Thoughts floating through the cosmic void
          </p>
        </motion.div>

        {/* Blog Cards Gallery */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto perspective-2000">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group"
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <motion.div
                className={`glass-strong rounded-2xl p-6 h-full bg-gradient-to-br ${post.gradient} cursor-pointer preserve-3d`}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
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
                <h3 className="font-syne text-xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>

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
