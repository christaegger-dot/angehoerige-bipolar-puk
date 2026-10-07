import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('../werkzeug-loader.js', () => ({
  loadWerkzeugTool: () => Promise.reject(new Error('Failed to fetch tool chunk')),
}));

import { WerkzeugePage } from '../werkzeuge.jsx';

describe('tool loading failure', () => {
  it('opens a closable error dialog after a failed tool choice without removing the tools page', async () => {
    const user = userEvent.setup();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockImplementation(function () { return this.hidden ? null : document.body; });
    render(<WerkzeugePage onNavigate={() => {}} />);
    const card = screen.getByRole('button', { name: /Krisenplan öffnen/ });

    await user.hover(card);
    await user.click(card);
    const dialog = await screen.findByRole('dialog', { name: 'Werkzeug konnte nicht geladen werden' });
    expect(screen.getByRole('heading', { level: 1, name: 'Werkzeuge im Überblick.' })).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: 'Seite neu laden' })).toBeInTheDocument();
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(card).toHaveFocus());
    expect(screen.getByRole('button', { name: 'Alte gespeicherte Entwürfe löschen' })).toBeEnabled();
  });
});
