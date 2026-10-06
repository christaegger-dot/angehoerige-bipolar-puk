import { describe, it, expect } from 'vitest';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app.jsx';

describe('App navigation', () => {
  it('keeps numbered crisis guidance on the dedicated crisis page across navigation', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole('heading', { name: /wenn jemand in ihrem umfeld/i });
    expect(screen.queryByRole('link', { name: '144 · Sanität' })).not.toBeInTheDocument();
    expect(within(screen.getByRole('main')).queryByText(/akute Gefahr/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'SOS Krise' }));
    expect(await screen.findByRole('link', { name: '144 · Sanität' })).toHaveAttribute('href', 'tel:144');
    expect(screen.getByRole('link', { name: '117 · Polizei' })).toHaveAttribute('href', 'tel:117');
    expect(screen.getByRole('link', { name: '143 · Gespräch' })).toHaveAttribute('href', 'tel:143');
    await screen.findByRole('heading', { level: 1, name: /SOS Krise — wenn jetzt/i });
    expect(within(screen.getByRole('main')).getAllByText(/144/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('link', { name: 'Module' }));
    await screen.findByRole('heading', { level: 1, name: /Alle sieben Module im Überblick/i });
    expect(screen.getByRole('link', { name: 'Module', exact: true })).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: '144 · Sanität' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '117 · Polizei' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '143 · Gespräch' })).not.toBeInTheDocument();
    expect(within(screen.getByRole('main')).queryByText(/akute Gefahr/i)).not.toBeInTheDocument();
  });

  it('navigates between main pages through the shared navigation', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(await screen.findByRole('heading', { name: /wenn jemand in ihrem umfeld/i })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Werkzeuge' }));

    expect(await screen.findByRole('heading', { name: /Werkzeuge im Überblick/i })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/werkzeuge');

    await user.click(screen.getByRole('link', { name: 'Unterstützung und Ressourcen' }));

    expect(await screen.findByRole('heading', { name: /Unterstützung und Ressourcen/i })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/unterstuetzung');
  });

  it('supports direct entry and back-forward navigation from browser history', async () => {
    const user = userEvent.setup();

    window.history.replaceState({}, '', '/module/6');
    render(<App />);

    expect(await screen.findByRole('heading', { level: 1, name: /Was Sie konkret tun können/i })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Werkzeuge' }));
    expect(await screen.findByRole('heading', { name: /Werkzeuge im Überblick/i })).toBeInTheDocument();

    window.history.back();
    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(await screen.findByRole('heading', { level: 1, name: /Was Sie konkret tun können/i })).toBeInTheDocument();
  });

  it('marks the module context and updates metadata on the confidentiality reference', async () => {
    window.history.replaceState({}, '', '/schweigepflicht');
    render(<App />);

    expect(await screen.findByRole('heading', { level: 1, name: /schweigepflicht bei angehörigen.*gesprächen/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Module' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Module' })).toHaveClass('active');
    expect(document.title).toMatch(/schweigepflicht bei angehörigengesprächen/i);
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      expect.stringMatching(/schweigepflicht, einwilligung/i),
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://angehoerige-bipolar-puk.netlify.app/schweigepflicht',
    );
  });

  it('canonicalizes legacy hash routes on first load', async () => {
    window.history.replaceState({}, '', '/#modul2');
    render(<App />);

    expect(await screen.findByRole('heading', { name: /Die eigene Belastung verstehen/i })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/module/2');
    expect(window.location.hash).toBe('');
  });

  it('opens a bookmarked tool after loading and keeps its module destination when leaving the dialog', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/werkzeuge#phasenverlauf');
    render(<App />);

    const dialog = await screen.findByRole('dialog', { name: 'Bipolarer Phasenverlauf' });
    await user.click(within(dialog).getByRole('button', { name: /Bipolar I und II unterscheiden/i }));

    await screen.findByRole('heading', { level: 1, name: /Die bipolare Störung verstehen/i });
    expect(window.location.pathname + window.location.hash).toBe('/module/1#s5');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the doctor questions from module 6 and continues to their reference', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/module/6');
    render(<App />);
    await screen.findByRole('heading', { level: 1, name: /Was Sie konkret tun können/i });
    await user.click(screen.getByRole('link', { name: /Fragen fürs Arztgespräch/i }));
    const dialog = await screen.findByRole('dialog', { name: 'Fragen für das Arztgespräch' });
    expect(window.location.pathname + window.location.hash).toBe('/unterstuetzung#dl-08');
    await user.click(within(dialog).getByRole('link', { name: 'Schweigepflicht beim Behandlungsgespräch klären' }));
    await screen.findByRole('heading', { level: 1, name: /Schweigepflicht bei Angehörigen/i });
    expect(window.location.pathname).toBe('/schweigepflicht');
  });

  it('reflects browser history and hash changes in the selected tool without reopening a closed dialog', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/werkzeuge#krisenplan');
    render(<App />);
    await screen.findByRole('dialog', { name: 'Krisenplan' });

    window.history.pushState({}, '', '/werkzeuge#saeulen');
    window.dispatchEvent(new PopStateEvent('popstate'));
    await screen.findByRole('dialog', { name: 'Säulen-Check' });
    expect(screen.queryByRole('dialog', { name: 'Krisenplan' })).not.toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(window.location.hash).toBe('');

    window.history.replaceState({}, '', '/werkzeuge#unbekannt');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await waitFor(() => expect(window.location.hash).toBe('#unbekannt'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps the crisis-plan material linked to the same preparation context', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/unterstuetzung#dl-09');
    render(<App />);
    const dialog = await screen.findByRole('dialog', { name: 'Krisenplan' });
    await user.click(within(dialog).getByRole('button', { name: /Plan gemeinsam vorbereiten/i }));
    await screen.findByRole('heading', { level: 1, name: /Was Sie konkret tun können/i });
    expect(window.location.pathname + window.location.hash).toBe('/module/6#s2');
  });
});
