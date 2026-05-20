import Hero from "../components/sections/HeroSection";
import Services from "../components/sections/ServicesSection";
import Team from "../components/sections/TeamSection";
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <main className="noise">
      <Hero />
      <Services />
      <Team />
      <Footer />
    </main>
  );
}
