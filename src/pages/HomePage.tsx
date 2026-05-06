import Hero from "../components/sections/HeroSection";
import Projects from "../components/sections/ProjectsSection";
import Services from "../components/sections/ServicesSection";
import Technologies from "../components/sections/TechnologiesSection";
import Team from "../components/sections/TeamSection";
import Contact from "../components/sections/ContactSection";
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <main className="noise">
      <Hero />
      <Services />
      <Technologies />
      <Projects />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}