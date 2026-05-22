import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProjectsPage from '../pages/ProjectsPage';

// Mock de i18next GLOBAL para todos los componentes
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Manejar retornos de objetos para .map()
      if (key === 'services.items') return [];
      if (key === 'team.pillars') return [];
      if (key === 'projects.items') return [];
      return key;
    },
    i18n: { language: 'es', changeLanguage: vi.fn() }
  }),
}));

// Mock de los datos de proyectos
vi.mock('../data/projects', () => ({
  projects: [
    { 
      id: '1', titleEs: 'Test Proj', descriptionEs: 'Desc', 
      tags: ['React'], ogImageUrl: '', galleryImages: [] 
    }
  ]
}));

describe('Navegación y Enrutamiento', () => {
  it('debe renderizar la HomePage en la ruta raíz', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
    // Verificamos que aparezca el label de servicios que está en la Home
    expect(screen.getByText('services.label')).toBeInTheDocument();
  });

  it('debe renderizar la ProjectsPage en la ruta /proyectos', () => {
    render(
      <MemoryRouter initialEntries={['/proyectos']}>
        <Routes>
          <Route path="/proyectos" element={<ProjectsPage isFullPage={true} />} />
        </Routes>
      </MemoryRouter>
    );
    // Verificamos que aparezca el título de la galería
    expect(screen.getByText('projects.gallery_title')).toBeInTheDocument();
  });
});
