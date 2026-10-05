import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomePage } from '../home.jsx';

describe('HomePage triage flow', () => {
  it('routes a new diagnosis to the introductory module and can restart', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<HomePage onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Ja, die Diagnose ist neu' }));

    expect(screen.queryByText('Notfallweg')).not.toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /Modul 1 — Die bipolare Störung verstehen/i }));
    expect(onNavigate).toHaveBeenCalledWith('modul1');

    await user.click(screen.getByRole('button', { name: 'Nochmal beantworten' }));
    expect(screen.getByText('Frage 1 von bis zu 4')).toBeInTheDocument();
  });

  it('preserves the chosen tool format and offers the module as further reading', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<HomePage onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Nein, schon länger' }));
    await user.click(screen.getByRole('button', { name: 'Nein' }));
    await user.click(screen.getByRole('button', { name: 'Nein, eher Werkzeuge' }));
    await user.click(screen.getByRole('button', { name: 'Konkret handeln, Grenzen, Gespräche' }));

    const toolLink = await screen.findByRole('link', { name: /Kommunikations-Trainer — Anliegen und Grenzen vorbereiten/i });
    expect(toolLink).toHaveAttribute('href', '/werkzeuge#kommunikation');
    await user.click(toolLink);
    expect(onNavigate).toHaveBeenCalledWith('werkzeuge', 'kommunikation');
    const recommendationLink = screen.getByRole('link', { name: /Modul 6 — Was Sie konkret tun können/i });
    expect(recommendationLink).toBeInTheDocument();
    await user.click(recommendationLink);
    expect(onNavigate).toHaveBeenCalledWith('modul6');
  });

  it('keeps both foundations and a targeted tool when both formats are chosen', async () => {
    const user = userEvent.setup();
    render(<HomePage onNavigate={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Nein, schon länger' }));
    await user.click(screen.getByRole('button', { name: 'Nein' }));
    await user.click(screen.getByRole('button', { name: 'Sowohl als auch' }));
    await user.click(screen.getByRole('button', { name: 'Verstehen, was mit mir passiert' }));

    expect(screen.getByRole('link', { name: /Modul 1 — Grundlagen verstehen/i })).toHaveAttribute('href', '/module/1');
    expect(screen.getByRole('link', { name: /Meine Belastung wahrnehmen — fünf Reflexionsfragen/i })).toHaveAttribute('href', '/werkzeuge#selbsttest');
    expect(screen.getByRole('link', { name: /Modul 2 — Die eigene Belastung verstehen/i })).toHaveAttribute('href', '/module/2');

    await user.click(screen.getByRole('button', { name: 'Nochmal beantworten' }));
    await user.click(screen.getByRole('button', { name: 'Ja, die Diagnose ist neu' }));
    expect(screen.queryByRole('link', { name: /fünf Reflexionsfragen/i })).not.toBeInTheDocument();
  });
});


it('offers direct support when the carer is at their limit', async () => {
  const user = userEvent.setup();
  const onNavigate = vi.fn();
  render(<HomePage onNavigate={onNavigate} />);
  await user.click(screen.getByRole('button', { name: 'Nein, schon länger' }));
  await user.click(screen.getByRole('button', { name: 'Ja' }));
  const support = screen.getByRole('link', { name: /Beratung und Entlastung/i });
  expect(support).toHaveAttribute('href', '/unterstuetzung');
  await user.click(support);
  expect(onNavigate).toHaveBeenCalledWith('unterstuetzung');
});
