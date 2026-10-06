import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TriageFlow } from '../triage-flow.jsx';

async function reachFormatQuestion(user) {
  await user.click(screen.getByRole('button', { name: 'Nein, schon länger' }));
  await user.click(screen.getByRole('button', { name: 'Nein' }));
}

describe('TriageFlow answer correction', () => {
  it('restores the selected answer and keyboard focus when returning to a question', async () => {
    const user = userEvent.setup();
    render(<TriageFlow onNavigate={vi.fn()} />);
    await reachFormatQuestion(user);
    await user.click(screen.getByRole('button', { name: 'Sowohl als auch' }));
    await user.click(screen.getByRole('button', { name: 'Vorherige Frage' }));

    const previousAnswer = screen.getByRole('button', { name: 'Sowohl als auch' });
    expect(previousAnswer).toHaveAttribute('aria-pressed', 'true');
    expect(previousAnswer).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Nein, eher Werkzeuge' })).toHaveAttribute('aria-pressed', 'false');

    await user.keyboard('{Tab}{Enter}');
    await user.click(screen.getByRole('button', { name: 'Konkret handeln, Grenzen, Gespräche' }));
    expect(screen.getByRole('link', { name: /Kommunikations-Trainer — Anliegen und Grenzen vorbereiten/ })).toHaveAttribute('href', '/werkzeuge#kommunikation');
    expect(screen.queryByRole('link', { name: /Grundlagen verstehen/ })).not.toBeInTheDocument();
  });

  it('lets a completed recommendation return to its answer and correct an earlier answer', async () => {
    const user = userEvent.setup();
    render(<TriageFlow onNavigate={vi.fn()} />);
    await reachFormatQuestion(user);
    await user.click(screen.getByRole('button', { name: 'Nein, eher Werkzeuge' }));
    await user.click(screen.getByRole('button', { name: 'Verstehen, was mit mir passiert' }));
    await user.click(screen.getByRole('button', { name: 'Antwort ändern' }));

    const previousTopic = screen.getByRole('button', { name: 'Verstehen, was mit mir passiert' });
    expect(previousTopic).toHaveAttribute('aria-pressed', 'true');
    expect(previousTopic).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Vorherige Frage' }));
    await user.click(screen.getByRole('button', { name: 'Sowohl als auch' }));

    expect(screen.getByRole('button', { name: 'Verstehen, was mit mir passiert' })).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'Beziehung, Vertrauen, Nähe' }));
    expect(screen.getByRole('link', { name: /Modul 1 — Grundlagen verstehen/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Modul 3 — Wie Beziehungen unter Druck geraten/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Modul 2 — Die eigene Belastung verstehen/ })).not.toBeInTheDocument();
  });

  it('retains unchanged downstream answers but discards them when an earlier answer changes', async () => {
    const user = userEvent.setup();
    render(<TriageFlow onNavigate={vi.fn()} />);
    await reachFormatQuestion(user);
    await user.click(screen.getByRole('button', { name: 'Sowohl als auch' }));
    await user.click(screen.getByRole('button', { name: 'Konkret handeln, Grenzen, Gespräche' }));
    await user.click(screen.getByRole('button', { name: 'Antwort ändern' }));
    await user.click(screen.getByRole('button', { name: 'Vorherige Frage' }));
    await user.click(screen.getByRole('button', { name: 'Sowohl als auch' }));
    expect(screen.getByRole('button', { name: 'Konkret handeln, Grenzen, Gespräche' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'Vorherige Frage' }));
    await user.click(screen.getByRole('button', { name: 'Vorherige Frage' }));
    await user.click(screen.getByRole('button', { name: 'Ja' }));
    expect(screen.getByRole('link', { name: 'Beratung und Entlastung →' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Antwort ändern' }));
    await user.click(screen.getByRole('button', { name: 'Nein' }));

    expect(screen.getByRole('button', { name: 'Sowohl als auch' })).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'Nein, eher Werkzeuge' }));
    expect(screen.getByRole('button', { name: 'Konkret handeln, Grenzen, Gespräche' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('can restart mid-flow, clears prior choices and returns focus to the first answer', async () => {
    const user = userEvent.setup();
    render(<TriageFlow onNavigate={vi.fn()} />);
    await reachFormatQuestion(user);
    await user.click(screen.getByRole('button', { name: 'Sowohl als auch' }));
    await user.click(screen.getByRole('button', { name: 'Neu beginnen' }));

    const firstAnswer = screen.getByRole('button', { name: 'Ja, die Diagnose ist neu' });
    expect(firstAnswer).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Nein, schon länger' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.queryByRole('button', { name: 'Vorherige Frage' })).not.toBeInTheDocument();
    await reachFormatQuestion(user);
    expect(screen.getByRole('button', { name: 'Sowohl als auch' })).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'Nein, eher Werkzeuge' }));
    await user.click(screen.getByRole('button', { name: 'Beziehung, Vertrauen, Nähe' }));
    expect(screen.queryByRole('link', { name: /Grundlagen verstehen/ })).not.toBeInTheDocument();
  });

  it('can correct a terminal first answer without retaining the old recommendation', async () => {
    const user = userEvent.setup();
    render(<TriageFlow onNavigate={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Ja, die Diagnose ist neu' }));
    expect(screen.getByRole('status')).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Antwort ändern' }));
    expect(screen.getByRole('button', { name: 'Ja, die Diagnose ist neu' })).toHaveFocus();
    await user.click(screen.getByRole('button', { name: 'Nein, schon länger' }));
    expect(screen.getByText('Frage 2 von bis zu 4')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Die bipolare Störung verstehen/ })).not.toBeInTheDocument();
  });
});
