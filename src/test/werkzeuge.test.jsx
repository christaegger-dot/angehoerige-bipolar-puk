import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WerkzeugePage } from '../werkzeuge.jsx';
import { KrisenplanTool, TOOL_COMPONENTS } from '../werkzeuge-tools.jsx';

function blockDeletion(storage) {
  const owner = Object.hasOwn(storage, 'removeItem') ? storage : Object.getPrototypeOf(storage);
  const removeItem = owner.removeItem;
  return vi.spyOn(owner, 'removeItem').mockImplementation(function (...args) {
    if (this === storage) throw new DOMException('Storage blocked', 'SecurityError');
    return removeItem.apply(this, args);
  });
}

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

    expect(screen.getByRole('link', { name: /sieben Module/i })).toHaveAttribute('href', '/module');
    expect(screen.queryByRole('link', { name: /Notfallweg/i })).not.toBeInTheDocument();
  });
});

describe('KrisenplanTool privacy', () => {
  it('exports the full current text for print without examples or stale deleted input', () => {
    const { container } = render(<KrisenplanTool onClose={() => {}} onNavigate={() => {}} />);
    const printValues = [...container.querySelectorAll('.krisenplan-print-value')];
    expect(printValues).toHaveLength(screen.getAllByRole('textbox').length);
    printValues.forEach(value => expect(value.textContent).toBe(''));

    const name = 'Plan für <M. & Christine> '.repeat(20);
    const warningSigns = Array.from({ length: 40 }, (_, index) => `Persönliche Vereinbarung ${index + 1}`).join('\n');
    const nameInput = screen.getByRole('textbox', { name: /Plan für/i });
    const warningInput = screen.getByRole('textbox', { name: /^Frühwarnzeichen/i });
    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(warningInput, { target: { value: warningSigns } });

    expect(nameInput.parentElement.querySelector('.krisenplan-print-value').textContent).toBe(name);
    expect(warningInput.parentElement.querySelector('.krisenplan-print-value').textContent).toBe(warningSigns);
    for (const [label, value] of [
      [/^Fahren und gefährliche Maschinen/i, 'Gewünschte alternative Fahrt'],
      [/^Finanzielle Sicherheit/i, 'Gemeinsam vereinbarte Ausgabenart'],
      [/^Sexuelle Selbstbestimmung und Gesundheit/i, 'Selbst gewählte Vertrauensperson'],
    ]) {
      const input = screen.getByRole('textbox', { name: label });
      fireEvent.change(input, { target: { value } });
      expect(input.parentElement.querySelector('.krisenplan-print-value').textContent).toBe(value);
    }
    expect(nameInput.parentElement.querySelector('.krisenplan-print-value').children).toHaveLength(0);
    expect(window.localStorage.length).toBe(0);
    expect(window.sessionStorage.length).toBe(0);

    vi.spyOn(window, 'confirm').mockReturnValue(true);
    fireEvent.click(screen.getByRole('button', { name: 'Entwurf löschen' }));
    printValues.forEach(value => expect(value.textContent).toBe(''));
  });

  it('keeps new input only in the open tool and offers no persistent-storage option', async () => {
    const user = userEvent.setup();
    render(<KrisenplanTool onClose={() => {}} onNavigate={() => {}} />);

    await user.type(screen.getByRole('textbox', { name: /Plan für/i }), 'M. & Christine');
    await user.type(screen.getByRole('textbox', { name: /Kinder und eigene Entlastung/i }), 'Testbetreuung');

    expect(screen.getByRole('textbox', { name: /Plan für/i })).toHaveValue('M. & Christine');
    expect(window.sessionStorage.length).toBe(0);
    expect(window.localStorage.length).toBe(0);
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.queryByText(/^Gespeichert$/)).not.toBeInTheDocument();
  });

  it('does not restore or overwrite sensitive drafts left by older versions', () => {
    window.localStorage.setItem('puk-krisenplan-v1', JSON.stringify({ name: 'Private old draft' }));
    window.sessionStorage.setItem('puk-krisenplan-v1', JSON.stringify({ name: 'Old session copy' }));
    render(<KrisenplanTool onClose={() => {}} onNavigate={() => {}} />);

    expect(screen.getByRole('textbox', { name: /Plan für/i })).toHaveValue('');
    expect(screen.queryByText(/Private old draft/)).not.toBeInTheDocument();
    expect(window.localStorage.getItem('puk-krisenplan-v1')).toContain('Private old draft');
    expect(window.sessionStorage.getItem('puk-krisenplan-v1')).toContain('Old session copy');
    expect(screen.getByText(/Entwürfe aus früheren Versionen werden nicht wieder geöffnet/)).toBeInTheDocument();
  });

  it('starts with an empty draft after closing and reopening the tool', async () => {
    const user = userEvent.setup();
    render(<WerkzeugePage onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Krisenplan/i }));
    await user.type(await screen.findByRole('textbox', { name: /Plan für/i }), 'Private current draft');
    await user.click(screen.getAllByRole('button', { name: 'Dialog schliessen' }).find(button => button.classList.contains('tool-close')));
    await user.click(screen.getByRole('button', { name: /Krisenplan/i }));

    expect(await screen.findByRole('textbox', { name: /Plan für/i })).toHaveValue('');
    expect(window.localStorage.length).toBe(0);
    expect(window.sessionStorage.length).toBe(0);
  });

  it('deletes current input and both historical copies only after confirmation', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('puk-krisenplan-v1', JSON.stringify({ name: 'Private old draft' }));
    window.sessionStorage.setItem('puk-krisenplan-v1', JSON.stringify({ name: 'Old copy' }));
    window.localStorage.setItem('puk-kommunikation-v1', JSON.stringify({ beobachtung: 'Other tool' }));
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<KrisenplanTool onClose={() => {}} onNavigate={() => {}} />);
    await user.type(screen.getByRole('textbox', { name: /Plan für/i }), 'Current draft');

    await user.click(screen.getByRole('button', { name: 'Entwurf löschen' }));
    expect(screen.getByRole('textbox', { name: /Plan für/i })).toHaveValue('Current draft');
    expect(window.localStorage.getItem('puk-krisenplan-v1')).toContain('Private old draft');

    confirm.mockReturnValue(true);
    await user.click(screen.getByRole('button', { name: 'Entwurf löschen' }));
    expect(screen.getByRole('textbox', { name: /Plan für/i })).toHaveValue('');
    expect(window.localStorage.getItem('puk-krisenplan-v1')).toBeNull();
    expect(window.sessionStorage.getItem('puk-krisenplan-v1')).toBeNull();
    expect(window.localStorage.getItem('puk-kommunikation-v1')).toContain('Other tool');
    expect(screen.getByRole('status')).toHaveTextContent('Ihre aktuellen Eingaben und frühere Kopien in diesem Browser sind gelöscht.');
  });

  it('warns when a historical copy cannot be deleted while still clearing current input', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('puk-krisenplan-v1', JSON.stringify({ name: 'Private old draft' }));
    blockDeletion(window.localStorage);
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<KrisenplanTool onClose={() => {}} onNavigate={() => {}} />);
    await user.type(screen.getByRole('textbox', { name: /Plan für/i }), 'Current draft');

    await user.click(screen.getByRole('button', { name: 'Entwurf löschen' }));

    expect(screen.getByRole('textbox', { name: /Plan für/i })).toHaveValue('');
    expect(screen.getByRole('status')).toHaveTextContent('Frühere Kopien in diesem Browser konnten nicht vollständig gelöscht werden.');
    expect(window.localStorage.getItem('puk-krisenplan-v1')).toContain('Private old draft');
  });

  it('keeps regular counselling contact separate from crisis orientation', () => {
    render(<KrisenplanTool onClose={() => {}} onNavigate={() => {}} />);
    expect(screen.getByRole('link', { name: '058 384 38 00' })).toHaveAttribute('href', 'tel:+41583843800');
    expect(screen.queryByRole('link', { name: /Notfallweg/i })).not.toBeInTheDocument();
  });
});

