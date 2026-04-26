import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomePage } from '../home.jsx';

describe('HomePage triage flow', () => {
  it('routes urgent path to notfall recommendation and can restart', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<HomePage onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Ja oder unklar' }));

    expect(screen.getByText('Notfallweg')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /Zum Notfallweg/i }));
    expect(onNavigate).toHaveBeenCalledWith('notfall');

    await user.click(screen.getByRole('button', { name: 'Nochmal beantworten' }));
    expect(screen.getByText('Frage 1 von bis zu 5')).toBeInTheDocument();
  });

  it('routes non-urgent branch to module recommendation', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<HomePage onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Nein' }));
    await user.click(screen.getByRole('button', { name: 'Nein, schon länger' }));
    await user.click(screen.getByRole('button', { name: 'Nein' }));
    await user.click(screen.getByRole('button', { name: 'Nein, eher Werkzeuge' }));
    await user.click(screen.getByRole('button', { name: 'Konkret handeln, Grenzen, Gespräche' }));

    expect(screen.getByText('Modul 6 — Was Sie konkret tun können')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /Modul 6 — Was Sie konkret tun können/i }));
    expect(onNavigate).toHaveBeenCalledWith('modul6');
  });
});
