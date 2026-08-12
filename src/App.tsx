import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import DeviceShowcase from './components/sections/DeviceShowcase';
// ✅ EXISTE: TeamSection
import TeamSection from './components/sections/TeamSection';
// ✅ EXISTE: ProjectsPage
import ProjectsPage from './pages/ProjectsPage';

function App() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
        {/* Solo actualizamos el idioma, el resto ya está en index.html */}
      </Helmet>
      
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <DeviceShowcase />
      
      {/* ✅ SECCIÓN DE PROYECTOS (desde ProjectsPage) */}
      <ProjectsPage />
      
      {/* ✅ SECCIÓN DE EQUIPO */}
      <TeamSection />
      
      <Footer />
    </>
  );
}

export default App;