import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import DeviceShowcase from './components/sections/DeviceShowcase';
import TeamSection from './components/sections/TeamSection';
import ProjectsPage from './pages/ProjectsPage';
import ChatWidget from './components/chat/ChatWidget';

function App() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
      </Helmet>

      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={
          <>
            <Navbar />
            <HeroSection />
            <ServicesSection />
            <DeviceShowcase />
            <ProjectsPage />
            <TeamSection />
            <ChatWidget />
            <Footer />
          </>
        } />

        {/* ✅ Ruta de la galería completa de proyectos */}
        <Route path="/proyectos" element={
          <>
            <Navbar /> {/* Necesario para navegación */}
            <ProjectsPage isFullPage={true} />
            <Footer />
          </>
        } />
      </Routes>
    </>
  );
}

export default App;