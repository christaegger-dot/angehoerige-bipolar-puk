import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const fixture = vi.hoisted(() => ({ renderers: {} }));
vi.mock('../page-registry.js', () => ({ PAGE_RENDERERS: fixture.renderers }));
import App from '../app.jsx';
import { useBrowserNavigation } from '../use-browser-navigation.js';

const originalX = Object.getOwnPropertyDescriptor(window, 'scrollX');
const originalY = Object.getOwnPropertyDescriptor(window, 'scrollY');
function position(x, y) {
  Object.defineProperty(window, 'scrollX', { configurable: true, value: x });
  Object.defineProperty(window, 'scrollY', { configurable: true, value: y });
  window.dispatchEvent(new Event('scroll'));
}

beforeEach(() => {
  position(0, 0);
  Object.keys(fixture.renderers).forEach(key => delete fixture.renderers[key]);
  fixture.renderers.start = ({ onNavigate }) => (
    <>
      <h1>Start</h1>
      <a href="/#triage" onClick={event => { event.preventDefault(); onNavigate('start', 'triage'); }}>Einstieg finden</a>
      <section id="triage" ref={element => {
        if (element) element.getBoundingClientRect = () => ({ top: 1000 - window.scrollY });
      }}><h2>Einstieg</h2></section>
    </>
  );
  fixture.renderers.modul4 = () => <h1>Lesemodul</h1>;
  fixture.renderers.werkzeuge = () => <h1>Werkzeuge</h1>;
});

afterEach(() => {
  vi.useRealTimers();
  Object.defineProperty(window, 'scrollX', originalX);
  Object.defineProperty(window, 'scrollY', originalY);
});

