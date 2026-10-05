import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app.jsx';

describe('App navigation', () => {
  it('keeps numbered crisis guidance on the dedicated crisis page across navigation', async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole('heading', { name: /wenn jemand, den sie lieben/i });
    expect(screen.queryByRole('link', { name: /SOS Krise — 144/ })).not.toBeInTheDocument();
    expect(within(screen.getByRole('main')).queryByText(/akute Gefahr/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'SOS Krise' }));
    expect(await screen.findByRole('link', { name: /SOS Krise — 144/ })).toBeInTheDocument();
    await screen.findByRole('heading', { level: 1, name: /SOS Krise — wenn jetzt/i });
    expect(within(screen.getByRole('main')).getAllByText(/144/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('link', { name: 'Module' }));
    await screen.findByRole('heading', { level: 1, name: /Alle sieben Module im Überblick/i });
    expect(screen.queryByRole('link', { name: /SOS Krise — 144/ })).not.toBeInTheDocument();
    expect(within(screen.getByRole('main')).queryByText(/akute Gefahr/i)).not.toBeInTheDocument();
  });

  it('navigates between main pages through the shared navigation', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(await screen.findByRole('heading', { name: /wenn jemand, den sie lieben/i })).toBeInTheDocument();

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
    expect(screen.getByRole('link', { name: 'Module' })).toHaveAttribute('aria-current', 'page');
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
});
