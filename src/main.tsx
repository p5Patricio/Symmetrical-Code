import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n/index'; // Inicializa i18next
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);