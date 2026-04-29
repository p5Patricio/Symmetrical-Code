import Hero from "../components/sections/HeroSection";
import Projects from "../components/sections/ProjectsSection";
import Team from "../components/sections/TeamSection";
import Contact from "../components/sections/ContactSection";
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <main className="noise">
      <Hero />
      <Projects />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}