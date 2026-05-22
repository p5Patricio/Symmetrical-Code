import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatWidget from '../components/chat/ChatWidget';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'es' }
  })
}));

describe('ChatWidget', () => {
  it('renders without crashing', () => {
    const { container } = render(<ChatWidget />);
    expect(container).toBeInTheDocument();
  });
});
