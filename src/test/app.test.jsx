import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app.jsx';

describe('App navigation', () => {
  it('navigates between main pages through the shared navigation', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(await screen.findByRole('heading', { name: /wenn jemand, den sie lieben/i })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Werkzeuge' }));

    expect(await screen.findByRole('heading', { name: /Werkzeuge im Überblick/i })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/werkzeuge');

    await user.click(screen.getByRole('link', { name: 'Anlaufstellen' }));

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

  it('canonicalizes legacy hash routes on first load', async () => {
    window.history.replaceState({}, '', '/#modul2');
    render(<App />);

    expect(await screen.findByRole('heading', { name: /Die eigene Belastung verstehen/i })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/module/2');
    expect(window.location.hash).toBe('');
  });
});
