import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToolOverlay } from '../tool-overlay.jsx';

const loader = vi.hoisted(() => ({ load: vi.fn() }));
vi.mock('../werkzeug-loader.js', () => ({ loadWerkzeugTool: loader.load }));

function LoadedKrisenplan({ onClose }) {
  return <ToolOverlay onClose={onClose} ariaLabel="Krisenplan"><h2>Krisenplan</h2></ToolOverlay>;
}

describe('Unterstützung loads its interactive material on demand', () => {
  beforeEach(() => {
    vi.resetModules();
    loader.load.mockReset();
    vi.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockImplementation(function () {
      return this.hidden ? null : document.body;
    });
  });

  it('keeps reading material independent, closes a pending load and does not reopen it on completion', async () => {
    const { UnterstuetzungPage } = await import('../unterstuetzung.jsx');
    const user = userEvent.setup();
    let resolveTool;
    loader.load.mockReturnValue(new Promise(resolve => { resolveTool = resolve; }));
    render(<UnterstuetzungPage onNavigate={vi.fn()} />);
    const crisisCard = screen.getByRole('button', { name: /Krisenplan öffnen/i });

    expect(loader.load).not.toHaveBeenCalled();
    await user.hover(crisisCard);
    crisisCard.focus();
    expect(loader.load).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /Erste Orientierung als Angehörige/i }));
    expect(screen.getByRole('dialog', { name: 'Erste Orientierung als Angehörige' })).toBeInTheDocument();
    expect(loader.load).not.toHaveBeenCalled();
    await user.keyboard('{Escape}');

    await user.click(crisisCard);
    expect(loader.load).toHaveBeenCalledExactlyOnceWith('krisenplan');
    const loading = screen.getByRole('dialog', { name: 'Werkzeug wird geöffnet' });
    await waitFor(() => expect(loading.contains(document.activeElement)).toBe(true));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(crisisCard).toHaveFocus());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await act(async () => resolveTool(LoadedKrisenplan));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(crisisCard);
    expect(await screen.findByRole('dialog', { name: 'Krisenplan' })).toBeInTheDocument();
    expect(loader.load).toHaveBeenCalledTimes(1);
  });

  it('offers a closable focused error dialog and preserves the support page when the chunk fails', async () => {
    const { UnterstuetzungPage } = await import('../unterstuetzung.jsx');
    const user = userEvent.setup();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    loader.load.mockRejectedValue(new Error('Failed to fetch tool chunk'));
    render(<UnterstuetzungPage onNavigate={vi.fn()} />);
    const crisisCard = screen.getByRole('button', { name: /Krisenplan öffnen/i });

    await user.click(crisisCard);
    const dialog = await screen.findByRole('dialog', { name: 'Werkzeug konnte nicht geladen werden' });
    expect(within(dialog).getByRole('button', { name: 'Seite neu laden' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Unterstützung und Ressourcen.' })).toBeInTheDocument();
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(crisisCard).toHaveFocus());
  });
});