describe('Kommunikations-Trainer privacy', () => {
  it('prints the current script only from the result and explains which exported copies survive deletion', async () => {
    const user = userEvent.setup();
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<TOOL_COMPONENTS.kommunikation onClose={() => {}} onNavigate={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Drucken / als PDF speichern' })).not.toBeInTheDocument();
    expect(screen.getByText(/Druckwarteschlangen und Geräteprotokolle/)).toHaveTextContent('«Entwurf löschen» entfernt diese Kopien und Einträge nicht');
    await user.click(screen.getByRole('button', { name: /Beginnen/ }));
    await user.click(screen.getByRole('button', { name: /Ein anderes Anliegen/ }));
    await user.click(screen.getByRole('button', { name: /Weiter/ }));
    const observation = 'Erste Beobachtung\nWeitere Beobachtung <mit Sonderzeichen>.';
    fireEvent.change(screen.getByRole('textbox', { name: 'Was haben Sie konkret beobachtet?' }), { target: { value: observation } });
    await user.click(screen.getByRole('button', { name: /Weiter/ }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Wie geht es Ihnen damit?' }), { target: { value: 'Meine eigene Erfahrung.' } });
    await user.click(screen.getByRole('button', { name: /Weiter/ }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Was wäre Ihr Anliegen oder Ihre Bitte?' }), { target: { value: 'Meine konkrete Bitte.' } });
    await user.click(screen.getByRole('button', { name: 'Skript ansehen →' }));
    await user.click(screen.getByRole('button', { name: 'Drucken / als PDF speichern' }));

    expect(print).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.kommunikation-skript').textContent).toContain(observation);
    expect(window.localStorage.length).toBe(0);
    expect(window.sessionStorage.length).toBe(0);
  });

  it('completes a new script in memory without restoring or overwriting old browser copies', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('puk-kommunikation-v1', JSON.stringify({ anlass: 'anderes', beobachtung: 'Private old draft' }));
    window.sessionStorage.setItem('puk-kommunikation-v1', JSON.stringify({ beobachtung: 'Old session copy' }));
    render(<TOOL_COMPONENTS.kommunikation onClose={() => {}} onNavigate={() => {}} />);
    await user.click(screen.getByRole('button', { name: /Beginnen/ }));
    expect(screen.getByRole('button', { name: /Weiter/ })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /Ein anderes Anliegen/ }));
    await user.click(screen.getByRole('button', { name: /Weiter/ }));
    expect(screen.getByRole('textbox', { name: 'Was haben Sie konkret beobachtet?' })).toHaveValue('');
    await user.type(screen.getByRole('textbox', { name: 'Was haben Sie konkret beobachtet?' }), 'Current observation');
    await user.click(screen.getByRole('button', { name: /Weiter/ }));
    await user.type(screen.getByRole('textbox', { name: 'Wie geht es Ihnen damit?' }), 'Current feeling');
    await user.click(screen.getByRole('button', { name: /Weiter/ }));
    await user.type(screen.getByRole('textbox', { name: 'Was wäre Ihr Anliegen oder Ihre Bitte?' }), 'Current request');
    await user.click(screen.getByRole('button', { name: 'Skript ansehen →' }));

    expect(screen.getByText('«Current observation»')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Skript kopieren' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('puk-kommunikation-v1')).toContain('Private old draft');
    expect(window.sessionStorage.getItem('puk-kommunikation-v1')).toContain('Old session copy');
  });

  it('lets users delete old drafts immediately without finishing the exercise', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('puk-kommunikation-v1', JSON.stringify({ beobachtung: 'Private old draft' }));
    window.sessionStorage.setItem('puk-kommunikation-v1', JSON.stringify({ beobachtung: 'Old copy' }));
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<TOOL_COMPONENTS.kommunikation onClose={() => {}} onNavigate={() => {}} />);

    await user.click(screen.getByRole('button', { name: 'Entwurf löschen' }));

    expect(window.localStorage.getItem('puk-kommunikation-v1')).toBeNull();
    expect(window.sessionStorage.getItem('puk-kommunikation-v1')).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('Ihre aktuellen Eingaben und frühere Kopien in diesem Browser sind gelöscht.');
    expect(screen.getByRole('heading', { name: 'Worum geht es im Gespräch?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entwurf löschen' })).toBeInTheDocument();
  });
});

describe('personal boundary preparation', () => {
  it('requires an own action for a boundary and exports it only for that occasion', async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    const secureContextDescriptor = Object.getOwnPropertyDescriptor(window, 'isSecureContext');
    Object.defineProperty(window, 'isSecureContext', { configurable: true, value: true });
    try {
      render(<TOOL_COMPONENTS.kommunikation onClose={() => {}} onNavigate={() => {}} />);
      await user.click(screen.getByRole('button', { name: /Beginnen/ }));
      await user.click(screen.getByRole('button', { name: /Ich möchte eine Grenze setzen/ }));
      await user.click(screen.getByRole('button', { name: /Weiter/ }));
      await user.type(screen.getByRole('textbox', { name: 'Was haben Sie konkret beobachtet?' }), 'Im Gespräch wird es laut.');
      await user.click(screen.getByRole('button', { name: /Weiter/ }));
      await user.type(screen.getByRole('textbox', { name: 'Wie geht es Ihnen damit?' }), 'Ich fühle mich angespannt.');
      await user.click(screen.getByRole('button', { name: /Weiter/ }));

      expect(screen.getByRole('button', { name: 'Skript ansehen →' })).toBeDisabled();
      const action = 'Wenn das Gespräch laut wird, gehe ich für heute nach Hause.';
      await user.type(screen.getByRole('textbox', { name: 'Welche eigene Grenze können Sie umsetzen?' }), action);
      await user.click(screen.getByRole('button', { name: 'Skript ansehen →' }));
      expect(screen.getByText(`«${action}»`)).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Skript kopieren' }));
      expect(writeText).toHaveBeenLastCalledWith(expect.stringContaining(action));
      expect(writeText.mock.lastCall[0]).not.toContain('[Ihre Bitte]');

      await user.click(screen.getByRole('button', { name: 'Skript bearbeiten' }));
      await user.click(screen.getByRole('button', { name: /Ein anderes Anliegen/ }));
      for (let step = 0; step < 3; step++) await user.click(screen.getByRole('button', { name: /Weiter/ }));
      expect(screen.queryByRole('textbox', { name: 'Welche eigene Grenze können Sie umsetzen?' })).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Skript ansehen →' }));
      await user.click(screen.getByRole('button', { name: 'Skript kopieren' }));
      expect(writeText.mock.lastCall[0]).not.toContain(action);
      expect(screen.queryByText(`«${action}»`)).not.toBeInTheDocument();
    } finally {
      if (secureContextDescriptor) Object.defineProperty(window, 'isSecureContext', secureContextDescriptor);
      else delete window.isSecureContext;
    }
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
    expect(screen.getByRole('heading', { level: 3, name: 'Erschöpfung' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: /was helfen kann/i }));
    expect(screen.getByText(/Ob für Sie eine Grenze erreicht ist, können diese Werkzeuge nicht messen/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /modul 5 — loyalitätskonflikte/i }));
    expect(onNavigate).toHaveBeenCalledWith('modul5', 's3');
    expect(onClose).toHaveBeenCalled();
  });

  it('supports keyboard activation and navigation in the belastungsverlauf tool', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const onClose = vi.fn();

    render(<TOOL_COMPONENTS.belastungsverlauf onClose={onClose} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: /weitere mögliche verläufe/i }));
    expect(screen.getByText(/erneute erholung/i)).toBeInTheDocument();

    const markerButton = screen.getByRole('button', { name: 'Wiederkehr' });
    markerButton.focus();
    await user.keyboard('{Enter}');
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
    expect(screen.getByRole('tab', { name: /bipolar ii/i })).toHaveAttribute('aria-selected', 'true');
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
  expect(dialog).toHaveTextContent('Die Darstellung kann nicht zeigen, ob gesundheitlich alles in Ordnung ist.');
});

