import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WerkzeugePage } from '../werkzeuge.jsx';
import { KrisenplanTool, TOOL_COMPONENTS } from '../werkzeuge-tools.jsx';

describe('WerkzeugePage', () => {
  it('renders tool cards as dialog-trigger buttons', async () => {
    const user = userEvent.setup();

    render(<WerkzeugePage onNavigate={() => {}} />);

    const toolButton = screen.getByRole('button', { name: /Meine Belastung wahrnehmen/i });
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

    await user.type(screen.getByRole('textbox', { name: /Wenn niemand erreichbar ist/i }), 'Testkontakt');
    await user.type(screen.getByRole('textbox', { name: /Kinder und eigene Entlastung/i }), 'Testbetreuung');
    expect(window.sessionStorage.getItem('puk-krisenplan-v1')).toContain('Testbetreuung');
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
    expect(screen.getByText(/aspekt 3 von 4/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: /wo unterbrechen/i }));
    expect(screen.getByText(/sie messen keine grenze/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /modul 5 — loyalitätskonflikte/i }));
    expect(onNavigate).toHaveBeenCalledWith('modul5', 's3');
    expect(onClose).toHaveBeenCalled();
  });

  it('supports keyboard activation and navigation in the belastungsverlauf tool', async () => {
    const onNavigate = vi.fn();
    const onClose = vi.fn();

    const { container } = render(<TOOL_COMPONENTS.belastungsverlauf onClose={onClose} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: /weitere mögliche verläufe/i }));
    expect(screen.getByText(/erneute erholung/i)).toBeInTheDocument();

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


describe('fachreview safety regressions', () => {
  it('keeps a severe daily-functioning answer visible beside otherwise mild answers and resets it', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const onClose = vi.fn();
    render(<TOOL_COMPONENTS.selbsttest onClose={onClose} onNavigate={onNavigate} />);
    const mild = [
      'Erholsam, ich schlafe meistens gut durch',
      'Ich habe Energie für mehr als das Nötigste',
      'Regelmässig — ich pflege eigene Kontakte',
      'Ich kann ehrlich antworten',
      'Belastet, aber im Gleichgewicht',
    ];
    await user.click(screen.getByRole('button', { name: /beginnen/i }));
    for (const [i, answer] of mild.entries()) {
      await user.click(screen.getByRole('button', { name: i === 1 ? 'Ich komme kaum noch durch den Tag' : answer }));
    }
    expect(screen.getByRole('status')).toHaveTextContent('Wenn der Alltag kaum noch gelingt');
    expect(screen.getByText('Ich komme kaum noch durch den Tag')).toBeInTheDocument();
    expect(screen.queryByText(/^Getragen$/)).not.toBeInTheDocument();
    expect(window.localStorage.length).toBe(0);
    expect(window.sessionStorage.length).toBe(0);
    await user.click(screen.getByRole('button', { name: 'Fragen erneut ansehen' }));
    for (const answer of mild) await user.click(screen.getByRole('button', { name: answer }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /unterstützung und ressourcen/i }));
    expect(onNavigate).toHaveBeenCalledWith('unterstuetzung', undefined);
    expect(onClose).toHaveBeenCalled();
  });

  it('switches mixed symptoms to simultaneous dimensions and back to a diagnosis example', async () => {
    const user = userEvent.setup();
    render(<TOOL_COMPONENTS.phasenverlauf onClose={() => {}} onNavigate={() => {}} />);
    await user.click(screen.getByRole('tab', { name: /mischzustände/i }));
    expect(screen.getByRole('img', { name: /gleichzeitig/i }).querySelectorAll('path')).toHaveLength(2);
    await user.click(screen.getByRole('tab', { name: /bipolar ii/i }));
    expect(screen.queryByRole('img', { name: /gleichzeitig/i })).not.toBeInTheDocument();
    expect(screen.getByText(/keine feste obergrenze von sieben tagen/i)).toBeInTheDocument();
  });
});


it('completes the resource reflection with finite values and without health reassurance', () => {
  render(<TOOL_COMPONENTS.saeulen onClose={() => {}} onNavigate={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /beginnen/i }));
  for (let i = 0; i < 8; i++) {
    const options = document.querySelectorAll('.selbsttest-opt');
    fireEvent.click(options[0]);
  }
  const dialog = screen.getByRole('dialog', { name: 'Säulen-Check' });
  expect(dialog).not.toHaveTextContent('NaN');
  expect(dialog).not.toHaveTextContent('undefined');
  expect(dialog).toHaveTextContent('keine gesundheitliche Entwarnung');
});
