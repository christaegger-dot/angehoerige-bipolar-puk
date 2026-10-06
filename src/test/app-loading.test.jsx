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
  it('focuses the history destination after the browser clears focus during native restoration', async () => {
    const user = userEvent.setup();
    fixture.renderers.modul4 = () => <><h1>Modul vier</h1><section id="s6"><h2>Kinderabschnitt</h2><a href="/unterstuetzung">Hilfe für Kinder</a></section></>;
    fixture.renderers.werkzeuge = () => <h1>Werkzeuge</h1>;
    window.history.replaceState({}, '', '/module/4#s6');
    render(<App />);
    await user.click(screen.getByRole('link', { name: 'Werkzeuge', exact: true }));
    expect(screen.getByRole('main')).toHaveFocus();

    act(() => {
      window.history.replaceState({}, '', '/module/4#s6');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    // Emulate native restoration after popstate. The old implementation had
    // already focused the destination here and therefore lost that focus.
    document.activeElement.blur();
    expect(document.body).toHaveFocus();

    const heading = await screen.findByRole('heading', { name: 'Kinderabschnitt' });
    await waitFor(() => expect(heading).toHaveFocus());
    await user.tab();
    expect(screen.getByRole('link', { name: 'Hilfe für Kinder' })).toHaveFocus();
  });

  it('commits only the latest destination during rapid history changes', async () => {
    fixture.renderers.werkzeuge = () => <h1>Werkzeuge</h1>;
    fixture.renderers.modul4 = () => <section id="s6"><h1>Überholtes Ziel</h1></section>;
    fixture.renderers.modul6 = () => <section id="s2"><h1>Aktuelles Ziel</h1></section>;
    window.history.replaceState({}, '', '/werkzeuge');
    render(<App />);
    const observedFocus = [];
    const onFocus = event => observedFocus.push(event.target.textContent);
    document.addEventListener('focusin', onFocus);
    try {
      act(() => {
        window.history.replaceState({}, '', '/module/4#s6');
        window.dispatchEvent(new PopStateEvent('popstate'));
      });
      act(() => {
        window.history.replaceState({}, '', '/module/6#s2');
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      });
      await waitFor(() => expect(screen.getByRole('heading', { name: 'Aktuelles Ziel' })).toHaveFocus());
      expect(observedFocus).not.toContain('Überholtes Ziel');
    } finally {
      document.removeEventListener('focusin', onFocus);
    }
  });

  it('lets a new client navigation cancel a queued history destination', async () => {
    fixture.renderers.werkzeuge = () => <h1>Werkzeuge</h1>;
    fixture.renderers.modul4 = () => <section id="s6"><h1>Altes History-Ziel</h1></section>;
    fixture.renderers.module = () => <h1>Neue Modulübersicht</h1>;
    window.history.replaceState({}, '', '/werkzeuge');
    render(<App />);
    act(() => {
      window.history.replaceState({}, '', '/module/4#s6');
      window.dispatchEvent(new PopStateEvent('popstate'));
      screen.getByRole('link', { name: 'Module', exact: true }).click();
    });
    await screen.findByRole('heading', { name: 'Neue Modulübersicht' });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 30)); });
    expect(window.location.pathname).toBe('/module');
    expect(screen.queryByRole('heading', { name: 'Altes History-Ziel' })).not.toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveFocus();
  });

  it('waits for a lazy history destination and leaves subsequent dialog focus with the dialog', async () => {
    const lazy = delayedPage();
    fixture.renderers.modul4 = () => <lazy.Page />;
    fixture.renderers.werkzeuge = ({ anchor }) => (
      <><h1>Werkzeuge</h1>{anchor && <div role="dialog" aria-label="History-Werkzeug"><button autoFocus>Dialog schliessen</button></div>}</>
    );
    window.history.replaceState({}, '', '/werkzeuge');
    render(<App />);
    act(() => {
      window.history.replaceState({}, '', '/module/4#s6');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await screen.findByRole('status');
    await act(async () => lazy.resolve({ default: () => <section id="s6"><h1>Später History-Abschnitt</h1></section> }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Später History-Abschnitt' })).toHaveFocus());

    act(() => {
      window.history.replaceState({}, '', '/werkzeuge#test-dialog');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    document.activeElement.blur();
    const dialog = await screen.findByRole('dialog', { name: 'History-Werkzeug' });
    await waitFor(() => expect(within(dialog).getByRole('button')).toHaveFocus());
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 30)); });
    expect(within(dialog).getByRole('button')).toHaveFocus();
    expect(screen.getByRole('main')).not.toHaveFocus();
  });

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

  it('keeps navigation and the fixed responsibility referral after a psychoeducative import fails', async () => {
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
    expect(screen.queryByRole('link', { name: '144 · Sanität' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '117 · Polizei' })).not.toBeInTheDocument();
    expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: 'Notfall & Krisenhilfe' })).toHaveAttribute('href', '/notfall');
    expect(screen.getByRole('main')).toHaveFocus();

    await user.click(screen.getByRole('link', { name: 'Zur Startseite' }));
    expect(await screen.findByRole('heading', { name: 'Start' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  it('keeps direct crisis contacts available when the dedicated crisis page fails to load', async () => {
    const lazy = delayedPage();
    fixture.renderers.notfall = () => <lazy.Page />;
    vi.spyOn(console, 'error').mockImplementation(() => {});
    window.history.replaceState({}, '', '/notfall');
    render(<App />);
    await act(async () => lazy.reject(new Error('Crisis chunk could not be loaded')));

    await screen.findByRole('heading', { name: 'Die Seite konnte nicht geöffnet werden.' });
    const main = within(screen.getByRole('main'));
    expect(main.getByRole('link', { name: '144 · Sanität' })).toHaveAttribute('href', 'tel:144');
    expect(main.getByRole('link', { name: '117 · Polizei' })).toHaveAttribute('href', 'tel:117');
    expect(within(screen.getByRole('navigation', { name: 'Krisenkontakte' })).getByRole('link', { name: '143 · Gespräch' })).toHaveAttribute('href', 'tel:143');
    expect(main.getByRole('button', { name: 'Seite neu laden' })).toBeInTheDocument();
  });
});
