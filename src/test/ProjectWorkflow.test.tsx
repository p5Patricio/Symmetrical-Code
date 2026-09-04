import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectWorkflow from '../components/sections/ProjectWorkflow';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { defaultValue?: string; returnObjects?: boolean }) => {
      if (key === 'team.workflow_steps') {
        return [
          {
            id: 'analysis',
            step: 'FASE_01',
            status: 'DIAGNÓSTICO',
            title: 'Análisis y Requerimientos',
            tagline: 'Diagnóstico profundo',
            description: 'Deconstruimos tu problema operativo.',
            deliverables: ['Documento SRS Técnico'],
            touchpoint: 'Taller 1-a-1',
            badge: '0% Ambigüedad',
          },
          {
            id: 'scope',
            step: 'FASE_02',
            status: 'BLUEPRINT',
            title: 'Definición de Alcance y Diseño',
            tagline: 'Arquitectura de datos',
            description: 'Modelamos las bases de datos.',
            deliverables: ['Prototipo en Figma'],
            touchpoint: 'Aprobación de Prototipo',
            badge: 'Presupuesto Fijo',
          },
          {
            id: 'development',
            step: 'FASE_03',
            status: 'EN SPRINTS',
            title: 'Desarrollo e Ingeniería',
            tagline: 'Código modular',
            description: 'Programamos bajo arquitectura limpia.',
            deliverables: ['Código Fuente Modular'],
            touchpoint: 'Demos quincenales',
            badge: 'Sprints Funcionales',
          },
          {
            id: 'delivery',
            step: 'FASE_04',
            status: 'PRODUCCIÓN',
            title: 'Entrega Final y Despliegue',
            tagline: 'Puesta en marcha',
            description: 'Lanzamiento a la nube.',
            deliverables: ['Despliegue Cloud en Producción'],
            touchpoint: 'Go-Live',
            badge: '100% Tu Código',
          },
        ];
      }
      return options?.defaultValue || key;
    },
  }),
}));

describe('ProjectWorkflow', () => {
  it('renders workflow section header and all 4 steps', () => {
    render(<ProjectWorkflow />);

    // Check header
    expect(screen.getByText('Cómo llevamos tus proyectos a la realidad')).toBeInTheDocument();

    // Check all 4 steps are rendered
    expect(screen.getByText('FASE_01')).toBeInTheDocument();
    expect(screen.getByText('FASE_02')).toBeInTheDocument();
    expect(screen.getByText('FASE_03')).toBeInTheDocument();
    expect(screen.getByText('FASE_04')).toBeInTheDocument();

    // Check titles
    expect(screen.getByText('Análisis y Requerimientos')).toBeInTheDocument();
    expect(screen.getByText('Definición de Alcance y Diseño')).toBeInTheDocument();
    expect(screen.getByText('Desarrollo e Ingeniería')).toBeInTheDocument();
    expect(screen.getByText('Entrega Final y Despliegue')).toBeInTheDocument();
  });

  it('allows clicking a step to toggle its active highlight', () => {
    render(<ProjectWorkflow />);

    const stepOneCard = screen.getByText('Análisis y Requerimientos').closest('.glass-card-enhanced');
    expect(stepOneCard).toBeInTheDocument();

    // Click to select
    if (stepOneCard) {
      fireEvent.click(stepOneCard);
      expect(stepOneCard.className).toContain('border-[#195fc1]');

      // Click again to unselect
      fireEvent.click(stepOneCard);
      expect(stepOneCard.className).not.toContain('shadow-2xl');
    }
  });
});
