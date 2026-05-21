import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock de ResizeObserver para el entorno de tests (JSDOM no lo incluye)
// Usamos una clase tradicional para que 'new ResizeObserver' funcione
globalThis.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Limpia el DOM después de cada test
afterEach(() => {
  cleanup();
});
