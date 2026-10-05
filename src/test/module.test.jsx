import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModulePage } from '../module.jsx';
import { Modul1Page } from '../modul1.jsx';

describe('ModulePage', () => {
  it('exposes module rows as keyboard-accessible links', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<ModulePage onNavigate={onNavigate} />);

    await user.tab();

    const firstModuleLink = screen.getByRole('link', { name: /Die bipolare Störung verstehen/i });
    expect(firstModuleLink).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(onNavigate).toHaveBeenCalledWith('modul1');
  });

  it('uses the same orientation flow as the homepage', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<ModulePage onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Nein, schon länger' }));
    await user.click(screen.getByRole('button', { name: 'Nein' }));
    await user.click(screen.getByRole('button', { name: 'Nein, eher Werkzeuge' }));
    await user.click(screen.getByRole('button', { name: 'Konkret handeln, Grenzen, Gespräche' }));

    const tool = screen.getByRole('link', { name: /Kommunikations-Trainer — Anliegen und Grenzen vorbereiten/i });
    expect(tool).toHaveAttribute('href', '/werkzeuge#kommunikation');
    await user.click(tool);
    expect(onNavigate).toHaveBeenCalledWith('werkzeuge', 'kommunikation');
    const recommendationLink = await screen.findByRole('link', { name: /Modul 6 — Was Sie konkret tun können/i });
    expect(recommendationLink).toBeInTheDocument();

    await user.click(recommendationLink);

    expect(onNavigate).toHaveBeenCalledWith('modul6');
  });

  it('uses canonical hrefs for module detail cross-page links', () => {
    render(<Modul1Page onNavigate={() => {}} />);

    expect(screen.getByRole('link', { name: 'Start' })).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: 'Module' })[0]).toHaveAttribute('href', '/module');
    screen.getAllByRole('link', { name: /← Alle Module/i }).forEach((link) => {
      expect(link).toHaveAttribute('href', '/module');
    });
    expect(screen.getByRole('link', { name: 'Konkrete Hilfen' })).toHaveAttribute('href', '/module/6');
    expect(screen.getByRole('link', { name: 'Kinder unterstützen' })).toHaveAttribute('href', '/module/4#s6');
  });
});
