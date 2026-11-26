import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UnterstuetzungPage } from '../unterstuetzung.jsx';
import { SchweigepflichtPage } from '../schweigepflicht.jsx';
import { SITE } from '../site-config.js';

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
  // Dieselben Muster wie im Gate des PUK Website-Profils 2026.10.2.
  const phoneNumbers = /(?:\+41|0041|\b0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}\b|\b0800\s?\d{2,3}\s?\d{2,3}/;
  const shortNumbers = /(?:^|[^\d.,:/-])(112|117|118|143|144|145|147)(?![\d]|[.,:/-]\d)/;

  it('offers counselling contacts by e-mail or website, without phone numbers or an acute-help block', () => {
    const { container } = render(<UnterstuetzungPage onNavigate={() => {}} />);

    expect(screen.getByRole('link', { name: /Fachstelle Angehörigenarbeit PUK Zürich — E-Mail schreiben/i }))
      .toHaveAttribute('href', `mailto:${SITE.sender.email}`);
    // Von der Fachstelle am 26.11.2026 bestätigte Webadressen statt der früheren Telefonnummern.
    expect(screen.getByRole('link', { name: /Pro Mente Sana — Beratungstelefon — Website öffnen \(promentesana\.ch\)/ }))
      .toHaveAttribute('href', 'https://promentesana.ch/');
    expect(screen.getByRole('link', { name: /Opferhilfe Zürich — Website öffnen \(zh\.ch\)/ }))
      .toHaveAttribute('href', 'https://www.zh.ch/de/sicherheit-justiz/opferhilfe.html');
    for (const link of container.querySelectorAll('.resource-list a[target="_blank"]')) {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    expect(container.querySelectorAll('a[href^="tel:"]')).toHaveLength(0);
    expect(container.textContent).not.toMatch(phoneNumbers);
    expect(container.textContent).not.toMatch(shortNumbers);
    expect(container.textContent).not.toMatch(/AKUTE LAGE|24\/7|Dargebotene Hand/);
    expect(screen.queryByRole('button', { name: /Notfallkarte/i })).not.toBeInTheDocument();
  });

  it('makes the programme-effectiveness statement traceable to the shared sources and their different review scopes', () => {
    const { container } = render(<UnterstuetzungPage onNavigate={() => {}} />);
    const offerGuide = container.querySelector('.support-offer-guide');
    expect(within(offerGuide).getByRole('link', { name: /Baruch et al\. \(2018\)/ })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/29747136/');
    expect(within(offerGuide).getByRole('link', { name: /Umer et al\. \(2026\)/ })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/42312868/');
    expect(offerGuide.textContent).toContain('Originalabstract geprüft; Volltext nicht geprüft');
    expect(offerGuide.textContent).toContain('Originalvolltext geprüft');
    expect(offerGuide.textContent).toContain('Daraus lässt sich keine Wirkung für jedes Angebot oder für diese Website ableiten.');
  });

  it.each([
    'Erste Orientierung als Angehörige',
    'Umgang mit Suizidgedanken',
    'Umgang mit Psychose / Wahn',
    'Umgang mit Manie',
    'Umgang mit Depression',
    'Fragen für das Arztgespräch',
  ])('keeps the material %s free of phone numbers and phone links', async (title) => {
    const user = userEvent.setup();
    render(<UnterstuetzungPage onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: new RegExp(title, 'i') }));

    const dialog = await screen.findByRole('dialog', { name: title });
    expect(dialog.querySelectorAll('a[href^="tel:"]')).toHaveLength(0);
    expect(dialog.textContent).not.toMatch(phoneNumbers);
    expect(dialog.textContent).not.toMatch(shortNumbers);
    expect(dialog.querySelector('.handout-phonelist')).toBeNull();
    expect(dialog.textContent).not.toContain('In akuten Lagen hat der Notfallweg Vorrang.');
  });

  it.each([
    'Umgang mit Suizidgedanken',
    'Umgang mit Psychose / Wahn',
  ])('closes the material %s with the reviewed referral instead of a list of numbers', async (title) => {
    const user = userEvent.setup();
    render(<UnterstuetzungPage onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: new RegExp(title, 'i') }));

    const dialog = await screen.findByRole('dialog', { name: title });
    const referrals = dialog.querySelectorAll('[data-responsibility-inline]');
    expect(referrals).toHaveLength(1);
    expect(referrals[0].textContent).toBe(SITE.responsibility.inline.text);
    expect(referrals[0].closest('details, figure')).toBeNull();
  });

  it('gives the e-mail address of the Fachstelle in the first-orientation material', async () => {
    const user = userEvent.setup();
    render(<UnterstuetzungPage onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Erste Orientierung als Angehörige/i }));

    const dialog = await screen.findByRole('dialog', { name: 'Erste Orientierung als Angehörige' });
    expect(within(dialog).getByRole('link', { name: SITE.sender.email })).toHaveAttribute('href', `mailto:${SITE.sender.email}`);
    expect(dialog.querySelector('[data-responsibility-inline]')).toBeNull();
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
  it('opens no material at the address of the removed wallet card', () => {
    render(<UnterstuetzungPage anchor="dl-02" onNavigate={vi.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('prints a material from its dialog', async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<UnterstuetzungPage anchor="dl-01" onNavigate={vi.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Erste Orientierung als Angehörige' });
    expect(dialog.textContent).toContain('Quellen und Grenzen');
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

describe('UnterstuetzungPage external help offers', () => {
  it('links the self-help organisations to the addresses confirmed on 26 November 2026', () => {
    render(<UnterstuetzungPage onNavigate={() => {}} />);

    const equilibrium = screen.getByRole('link', { name: /EQUILIBRIUM — Website öffnen/ });
    expect(equilibrium).toHaveAttribute('href', 'https://www.depressionen.ch/');
    const selbsthilfe = screen.getByRole('link', { name: /Selbsthilfe Zürich — Website öffnen/ });
    expect(selbsthilfe).toHaveAttribute('href', 'https://www.selbsthilfezuerich.ch/');
    for (const link of [equilibrium, selbsthilfe]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
