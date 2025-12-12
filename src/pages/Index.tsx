import { Navigation } from "@/components/Navigation";
import { StarField } from "@/components/StarField";
import { ShootingStars } from "@/components/ShootingStars";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Photography } from "@/components/Photography";
import { Blog } from "@/components/Blog";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { CreativeLab } from "@/components/CreativeLab";
import { Quotes } from "@/components/Quotes";
import { Connect } from "@/components/Connect";
import { Currently } from "@/components/Currently";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Star Field Background */}
      <StarField count={150} />
      
      {/* Shooting Stars Effect */}
      <ShootingStars />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Currently />
        <Projects />
        <Photography />
        <Blog />
        <Skills />
        <Certifications />
        <CreativeLab />
        <Quotes />
        <Connect />
      </main>
    </div>
  );
};

export default Index;
