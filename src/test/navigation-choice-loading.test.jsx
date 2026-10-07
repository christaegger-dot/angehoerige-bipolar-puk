import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../page-loader.js', async importOriginal => {
  const original = await importOriginal();
  return { ...original, preloadPage: vi.fn(original.preloadPage) };
});
vi.mock('../werkzeug-loader.js', async importOriginal => {
  const original = await importOriginal();
  return { ...original, loadWerkzeugTool: vi.fn(original.loadWerkzeugTool) };
});

import App from '../app.jsx';
import { preloadPage } from '../page-loader.js';
import { loadWerkzeugTool } from '../werkzeug-loader.js';

describe('loading after a navigation choice', () => {
  it('keeps route and tool imports idle during hover, focus and touch, then loads the chosen content', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole('heading', { level: 1, name: /wenn jemand in ihrem umfeld/i });

    const modules = within(screen.getByRole('navigation', { name: 'Hauptnavigation' })).getByRole('link', { name: 'Module', exact: true });
    await user.hover(modules);
    fireEvent.focus(modules);
    fireEvent.touchStart(modules);
    expect(preloadPage).not.toHaveBeenCalled();

    await user.click(modules);
    await screen.findByRole('heading', { level: 1, name: /alle sieben module/i });
    expect(preloadPage).toHaveBeenCalledWith('module');

    const tools = within(screen.getByRole('navigation', { name: 'Hauptnavigation' })).getByRole('link', { name: 'Werkzeuge', exact: true });
    await user.hover(tools);
    fireEvent.focus(tools);
    fireEvent.touchStart(tools);
    expect(preloadPage).not.toHaveBeenCalledWith('werkzeuge');

    await user.click(tools);
    await screen.findByRole('heading', { level: 1, name: /werkzeuge im überblick/i });
    expect(preloadPage).toHaveBeenCalledWith('werkzeuge');

    const crisisPlan = screen.getByRole('button', { name: /Krisenplan öffnen/ });
    await user.hover(crisisPlan);
    fireEvent.focus(crisisPlan);
    fireEvent.touchStart(crisisPlan);
    expect(loadWerkzeugTool).not.toHaveBeenCalled();

    await user.click(crisisPlan);
    await screen.findByRole('dialog', { name: 'Krisenplan' });
    expect(loadWerkzeugTool).toHaveBeenCalledWith('krisenplan');
    expect(screen.getAllByRole('textbox', { name: /Frühwarnzeichen/i }).length).toBeGreaterThan(0);
  });
});
