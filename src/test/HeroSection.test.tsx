import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeroSection from '../components/sections/HeroSection';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'es' }
  })
}));

describe('HeroSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<HeroSection />);
    expect(container).toBeInTheDocument();
  });
});
