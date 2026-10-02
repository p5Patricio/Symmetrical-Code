import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './locales/es.json';
import en from './locales/en.json';

export type Language = 'es' | 'en';

/** Language the pages are prerendered in (scripts/prerender.mjs). */
export const DEFAULT_LANGUAGE: Language = 'es';
/** Same key i18next-browser-languagedetector used, so saved preferences survive. */
const STORAGE_KEY = 'i18nextLng';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Visitor's language: saved choice first, then the browser languages.
 * Only reads browser APIs, so it must not run on the server — Node 21+ exposes
 * a global `navigator` (en-US), which made every page prerender in English.
 */
export function detectLanguage(): Language {
  if (!isBrowser) return DEFAULT_LANGUAGE;
  const candidates: (string | null | undefined)[] = [];
  try {
    candidates.push(localStorage.getItem(STORAGE_KEY));
  } catch {
    /* storage blocked */
  }
  candidates.push(...(navigator.languages ?? []), navigator.language);
  for (const c of candidates) {
    const code = c?.toLowerCase();
    if (code?.startsWith('es')) return 'es';
    if (code?.startsWith('en')) return 'en';
  }
  return DEFAULT_LANGUAGE;
}

/* A prerendered page must hydrate in the language it was rendered in; the
   visitor's language is applied right after hydration (see App.tsx). */
const prerendered = isBrowser && document.getElementById('root')?.dataset.prerendered === 'true';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: !isBrowser || prerendered ? DEFAULT_LANGUAGE : detectLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  load: 'languageOnly',
  supportedLngs: ['es', 'en'],
  nonExplicitSupportedLngs: true,
  // Resources are bundled: initialize synchronously so the first render is ready.
  initImmediate: false,
  interpolation: {
    escapeValue: false,
  },
});

if (isBrowser) {
  // Registered after init so the prerender language is never saved as a preference.
  i18n.on('languageChanged', (lng) => {
    try {
      localStorage.setItem(STORAGE_KEY, lng);
    } catch {
      /* storage blocked */
    }
  });
}

export default i18n;
