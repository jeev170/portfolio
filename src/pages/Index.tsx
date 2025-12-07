import { Navigation } from "@/components/Navigation";
import { StarField } from "@/components/StarField";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Photography } from "@/components/Photography";
import { Blog } from "@/components/Blog";
import { Quotes } from "@/components/Quotes";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Star Field Background */}
      <StarField count={150} />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Photography />
        <Blog />
        <Quotes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
