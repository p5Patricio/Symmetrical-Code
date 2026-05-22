import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { 
      language: 'es',
      changeLanguage: vi.fn()
    }
  })
}));

describe('Navbar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