describe('navigation requests and history reading positions', () => {
  it('repeats anchor scroll and focus without creating another history entry', async () => {
    const user = userEvent.setup();
    const scroll = vi.spyOn(window, 'scrollTo');
    render(<App />);
    await user.click(screen.getByRole('link', { name: 'Einstieg finden' }));
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ top: 984, behavior: 'instant' }));
    const historyLength = window.history.length;
    scroll.mockClear();
    position(0, 0);
    await user.click(screen.getByRole('link', { name: 'Einstieg finden' }));
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ top: 984, behavior: 'instant' }));
    expect(screen.getByRole('heading', { name: 'Einstieg', exact: true })).toHaveFocus();
    expect(window.history.length).toBe(historyLength);
  });

  it('focuses a bookmarked anchor on the initial loaded page', async () => {
    const scroll = vi.spyOn(window, 'scrollTo');
    window.history.replaceState({ __pukNavigation: { key: 'saved-anchor', position: { x: 0, y: 2400 } } }, '', '/#triage');
    render(<App />);
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Einstieg', exact: true })).toHaveFocus());
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ top: 984, behavior: 'instant' }));
    expect(scroll).not.toHaveBeenCalledWith({ left: 0, top: 2400, behavior: 'instant' });
  });

  it('retains a reloaded bare URL reading position until its lazy content is ready without forcing focus', async () => {
    const scroll = vi.spyOn(window, 'scrollTo');
    window.history.replaceState({ external: 'preserved', __pukNavigation: { key: 'reloaded-module', position: { x: 0, y: 2400 } } }, '', '/module/4');
    let resolve;
    const LazyPage = React.lazy(() => new Promise(fulfil => { resolve = fulfil; }));
    fixture.renderers.modul4 = () => <LazyPage />;
    render(<App />);
    await screen.findByRole('status');
    expect(window.history.state.__pukNavigation.position).toEqual({ x: 0, y: 2400 });
    expect(window.history.state.external).toBe('preserved');
    expect(scroll).not.toHaveBeenCalled();
    await act(async () => resolve({ default: () => <h1>Erneut geladenes Lesemodul</h1> }));
    await screen.findByRole('heading', { name: 'Erneut geladenes Lesemodul' });
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ left: 0, top: 2400, behavior: 'instant' }));
    expect(screen.getByRole('main')).not.toHaveFocus();
  });

  it('preserves foreign history state and saves only numeric scroll metadata', () => {
    window.history.replaceState({ external: { preserved: true } }, '', '/module/4');
    const { result } = renderHook(() => useBrowserNavigation());
    position(0, 4300);
    act(() => result.current[1]('werkzeuge'));
    expect(window.history.state.external).toEqual({ preserved: true });
    expect(window.history.state.__pukNavigation.position).toEqual({ x: 0, y: 0 });
    const revision = result.current[0].revision;
    const length = window.history.length;
    act(() => result.current[1]('werkzeuge'));
    expect(result.current[0].revision).toBe(revision + 1);
    expect(window.history.length).toBe(length);
    expect(result.current[0].transition).toBe('push');
  });

  it('restores the latest positions on Back and Forward without forcing the page top', async () => {
    const user = userEvent.setup();
    const scroll = vi.spyOn(window, 'scrollTo');
    window.history.replaceState({ external: 'kept' }, '', '/module/4');
    render(<App />);
    position(0, 4300);
    await user.click(screen.getByRole('link', { name: 'Werkzeuge', exact: true }));
    await screen.findByRole('heading', { name: 'Werkzeuge' });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 30)); });
    position(0, 1500);
    const toolsEntry = window.history.state;
    scroll.mockClear();
    act(() => window.history.back());
    await screen.findByRole('heading', { name: 'Lesemodul' });
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ left: 0, top: 4300, behavior: 'instant' }));
    expect(window.history.state.external).toBe('kept');
    expect(scroll).not.toHaveBeenCalledWith({ top: 0, behavior: 'instant' });

    position(0, 4700);
    scroll.mockClear();
    act(() => window.history.forward());
    await screen.findByRole('heading', { name: 'Werkzeuge' });
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ left: 0, top: 1500, behavior: 'instant' }));
    expect(window.history.state.__pukNavigation.key).toBe(toolsEntry.__pukNavigation.key);
    act(() => window.history.back());
    await screen.findByRole('heading', { name: 'Lesemodul' });
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ left: 0, top: 4700, behavior: 'instant' }));
  });

  it('waits for lazy history content before restoring its reading position', async () => {
    const user = userEvent.setup();
    const scroll = vi.spyOn(window, 'scrollTo');
    window.history.replaceState({}, '', '/module/4');
    render(<App />);
    position(0, 4300);
    await user.click(screen.getByRole('link', { name: 'Werkzeuge', exact: true }));
    await screen.findByRole('heading', { name: 'Werkzeuge' });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 30)); });
    let resolve;
    const LazyPage = React.lazy(() => new Promise(fulfil => { resolve = fulfil; }));
    fixture.renderers.modul4 = () => <LazyPage />;
    scroll.mockClear();
    act(() => window.history.back());
    await screen.findByRole('status');
    expect(scroll).not.toHaveBeenCalledWith({ left: 0, top: 4300, behavior: 'instant' });
    await act(async () => resolve({ default: () => <h1>Spätes Lesemodul</h1> }));
    await screen.findByRole('heading', { name: 'Spätes Lesemodul' });
    await waitFor(() => expect(scroll).toHaveBeenCalledWith({ left: 0, top: 4300, behavior: 'instant' }));
  });

  it('restores the browser scrollRestoration setting when unmounted', () => {
    window.history.scrollRestoration = 'auto';
    const { unmount } = renderHook(() => useBrowserNavigation());
    expect(window.history.scrollRestoration).toBe('manual');
    unmount();
    expect(window.history.scrollRestoration).toBe('auto');
  });

  it('checkpoints the latest numeric scroll at most twice per second and cancels old-route timers', () => {
    vi.useFakeTimers();
    vi.spyOn(window.performance, 'now').mockImplementation(() => Date.now());
    const replace = vi.spyOn(window.history, 'replaceState');
    const { result, unmount } = renderHook(() => useBrowserNavigation());
    replace.mockClear();
    position(0, 100);
    vi.advanceTimersByTime(250);
    position(0, 200);
    vi.advanceTimersByTime(249);
    expect(replace).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(replace).toHaveBeenCalledTimes(1);
    expect(window.history.state.__pukNavigation.position).toEqual({ x: 0, y: 200 });
    position(0, 300);
    vi.advanceTimersByTime(250);
    position(0, 400);
    vi.advanceTimersByTime(250);
    expect(replace).toHaveBeenCalledTimes(2);
    expect(window.history.state.__pukNavigation.position).toEqual({ x: 0, y: 400 });

    position(0, 500);
    act(() => result.current[1]('werkzeuge'));
    const oldEntry = replace.mock.calls.at(-1)[0].__pukNavigation;
    expect(oldEntry.position.y).toBe(500);
    const newKey = window.history.state.__pukNavigation.key;
    replace.mockClear();
    vi.advanceTimersByTime(600);
    expect(replace).not.toHaveBeenCalled();
    expect(window.history.state.__pukNavigation).toEqual({ key: newKey, position: { x: 0, y: 0 } });
    unmount();
  });
});
