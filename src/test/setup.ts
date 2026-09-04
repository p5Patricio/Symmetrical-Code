import '@testing-library/jest-dom/vitest';
import 'vitest-canvas-mock';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock de ResizeObserver para el entorno de tests (JSDOM no lo incluye)
// Usamos una clase tradicional para que 'new ResizeObserver' funcione
globalThis.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Mock de window.matchMedia para GSAP y animaciones en JSDOM
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// Limpia el DOM después de cada test
afterEach(() => {
  cleanup();
});
