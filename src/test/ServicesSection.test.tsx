import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ServicesSection from '../components/sections/ServicesSection';

// Mock de i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === 'services.items') {
        return [
          { title: 'Service 1', description: 'Desc 1', bullets: ['B1', 'B2'] },
          { title: 'Service 2', description: 'Desc 2', bullets: ['B3', 'B4'] },
        ];
      }
      return key;
    },
  }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('ServicesSection', () => {
  it('debe renderizar el título de la sección', () => {
    renderWithRouter(<ServicesSection />);
    expect(screen.getByText('services.title')).toBeInTheDocument();
  });

  it('debe renderizar la lista de servicios mockeados', () => {
    renderWithRouter(<ServicesSection />);
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
  });

  it('debe mostrar la descripción de cada servicio', () => {
    renderWithRouter(<ServicesSection />);
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 2')).toBeInTheDocument();
  });

  it('las tarjetas ya no muestran un link de contacto propio', () => {
    renderWithRouter(<ServicesSection />);
    expect(screen.queryByRole('link', { name: /contact\.label/i })).not.toBeInTheDocument();
  });
});
