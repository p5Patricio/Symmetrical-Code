import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectWorkflow from '../components/sections/ProjectWorkflow';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
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
      const values: Record<string, string> = {
        'team.workflow_label': 'METODOLOGÍA // INGENIERÍA EN 4 ETAPAS',
        'team.workflow_title': 'Cómo llevamos tus proyectos a la realidad',
        'team.workflow_subtitle': 'Un proceso de ingeniería transparente y estructurado.',
        'team.workflow_phase_label': 'Fase',
        'team.workflow_touchpoint_label': 'Tu participación',
        'team.workflow_deliverables_label': 'Qué recibes',
      };
      return values[key] ?? key;
    },
  }),
}));

describe('ProjectWorkflow', () => {
  it('renders the section header from i18n keys', () => {
    render(<ProjectWorkflow />);
    expect(screen.getByText('Cómo llevamos tus proyectos a la realidad')).toBeInTheDocument();
    expect(screen.getByText('Un proceso de ingeniería transparente y estructurado.')).toBeInTheDocument();
  });

  it('renders all 4 phases as a static list with formatted phase numbers', () => {
    const { container } = render(<ProjectWorkflow />);

    const list = container.querySelector('ol');
    expect(list).toBeInTheDocument();
    expect(list?.querySelectorAll(':scope > li')).toHaveLength(4);

    // Formatted "Fase 0N" eyebrows — never the raw "FASE_0N" step code.
    expect(screen.getByText('Fase 01')).toBeInTheDocument();
    expect(screen.getByText('Fase 02')).toBeInTheDocument();
    expect(screen.getByText('Fase 03')).toBeInTheDocument();
    expect(screen.getByText('Fase 04')).toBeInTheDocument();
    expect(screen.queryByText('FASE_01')).not.toBeInTheDocument();

    // Titles
    expect(screen.getByText('Análisis y Requerimientos')).toBeInTheDocument();
    expect(screen.getByText('Definición de Alcance y Diseño')).toBeInTheDocument();
    expect(screen.getByText('Desarrollo e Ingeniería')).toBeInTheDocument();
    expect(screen.getByText('Entrega Final y Despliegue')).toBeInTheDocument();

    // Touchpoint and deliverables columns render for every phase.
    expect(screen.getAllByText('Tu participación')).toHaveLength(4);
    expect(screen.getAllByText('Qué recibes')).toHaveLength(4);
    expect(screen.getByText('Documento SRS Técnico')).toBeInTheDocument();
  });
});
