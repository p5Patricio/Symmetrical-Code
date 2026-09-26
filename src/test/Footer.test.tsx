import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/layout/Footer';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'es' }
  })
}));

describe('Footer', () => {
  it('renders without crashing', () => {
    // Footer links to /privacidad and /terminos via react-router <Link>
    // (see LegalPage), so it now needs a Router context to render.
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
