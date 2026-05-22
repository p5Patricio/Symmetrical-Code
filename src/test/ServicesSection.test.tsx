import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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

describe('ServicesSection', () => {
  it('debe renderizar el título de la sección', () => {
    render(<ServicesSection />);
    expect(screen.getByText('services.title')).toBeInTheDocument();
  });

  it('debe renderizar la lista de servicios mockeados', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
  });

  it('debe mostrar los bullets de cada servicio', () => {
    render(<ServicesSection />);
    expect(screen.getByText('B1')).toBeInTheDocument();
    expect(screen.getByText('B2')).toBeInTheDocument();
  });

  it('cada tarjeta debe tener un link de contacto', () => {
    render(<ServicesSection />);
    const contactLinks = screen.getAllByRole('link', { name: /contact\.label/i });
    expect(contactLinks.length).toBe(2);
    expect(contactLinks[0]).toHaveAttribute('href', '#contact');
  });
});
