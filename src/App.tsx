// src/App.tsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import TeamSection from './components/sections/TeamSection';
import ProjectsPage from './pages/ProjectsPage';
import ChatWidget from './components/chat/ChatWidget';
import Aurora from './components/Aurora';

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
        colorStops={['#0B1A33', '#2B4B7A', '#63B3ED']}
        amplitude={1.0}
        blend={0.5}
        speed={0.8}
      />

      {/* Contenido - Todo sobre el efecto */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        minHeight: '100vh',
        background: 'transparent'
      }}>
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
          <Route path="/proyectos" element={
            <>
              <Navbar />
              <ProjectsPage isFullPage={true} />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;