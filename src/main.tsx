import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';  // ✅ MANTÉN ESTO
import './i18n/index';
import './index.css';
import App from './App.tsx';

const helmetContext = {};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>   {/* ✅ MANTÉN ESTO */}
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);