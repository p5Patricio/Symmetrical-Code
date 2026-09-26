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
import LegalPage from './pages/LegalPage';
import ChatWidget from './components/chat/ChatWidget';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const { theme } = useTheme();

  return (
    <>
      <Helmet>
        <html lang={currentLang} className={theme} />
      </Helmet>

      <div className="relative z-10 min-h-screen bg-transparent">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <HeroSection />
              <ServicesSection />
              <ProjectsPage />
              <TeamSection />
              <Footer />
            </>
          } />
          <Route path="/proyectos" element={<ProjectsPage isFullPage={true} />} />
          <Route path="/servicios/:slug" element={<ServiceDetailPage />} />
          <Route path="/privacidad" element={<LegalPage doc="privacy" />} />
          <Route path="/terminos" element={<LegalPage doc="terms" />} />
        </Routes>
        <ChatWidget />
      </div>
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