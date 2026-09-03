import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import TeamSection from './components/sections/TeamSection';
import ProjectsPage from './pages/ProjectsPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ChatWidget from './components/chat/ChatWidget';
import Aurora from './components/Aurora';
import ClickSpark from './components/ui/ClickSpark';

function App() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
      </Helmet>

      {/* Efecto Aurora - Fondo fijo */}
      <Aurora 
        colorStops={['#030b17', '#00296b', '#004EBB']}
        amplitude={1.0}
        blend={0.5}
        speed={0.8}
      />

      {/* Contenido interactivo con ClickSpark */}
      <ClickSpark
        sparkColor="#004EBB"
        sparkSize={10}
        sparkRadius={20}
        sparkCount={8}
        duration={420}
        isGlobal={true}
        className="relative z-10 min-h-screen bg-transparent"
      >
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <HeroSection />
              <ServicesSection />
              <ProjectsPage />
              <TeamSection />
              <ChatWidget />
              <Footer />
            </>
          } />
          <Route path="/proyectos" element={<ProjectsPage isFullPage={true} />} />
          <Route path="/servicios/:slug" element={<ServiceDetailPage />} />
        </Routes>
      </ClickSpark>
    </>
  );
}

export default App;