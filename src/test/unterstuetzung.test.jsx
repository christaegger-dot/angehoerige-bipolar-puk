import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UnterstuetzungPage } from '../unterstuetzung.jsx';
import { SchweigepflichtPage } from '../schweigepflicht.jsx';

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
    const contacts = dialog.querySelector('.handout-phonelist');
    expect(within(contacts).getAllByRole('link').map(link => link.textContent)).toEqual(numbers);
    expect(dialog.textContent).toContain('In akuten Lagen hat der Notfallweg Vorrang.');
  });

  it('separates sharing observations from receiving confidential treatment information', async () => {
    const user = userEvent.setup();
    render(<UnterstuetzungPage onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Fragen für das Arztgespräch/i }));

    const dialog = await screen.findByRole('dialog', { name: 'Fragen für das Arztgespräch' });
    expect(within(dialog).getByText(/Wie kann ich Ihnen meine Beobachtungen mitteilen\? Welche Informationen dürfen Sie mir/i))
      .toBeInTheDocument();
    expect(dialog.textContent).not.toContain('ohne eine Schweigepflichtentbindung zu brechen');
  });
});

describe('UnterstuetzungPage targeted entries', () => {
  it('offers the compact wallet export while retaining the detailed reading version and sources', async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<UnterstuetzungPage anchor="dl-02" onNavigate={vi.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Notfallkarte fürs Portemonnaie' });
    expect(within(dialog).getByText(/kompakte Karte auf einer A4-Seite/)).toBeInTheDocument();
    expect(dialog.querySelector('.wallet-reading').textContent).toContain('Bekannte Allergien / Unverträglichkeiten');
    expect(dialog.querySelector('.wallet-reading').textContent).toContain('Quellen und Grenzen');
    const compactCard = dialog.querySelector('.wallet-print');
    expect(compactCard.textContent).toContain('Gefaltet: 85 × 55 mm.');
    expect(compactCard.textContent).toContain('Tatsächliche Grösse');
    expect(compactCard.querySelector('a[href$="/unterstuetzung#dl-02"]')).not.toBeNull();
    await user.click(within(dialog).getByRole('button', { name: 'Drucken / als PDF speichern' }));
    expect(print).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['dl-01', 'Erste Orientierung als Angehörige'],
    ['dl-06', 'Umgang mit Manie'],
    ['dl-07', 'Umgang mit Depression'],
    ['dl-08', 'Fragen für das Arztgespräch'],
    ['dl-09', 'Krisenplan'],
  ])('opens %s directly from the route', async (anchor, title) => {
    render(<UnterstuetzungPage anchor={anchor} onNavigate={vi.fn()} />);

    expect(await screen.findByRole('dialog', { name: title })).toBeInTheDocument();
  });

  it.each([null, 'hilfe', 'material', 'kontakt', 'fragen', 'dl-03', 'unbekannt'])('does not open a dialog for %s', (anchor) => {
    render(<UnterstuetzungPage anchor={anchor} onNavigate={vi.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('navigates to a selected material and replaces its route when closing', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const { rerender } = render(<UnterstuetzungPage anchor={null} onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: /Fragen für das Arztgespräch/i }));
    expect(onNavigate).toHaveBeenLastCalledWith('unterstuetzung', 'dl-08');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(<UnterstuetzungPage anchor="dl-08" onNavigate={onNavigate} />);
    expect(screen.getByRole('dialog', { name: 'Fragen für das Arztgespräch' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onNavigate).toHaveBeenLastCalledWith('unterstuetzung', null, { replace: true });

    rerender(<UnterstuetzungPage anchor={null} onNavigate={onNavigate} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it.each([
    ['dl-01', 'Erkrankung und Behandlung verstehen · Modul 1', '/module/1', ['modul1']],
    ['dl-06', 'Umgang mit Hochphasen vertiefen · Modul 6', '/module/6#s5', ['modul6', 's5']],
    ['dl-07', 'Begleitung bei Depression vertiefen · Modul 6', '/module/6#s5', ['modul6', 's5']],
    ['dl-08', 'Schweigepflicht beim Behandlungsgespräch klären', '/schweigepflicht', ['schweigepflicht']],
  ])('connects %s to its matching context', async (anchor, label, href, destination) => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<UnterstuetzungPage anchor={anchor} onNavigate={onNavigate} />);

    const link = within(screen.getByRole('dialog')).getByRole('link', { name: label });
    expect(link).toHaveAttribute('href', href);
    await user.click(link);
    expect(onNavigate).toHaveBeenCalledWith(...destination);
  });

  it('offers direct section entries and a reference from the confidentiality FAQ', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const { container } = render(<UnterstuetzungPage anchor={null} onNavigate={onNavigate} />);

    for (const label of ['Hilfe', 'Material', 'Kontakt', 'Fragen']) {
      const anchor = label.toLowerCase();
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', `/unterstuetzung#${anchor}`);
      expect(container.querySelector(`section#${anchor}`)).not.toBeNull();
    }
    await user.click(screen.getByRole('button', { name: 'Wie ist es mit der Schweigepflicht?' }));
    const reference = screen.getByRole('link', { name: 'Schweigepflicht beim Behandlungsteam vertiefen' });
    expect(reference).toHaveAttribute('href', '/schweigepflicht');
    await user.click(reference);
    expect(onNavigate).toHaveBeenCalledWith('schweigepflicht');
  });
});

describe('SchweigepflichtPage follow-up paths', () => {
  it('connects treatment questions and personal counselling without changing their context', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<SchweigepflichtPage onNavigate={onNavigate} />);

    const questions = screen.getByRole('link', { name: 'Fragen für das Arztgespräch öffnen' });
    const counselling = screen.getByRole('link', { name: 'Kontakt zur eigenen Angehörigenberatung' });
    expect(questions).toHaveAttribute('href', '/unterstuetzung#dl-08');
    expect(counselling).toHaveAttribute('href', '/unterstuetzung#kontakt');
    await user.click(questions);
    expect(onNavigate).toHaveBeenLastCalledWith('unterstuetzung', 'dl-08');
    await user.click(counselling);
    expect(onNavigate).toHaveBeenLastCalledWith('unterstuetzung', 'kontakt');
  });
});
