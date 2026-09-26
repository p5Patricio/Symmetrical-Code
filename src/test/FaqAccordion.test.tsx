import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FaqAccordion from '../components/service/FaqAccordion';

const items = [
  { question: 'Question one?', answer: 'Answer one.' },
  { question: 'Question two?', answer: 'Answer two.' },
];

describe('FaqAccordion', () => {
  it('renders the first item expanded and the rest collapsed', () => {
    render(<FaqAccordion eyebrow="FAQ" title="Frequently asked questions" items={items} />);

    expect(screen.getByRole('button', { name: 'Question one?' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Question two?' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles aria-expanded on click and allows multiple open items', async () => {
    const user = userEvent.setup();
    render(<FaqAccordion eyebrow="FAQ" title="Frequently asked questions" items={items} />);

    const first = screen.getByRole('button', { name: 'Question one?' });
    const second = screen.getByRole('button', { name: 'Question two?' });

    await user.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    // Opening the second item does not close the first — multiple items may be open.
    expect(first).toHaveAttribute('aria-expanded', 'true');

    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'false');
  });

  it('links each trigger to its panel via aria-controls / aria-labelledby', () => {
    render(<FaqAccordion eyebrow="FAQ" title="Frequently asked questions" items={items} />);

    const first = screen.getByRole('button', { name: 'Question one?' });
    const panelId = first.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();

    const panel = document.getElementById(panelId!);
    expect(panel).toHaveAttribute('role', 'region');
    expect(panel).toHaveAttribute('aria-labelledby', first.id);
  });
});
