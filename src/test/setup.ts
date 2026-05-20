import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extiende los matchers de Vitest con los de jest-dom (toBeInTheDocument, etc.)
expect.extend(matchers);

// Mock de ResizeObserver para el entorno de tests (JSDOM no lo incluye)
// Usamos una clase tradicional para que 'new ResizeObserver' funcione
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// Limpia el DOM después de cada test
afterEach(() => {
  cleanup();
});
