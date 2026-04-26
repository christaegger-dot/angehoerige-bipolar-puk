import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UnterstuetzungPage } from '../unterstuetzung.jsx';

describe('UnterstuetzungPage accessibility', () => {
  it('uses buttons for materials and FAQ disclosures', async () => {
    const user = userEvent.setup();

    render(<UnterstuetzungPage onNavigate={() => {}} />);

    const handoutButton = screen.getByRole('button', { name: /Erste Orientierung als Angehörige/i });
    expect(handoutButton).toBeInTheDocument();

    await user.click(handoutButton);

    expect(await screen.findByRole('dialog', { name: /Erste Orientierung als Angehörige/i })).toBeInTheDocument();

    const faqButton = screen.getByRole('button', {
      name: /Berät die Fachstelle auch mich als Angehörige/i,
    });
    expect(faqButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(faqButton);

    expect(faqButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', {
      name: /Berät die Fachstelle auch mich als Angehörige/i,
    })).toBeInTheDocument();
  });
});
