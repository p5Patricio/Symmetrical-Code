import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProjectsPage from '../pages/ProjectsPage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'es' }
  })
}));

describe('ProjectsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ProjectsPage />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });

  it('renders full page version without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ProjectsPage isFullPage={true} />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
