import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const fixture = vi.hoisted(() => ({ renderers: {} }));
vi.mock('../page-registry.js', () => ({ PAGE_RENDERERS: fixture.renderers }));

import App from '../app.jsx';

function delayedPage() {
  let resolve;
  let reject;
  const promise = new Promise((fulfil, fail) => { resolve = fulfil; reject = fail; });
  const Page = React.lazy(() => promise);
  return { Page, resolve, reject };
}

beforeEach(() => {
  Object.keys(fixture.renderers).forEach(key => delete fixture.renderers[key]);
  fixture.renderers.start = ({ onNavigate }) => (
    <>
      <h1>Start</h1>
      <a href="/module/4#s6" onClick={event => { event.preventDefault(); onNavigate('modul4', 's6'); }}>Abschnitt öffnen</a>
    </>
  );
});

describe('committed page navigation', () => {
  it('scrolls and focuses a linked section after a slow lazy page finishes loading', async () => {
    const user = userEvent.setup();
    const lazy = delayedPage();
    fixture.renderers.modul4 = () => <lazy.Page />;
    const scroll = vi.spyOn(window, 'scrollTo');
    render(<App />);
    expect(document.activeElement).not.toBe(screen.getByRole('main'));

    await user.click(screen.getByRole('link', { name: 'Abschnitt öffnen' }));
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 600)); });
    expect(screen.getByRole('status')).toHaveTextContent('Seite wird geladen');
    await act(async () => lazy.resolve({ default: () => (
      <section id="s6" ref={element => { if (element) element.getBoundingClientRect = () => ({ top: 1000 }); }}>
        <h1>Geladener Abschnitt</h1>
      </section>
    ) }));

    expect(await screen.findByRole('heading', { name: 'Geladener Abschnitt' })).toHaveFocus();
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ top: 984, behavior: 'instant' }));
    expect(window.location.pathname + window.location.hash).toBe('/module/4#s6');
  });

  it('keeps focus on the first dialog of a linked page', async () => {
    const user = userEvent.setup();
    fixture.renderers.werkzeuge = () => <div role="dialog" aria-label="Werkzeug"><button autoFocus>Schliessen</button></div>;
    render(<App />);
    await user.click(screen.getByRole('link', { name: 'Werkzeuge', exact: true }));
    expect(within(await screen.findByRole('dialog', { name: 'Werkzeug' })).getByRole('button')).toHaveFocus();
    expect(screen.getByRole('main')).not.toHaveFocus();
  });

  it('lets a routed dialog restore its trigger without scrolling back to the page top', async () => {
    const user = userEvent.setup();
    fixture.renderers.werkzeuge = ({ onNavigate, anchor }) => (
      <>
        <h1>Werkzeuge</h1>
        <button id="tool-trigger" onClick={() => onNavigate('werkzeuge', 'tool-trigger')}>Werkzeug öffnen</button>
        {anchor && <div role="dialog" aria-label="Werkzeug"><button autoFocus onClick={() => {
          onNavigate('werkzeuge', null, { replace: true });
          requestAnimationFrame(() => document.getElementById('tool-trigger')?.focus());
        }}>Schliessen</button></div>}
      </>
    );
    window.history.replaceState({}, '', '/werkzeuge');
    const scroll = vi.spyOn(window, 'scrollTo');
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Werkzeug öffnen' }));
    await screen.findByRole('dialog');
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 30)); });
    scroll.mockClear();

    await user.click(screen.getByRole('button', { name: 'Schliessen' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Werkzeug öffnen' })).toHaveFocus());
    expect(scroll).not.toHaveBeenCalled();
    expect(window.location.hash).toBe('');
  });

  it('keeps navigation and emergency calls available after an import fails and can return home', async () => {
    const user = userEvent.setup();
    const lazy = delayedPage();
    fixture.renderers.module = () => <lazy.Page />;
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<App />);
    await user.click(screen.getByRole('link', { name: 'Module', exact: true }));
    await act(async () => lazy.reject(new Error('Chunk could not be loaded')));

    expect(await screen.findByRole('heading', { name: 'Die Seite konnte nicht geöffnet werden.' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Hauptnavigation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Seite neu laden' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '144 · Sanität' })).toHaveAttribute('href', 'tel:144');
    expect(screen.getByRole('link', { name: '117 · Polizei' })).toHaveAttribute('href', 'tel:117');
    expect(screen.getByRole('main')).toHaveFocus();

    await user.click(screen.getByRole('link', { name: 'Zur Startseite' }));
    expect(await screen.findByRole('heading', { name: 'Start' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });
});
