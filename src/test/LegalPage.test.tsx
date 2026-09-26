import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import i18n from '../i18n/index';
import LegalPage from '../pages/LegalPage';
import es from '../i18n/locales/es.json';
import en from '../i18n/locales/en.json';

// The raw JSON's `blocks` arrays mix several shapes (p / ul / p-link), so
// TypeScript infers `sections[i].blocks[j]` as a wide union across the whole
// file. These tests only need a couple of dynamic fields off that union, so
// read them through a small permissive local shape instead of fighting it.
interface RawBlock {
  type: string;
  text?: string;
  items?: string[];
  linkLabel?: string;
}
interface RawSection {
  title: string;
  blocks: RawBlock[];
}
const esPrivacySections = es.legal.privacy.sections as unknown as RawSection[];
const esTermsSections = es.legal.terms.sections as unknown as RawSection[];

// This suite uses the REAL i18next instance (not a mock) specifically to
// prove that `t(key, { returnObjects: true, email })` deep-interpolates the
// {{email}} placeholder inside a nested array of section/block objects — see
// LegalDocument's rendering logic, which relies on that resolved
// (already-interpolated) text to linkify the email.
function renderLegalPage(doc: 'privacy' | 'terms', path: '/privacidad' | '/terminos') {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={path} element={<LegalPage doc={doc} />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('i18next returnObjects + interpolation (verification)', () => {
  it('deep-interpolates {{email}} inside a nested sections array', () => {
    i18n.changeLanguage('es');
    const email = i18n.t('legal.email');

    const sections = i18n.t('legal.privacy.sections', {
      returnObjects: true,
      email,
    }) as Array<{ title: string; blocks: Array<{ type: string; text?: string }> }>;

    const emailBlock = sections[0].blocks.find((b) => b.text?.includes(email));
    expect(emailBlock).toBeDefined();
    expect(emailBlock?.text).not.toContain('{{email}}');
  });
});

describe('es/en "legal" namespace parity', () => {
  it('has identical top-level keys', () => {
    expect(Object.keys(es.legal).sort()).toEqual(Object.keys(en.legal).sort());
  });

  it('has the same number of sections for privacy and terms', () => {
    expect(es.legal.privacy.sections.length).toBe(en.legal.privacy.sections.length);
    expect(es.legal.terms.sections.length).toBe(en.legal.terms.sections.length);
  });
});

describe('LegalPage', () => {
  it('renders every privacy section title', () => {
    i18n.changeLanguage('es');
    renderLegalPage('privacy', '/privacidad');

    for (const section of esPrivacySections) {
      expect(screen.getAllByText(section.title).length).toBeGreaterThan(0);
    }
  });

  it('renders a real mailto: link for the contact email', () => {
    i18n.changeLanguage('es');
    renderLegalPage('privacy', '/privacidad');

    const mailtoLinks = screen.getAllByRole('link', { name: es.legal.email });
    expect(mailtoLinks.length).toBeGreaterThan(0);
    for (const link of mailtoLinks) {
      expect(link).toHaveAttribute('href', `mailto:${es.legal.email}`);
    }
  });

  it('renders every terms section title and a link to /privacidad from section 7', () => {
    i18n.changeLanguage('es');
    renderLegalPage('terms', '/terminos');

    for (const section of esTermsSections) {
      expect(screen.getAllByText(section.title).length).toBeGreaterThan(0);
    }

    const privacySectionLinkLabel = esTermsSections[6].blocks[0].linkLabel as string;
    const privacyLinks = screen.getAllByRole('link', { name: privacySectionLinkLabel });
    expect(privacyLinks.length).toBeGreaterThan(0);
    for (const link of privacyLinks) {
      expect(link).toHaveAttribute('href', '/privacidad');
    }
  });

  it('renders the English privacy document with translated content', () => {
    i18n.changeLanguage('en');
    renderLegalPage('privacy', '/privacidad');

    expect(screen.getAllByText(en.legal.privacy.title).length).toBeGreaterThan(0);
    expect(screen.getAllByText(en.legal.privacy.sections[0].title).length).toBeGreaterThan(0);

    i18n.changeLanguage('es');
  });
});
