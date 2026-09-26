import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ScrollToTop from '../components/layout/ScrollToTop';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Link to="/privacidad">privacy</Link>
      <Link to="/#services">services</Link>
      <button type="button" onClick={() => navigate(-1)}>back</button>
    </>
  );
}

function Privacy() {
  const navigate = useNavigate();
  return <button type="button" onClick={() => navigate(-1)}>back</button>;
}

function renderApp() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacidad" element={<Privacy />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ScrollToTop', () => {
  let scrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollTo = vi.fn();
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('scrolls to the top when navigating to another page', () => {
    renderApp();
    scrollTo.mockClear();

    fireEvent.click(screen.getByText('privacy'));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });
  });

  it('leaves the position alone on back navigation', () => {
    renderApp();
    fireEvent.click(screen.getByText('privacy'));
    scrollTo.mockClear();

    fireEvent.click(screen.getByText('back'));

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('ignores links that target an in-page section', () => {
    renderApp();
    scrollTo.mockClear();

    fireEvent.click(screen.getByText('services'));

    expect(scrollTo).not.toHaveBeenCalled();
  });
});
