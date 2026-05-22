import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });
});
