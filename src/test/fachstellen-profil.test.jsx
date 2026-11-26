import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import App from '../app.jsx';
import { ROUTES } from '../routes.js';
import { SITE } from '../site-config.js';

// Regeln des PUK Website-Profils 2026.10.2 («Absenderin», «Zuständigkeit statt Krisenzugang»),
// mit denselben Mustern wie im Gate des Profils (tools/contract.js).
const PHONE_NUMBER = /(?:\+41|0041|\b0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}\b|\b0800\s?\d{2,3}\s?\d{2,3}/;
const SHORT_NUMBER = /(?:^|[^\d.,:/-])(112|117|118|143|144|145|147)(?![\d]|[.,:/-]\d)/;
// Seiten, die eine Handlungsanleitung für akute Lagen enthalten (Gewalt, akute Gefährdung, Sorge um die Sicherheit).
const PAGES_WITH_INLINE_REFERENCE = ['modul3', 'modul6', 'modul7'];

async function renderRoute(path) {
  window.history.replaceState({}, '', path);
  const view = render(<App />);
  await waitFor(() => expect(document.querySelector('#main-content h1')).not.toBeNull());
  return view;
}

describe('Fachstellen-Profil 2026.10.2', () => {
  it.each(ROUTES.map(({ page, path }) => [path, page]))('names the sender and the responsibility note on %s', async (path) => {
    await renderRoute(path);

    const sender = document.querySelectorAll('[data-sender]');
    expect(sender).toHaveLength(1);
    expect(sender[0].closest('main')).toBeNull();
    expect(sender[0].textContent).toContain(SITE.sender.orgUnit);
    expect(sender[0].textContent).toContain(SITE.sender.institution);
    expect(sender[0].querySelector('a[data-sender-email]')).toHaveAttribute('href', `mailto:${SITE.sender.email}`);

    const responsibility = document.querySelectorAll('[data-safety-access="responsibility"]');
    expect(responsibility).toHaveLength(1);
    expect(responsibility[0].closest('footer')).not.toBeNull();
    expect(responsibility[0].getAttribute('data-review-status')).toBe(SITE.responsibility.reviewStatus);
    expect(responsibility[0].querySelector('p').textContent).toBe(SITE.responsibility.text);
    expect(document.querySelector('footer [data-disclaimer]').textContent).toBe(SITE.disclaimer);
  });

  it.each(ROUTES.map(({ page, path }) => [path, page]))('offers no phone number, phone link or emergency block on %s', async (path) => {
    await renderRoute(path);

    expect(document.querySelectorAll('a[href^="tel:"]')).toHaveLength(0);
    expect(document.body.textContent).not.toMatch(PHONE_NUMBER);
    expect(document.body.textContent).not.toMatch(SHORT_NUMBER);
    expect(document.querySelectorAll('[data-safety-variant="direct"], [data-safety-variant="persistent-subdued"], [data-safety-access="direct"]')).toHaveLength(0);
    expect(document.querySelector('a[href="/notfall"]')).toBeNull();
  });

  it.each(ROUTES.map(({ page, path }) => [path, page]))('uses the reviewed referral in running text only where it belongs on %s', async (path, page) => {
    await renderRoute(path);

    const referrals = [...document.querySelectorAll('[data-responsibility-inline]')];
    expect(referrals.length > 0).toBe(PAGES_WITH_INLINE_REFERENCE.includes(page));
    for (const referral of referrals) {
      expect(referral.textContent).toBe(SITE.responsibility.inline.text);
      expect(referral.closest('main')).not.toBeNull();
      expect(referral.closest('figure, details, aside')).toBeNull();
    }
    const sections = referrals.map(referral => referral.closest('section'));
    expect(new Set(sections).size).toBe(referrals.length);
  });

  it.each(ROUTES.map(({ page, path }) => [path, page]))('uses the profile icons instead of Unicode symbols on %s', async (path) => {
    await renderRoute(path);

    // Ausnahmen des Profils: Mittelpunkt « · » und «#» vor Themen-Chips.
    expect(document.body.textContent).not.toMatch(/[→←↗↪▸⏱✓✗×]/);
    for (const icon of document.querySelectorAll('svg.puk-icon')) {
      const labelled = icon.getAttribute('role') === 'img' && Boolean(icon.getAttribute('aria-label'));
      expect(labelled || icon.getAttribute('aria-hidden') === 'true').toBe(true);
    }
  });

  it('names the skip link and the logo link as the profile does', async () => {
    await renderRoute('/module');

    expect(document.querySelector('.skip-link').textContent).toBe('Zum Hauptinhalt');
    const logo = document.querySelector('.nav-brand');
    const name = logo.getAttribute('aria-label');
    // WCAG 2.5.3: Der Name beginnt mit dem sichtbaren Logotext, enthält den sichtbaren Namen der Website und nennt das Ziel.
    expect(name.startsWith(SITE.sender.institution)).toBe(true);
    expect(name).toContain(logo.querySelector('.nav-brand-mark').textContent);
    expect(name.endsWith('zur Startseite dieser Website')).toBe(true);
  });

  it('takes both referral wordings from the profile without change', () => {
    expect(SITE.responsibility.text).toBe('Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich: angehoerigenarbeit@pukzh.ch. Sorgen Sie sich akut um das Leben oder die Sicherheit eines Menschen, holen Sie sofort Hilfe: ärztlicher Notfalldienst oder Notfallstation, bei Gefahr die Polizei.');
    expect(SITE.responsibility.inline.text).toBe('Sorgen Sie sich akut um das Leben oder die Sicherheit eines Menschen, holen Sie sofort Hilfe: ärztlicher Notfalldienst oder Notfallstation, bei Gefahr die Polizei.');
    // Der zweite Satz des Zuständigkeitsverweises ist wortgleich mit dem Verweis im Text.
    expect(SITE.responsibility.text.endsWith(SITE.responsibility.inline.text)).toBe(true);
    expect(SITE.disclaimer).toBe('Diese Website ersetzt keine individuelle Abklärung, Beratung oder Behandlung.');
  });
});
