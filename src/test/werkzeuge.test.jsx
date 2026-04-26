import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WerkzeugePage } from '../werkzeuge.jsx';
import { KrisenplanTool } from '../werkzeuge-tools.jsx';

describe('WerkzeugePage', () => {
  it('renders tool cards as dialog-trigger buttons', async () => {
    const user = userEvent.setup();

    render(<WerkzeugePage onNavigate={() => {}} />);

    const toolButton = screen.getByRole('button', { name: /Belastungs-Selbsttest/i });
    expect(toolButton).toHaveAttribute('aria-haspopup', 'dialog');

    await user.click(screen.getByRole('button', { name: /Krisenplan-Werkzeug/i }));

    expect(await screen.findByRole('dialog', { name: 'Krisenplan-Werkzeug' })).toBeInTheDocument();
  });

  it('uses canonical hrefs for cross-page support links', () => {
    render(<WerkzeugePage onNavigate={() => {}} />);

    expect(screen.getByRole('link', { name: /sieben Modulen/i })).toHaveAttribute('href', '/module');
    expect(screen.getByRole('link', { name: /Notfallweg/i })).toHaveAttribute('href', '/notfall');
  });
});

describe('KrisenplanTool storage', () => {
  it('stores drafts in session storage by default and only persists locally after opt-in', async () => {
    const user = userEvent.setup();

    render(<KrisenplanTool onClose={() => {}} onNavigate={() => {}} />);

    await user.type(screen.getByRole('textbox', { name: /Plan für/i }), 'M. & Christine');

    expect(window.sessionStorage.getItem('puk-krisenplan-v1')).toContain('M. & Christine');
    expect(window.localStorage.getItem('puk-krisenplan-v1')).toBeNull();

    await user.click(screen.getByLabelText('Auf diesem Gerät dauerhaft behalten'));
    await user.type(screen.getByRole('textbox', { name: /Klinikwunsch/i }), 'PUK Zürich');

    expect(window.localStorage.getItem('puk-krisenplan-v1')).toContain('PUK Zürich');
    expect(window.sessionStorage.getItem('puk-krisenplan-v1')).toBeNull();
  });

  it('uses a canonical href for the crisis path link in the disclaimer', () => {
    render(<KrisenplanTool onClose={() => {}} onNavigate={() => {}} />);

    expect(screen.getByRole('link', { name: /Notfallweg/i })).toHaveAttribute('href', '/notfall');
  });
});
