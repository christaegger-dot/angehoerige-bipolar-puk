import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WerkzeugePage } from '../werkzeuge.jsx';
import { KrisenplanTool, TOOL_COMPONENTS } from '../werkzeuge-tools.jsx';

describe('WerkzeugePage', () => {
  it('renders tool cards as dialog-trigger buttons', async () => {
    const user = userEvent.setup();

    render(<WerkzeugePage onNavigate={() => {}} />);

    const toolButton = screen.getByRole('button', { name: /Belastungs-Selbsttest/i });
    expect(toolButton).toHaveAttribute('aria-haspopup', 'dialog');

    await user.click(screen.getByRole('button', { name: /Krisenplan/i }));

    expect(await screen.findByRole('dialog', { name: 'Krisenplan' })).toBeInTheDocument();
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

describe('tool regressions', () => {
  it('starts the breathing exercise and can reset to the intro state', async () => {
    const AtemuebungTool = TOOL_COMPONENTS.atem;

    render(<AtemuebungTool onClose={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /beginnen/i }));
    expect(screen.getByText(/atemzug 1 von 5/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /abbrechen/i }));
    expect(screen.getByRole('button', { name: /beginnen/i })).toBeInTheDocument();
  });

  it('shows ee details, switches tabs, and navigates from the recommendation buttons', async () => {
    const onNavigate = vi.fn();
    const onClose = vi.fn();

    render(<TOOL_COMPONENTS.ee onClose={onClose} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: /erschöpfung/i }));
    expect(screen.getByText(/phase 3 von 4/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: /wo unterbrechen/i }));
    expect(screen.getByText(/selbsttest oder säulen-check/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /modul 5 — loyalitätskonflikte/i }));
    expect(onNavigate).toHaveBeenCalledWith('modul5', 's3');
    expect(onClose).toHaveBeenCalled();
  });

  it('supports keyboard activation and navigation in the belastungsverlauf tool', async () => {
    const onNavigate = vi.fn();
    const onClose = vi.fn();

    const { container } = render(<TOOL_COMPONENTS.belastungsverlauf onClose={onClose} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: /mit unterstützung/i }));
    expect(screen.getByText(/mit hilfe/i)).toBeInTheDocument();

    const secondEpisode = container.querySelector('[aria-label="Wiederkehr"]');
    expect(secondEpisode).not.toBeNull();
    secondEpisode.focus();
    fireEvent.keyDown(secondEpisode, { key: 'Enter' });
    expect(screen.getByRole('heading', { level: 3, name: /wiederkehr/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /unterstützung und ressourcen/i }));
    expect(onNavigate).toHaveBeenCalledWith('unterstuetzung');
    expect(onClose).toHaveBeenCalled();
  });
});
