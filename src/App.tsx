import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';  // ✅ SOLO Routes y Route, NO BrowserRouter
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import DeviceShowcase from './components/sections/DeviceShowcase';
import TeamSection from './components/sections/TeamSection';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <Helmet>
        <html lang={currentLang} />
      </Helmet>
      
      {/* ✅ SIN BrowserRouter (ya está en main.tsx) */}
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <HeroSection />
            <ServicesSection />
            <DeviceShowcase />
            <ProjectsPage />
            <TeamSection />
            <Footer />
          </>
        } />
        <Route path="/proyectos" element={<ProjectsPage isFullPage={true} />} />
      </Routes>
    </>
  );
}

export default App;