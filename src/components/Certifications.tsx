import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

// ==========================================
// ADD YOUR CERTIFICATIONS HERE
// Replace with your actual certifications
// ==========================================
const certifications = [
  {
    id: 1,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#", // Add your credential URL
    gradient: "from-cosmic-purple to-cosmic-blue",
  },
  {
    id: 2,
    title: "Google Data Analytics Certificate",
    issuer: "Google",
    date: "2024",
    credentialUrl: "#",
    gradient: "from-cosmic-cyan to-cosmic-blue",
  },
  {
    id: 3,
    title: "Meta Front-End Developer",
    issuer: "Meta",
    date: "2023",
    credentialUrl: "#",
    gradient: "from-cosmic-pink to-cosmic-purple",
  },
  {
    id: 4,
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2023",
    credentialUrl: "#",
    gradient: "from-cosmic-blue to-cosmic-cyan",
  },
  {
    id: 5,
    title: "Python for Data Science",
    issuer: "IBM",
    date: "2023",
    credentialUrl: "#",
    gradient: "from-cosmic-purple to-cosmic-pink",
  },
  {
    id: 6,
    title: "UI/UX Design Specialization",
    issuer: "Coursera",
    date: "2023",
    credentialUrl: "#",
    gradient: "from-cosmic-pink to-cosmic-cyan",
  },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
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
            <span className="text-foreground">Certifications</span>{" "}
            <span className="text-gradient">& Credentials</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Milestones in my continuous learning journey
          </p>
        </motion.div>

        {/* Certifications Stack */}
        <div className="max-w-3xl mx-auto space-y-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="group"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative glass-strong rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {/* Gradient accent */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${cert.gradient}`} />
                
                {/* Hover glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${cert.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 rounded-xl md:rounded-2xl`} />

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <motion.div 
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl glass flex items-center justify-center bg-gradient-to-br ${cert.gradient} bg-opacity-10`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <Award className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </motion.div>

                    {/* Content */}
                    <div>
                      <h3 className="font-syne text-base md:text-lg font-bold group-hover:text-gradient transition-all">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                        <span>{cert.issuer}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Credential Link */}
                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-2 glass px-3 md:px-4 py-2 rounded-full text-xs md:text-sm hover:bg-primary/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                    <span>View</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
