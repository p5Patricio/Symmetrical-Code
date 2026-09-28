/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './i18n/index';

/**
 * Server render entry point, used by scripts/prerender.mjs.
 * Mirrors the provider tree in src/main.tsx, swapping BrowserRouter for StaticRouter.
 */
export function render(url: string) {
  const helmetContext = {};

  return (
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );
}

export function renderHtml(url: string): string {
  return renderToString(render(url));
}

export { routeSeo, PRERENDER_ROUTES } from './data/seo';