describe('resource reflection comparisons', () => {
  function completeReflection(optionIndices) {
    render(<TOOL_COMPONENTS.saeulen onClose={() => {}} onNavigate={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /beginnen/i }));
    for (const index of optionIndices) {
      fireEvent.click(document.querySelectorAll('.selbsttest-opt')[index]);
    }
    return screen.getByRole('region', { name: 'Einordnung Ihrer Antworten' });
  }

  it('does not single out a strongest or weakest area when all four are equal', () => {
    const reflection = completeReflection([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(reflection).toHaveTextContent('in allen vier Bereichen gleich hoch');
    expect(within(reflection).queryByText('Fachlicher Halt', { exact: true })).not.toBeInTheDocument();
    expect(within(reflection).queryByText('Körper', { exact: true })).not.toBeInTheDocument();
  });

  it('keeps every equally rated area visible in a partial tie', () => {
    const reflection = completeReflection([0, 0, 0, 0, 3, 3, 3, 3]);
    expect(within(reflection).getByText('Eigene Welt, Fachlicher Halt', { exact: true })).toBeInTheDocument();
    expect(within(reflection).getByText('Körper, Beziehungen', { exact: true })).toBeInTheDocument();
    expect(reflection).toHaveTextContent('ihre Reihenfolge ist keine Rangfolge');
  });

  it('identifies unique lower and higher areas from the chosen answers', () => {
    const reflection = completeReflection([0, 0, 1, 1, 3, 3, 2, 2]);
    expect(within(reflection).getByText('Eigene Welt', { exact: true })).toBeInTheDocument();
    expect(within(reflection).getByText('Körper', { exact: true })).toBeInTheDocument();
    expect(within(reflection).queryByText('Fachlicher Halt', { exact: true })).not.toBeInTheDocument();
    expect(within(reflection).queryByText('Beziehungen', { exact: true })).not.toBeInTheDocument();
    expect(reflection).not.toHaveTextContent('gleich hoch');
  });
});
