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
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const { theme } = useTheme();

  const auroraStops = theme === 'dark'
    ? ['#030b17', '#00296b', '#195fc1']
    : ['#dce9fc', '#195fc1', '#7fadfa'];

  return (
    <>
      <Helmet>
        <html lang={currentLang} className={theme} />
      </Helmet>

      {/* Efecto Aurora - Fondo fijo */}
      <Aurora 
        colorStops={auroraStops}
        amplitude={theme === 'dark' ? 1.0 : 0.75}
        blend={theme === 'dark' ? 0.5 : 0.6}
        speed={0.8}
      />

      {/* Contenido interactivo con ClickSpark */}
      <ClickSpark
        sparkColor="#195fc1"
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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;