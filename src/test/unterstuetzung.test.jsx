import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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
    await user.keyboard('{Escape}');

    const faqButton = screen.getByRole('button', {
      name: /Kann ich als Angehörige oder nahestehende Person selbst Beratung erhalten/i,
    });
    expect(faqButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(faqButton);

    expect(faqButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', {
      name: /Kann ich als Angehörige oder nahestehende Person selbst Beratung erhalten/i,
    })).toBeInTheDocument();
  });
});

describe('UnterstuetzungPage counselling and material boundaries', () => {
  const crisisNumbers = /\b(?:144|117|143|147)\b|0800\s*33\s*66\s*55|058\s*384\s*20\s*00/;

  it('offers ordinary counselling contacts without an acute-help block or guaranteed round-the-clock availability', () => {
    const { container } = render(<UnterstuetzungPage onNavigate={() => {}} />);

    expect(screen.getByRole('link', { name: /Fachstelle Angehörigenarbeit PUK Zürich anrufen/i }))
      .toHaveAttribute('href', 'tel:+41583843800');
    expect(screen.getByRole('link', { name: /Opferhilfe Zürich anrufen/i }))
      .toHaveAttribute('href', 'tel:+41444552142');
    expect(container.textContent).not.toMatch(crisisNumbers);
    expect(container.textContent).not.toMatch(/AKUTE LAGE|24\/7|Dargebotene Hand/);
  });

  it.each([
    'Erste Orientierung als Angehörige',
    'Umgang mit Manie',
    'Umgang mit Depression',
    'Fragen für das Arztgespräch',
  ])('keeps the psychoeducative material %s free of crisis-number blocks', async (title) => {
    const user = userEvent.setup();
    render(<UnterstuetzungPage onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: new RegExp(title, 'i') }));

    const dialog = await screen.findByRole('dialog', { name: title });
    expect(dialog.textContent).not.toMatch(crisisNumbers);
    expect(dialog.querySelector('.handout-phonelist')).toBeNull();
    expect(dialog.textContent).not.toContain('In akuten Lagen hat der Notfallweg Vorrang.');
  });

  it.each([
    ['Notfallkarte fürs Portemonnaie', ['144', '117', '143', '0800 33 66 55', '058 384 20 00', '058 384 38 00']],
    ['Umgang mit Suizidgedanken', ['144', '143', '0800 33 66 55', '058 384 20 00']],
    ['Umgang mit Psychose / Wahn', ['058 384 20 00', '144', '117']],
  ])('preserves the crisis-orientation contacts in the excluded material %s', async (title, numbers) => {
    const user = userEvent.setup();
    render(<UnterstuetzungPage onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: new RegExp(title, 'i') }));

    const dialog = await screen.findByRole('dialog', { name: title });
    expect(within(dialog).getAllByRole('link').map(link => link.textContent)).toEqual(numbers);
    expect(dialog.textContent).toContain('In akuten Lagen hat der Notfallweg Vorrang.');
  });

  it('separates sharing observations from receiving confidential treatment information', async () => {
    const user = userEvent.setup();
    render(<UnterstuetzungPage onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Fragen für das Arztgespräch/i }));

    const dialog = await screen.findByRole('dialog', { name: 'Fragen für das Arztgespräch' });
    expect(within(dialog).getByText(/Wie kann ich Ihnen meine Beobachtungen mitteilen, und welche Informationen dürfen Sie mir/i))
      .toBeInTheDocument();
    expect(dialog.textContent).not.toContain('ohne eine Schweigepflichtentbindung zu brechen');
  });
});
