import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TOOL_COMPONENTS } from '../werkzeuge-tools.jsx';

const originalOffsetParent = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetParent');

function enableFocusableLayout() {
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    configurable: true,
    get() { return this.hidden ? null : document.body; },
  });
}

afterEach(() => {
  vi.useRealTimers();
  if (originalOffsetParent) Object.defineProperty(HTMLElement.prototype, 'offsetParent', originalOffsetParent);
  else delete HTMLElement.prototype.offsetParent;
});

describe('Tool step accessibility', () => {
  it.each([
    ['selbsttest', 5, 'Was Sie gerade beschreiben'],
    ['saeulen', 8, 'Meine Ressourcen'],
  ])('keeps %s questions and results in the keyboard reading order', async (tool, count, resultTitle) => {
    enableFocusableLayout();
    const user = userEvent.setup();
    const Tool = TOOL_COMPONENTS[tool];
    render(<Tool onClose={vi.fn()} onNavigate={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Beginnen →' }));

    for (let question = 0; question < count; question += 1) {
      const heading = within(dialog).getByRole('heading', { level: 2 });
      expect(heading).toHaveFocus();
      const firstAnswer = dialog.querySelector('.selbsttest-opt');
      await user.tab();
      expect(firstAnswer).toHaveFocus();
      await user.keyboard('{Enter}');

      if (question === 0) {
        await user.click(within(dialog).getByRole('button', { name: '← Frage zurück' }));
        expect(within(dialog).getByRole('heading', { level: 2 })).toHaveFocus();
        await user.tab();
        await user.keyboard('{Enter}');
      }
    }

    expect(within(dialog).getByRole('heading', { name: resultTitle })).toHaveFocus();
    await user.click(within(dialog).getByRole('button', { name: 'Fragen erneut ansehen' }));
    expect(within(dialog).getByRole('heading', { level: 2 })).toHaveFocus();
  });

  it('places communication fields after their focused step heading', async () => {
    enableFocusableLayout();
    const user = userEvent.setup();
    const Tool = TOOL_COMPONENTS.kommunikation;
    render(<Tool onClose={vi.fn()} onNavigate={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Beginnen →' }));
    expect(within(dialog).getByRole('heading', { name: 'Worum geht es im Gespräch?' })).toHaveFocus();
    await user.tab();
    expect(dialog.querySelector('.kommunikation-anlass')).toHaveFocus();
    await user.keyboard('{Enter}');

    for (const label of [
      'Was haben Sie konkret beobachtet?',
      'Wie geht es Ihnen damit?',
      'Was wäre Ihr Anliegen oder Ihre Bitte?',
    ]) {
      await user.click(within(dialog).getByRole('button', { name: 'Weiter →' }));
      expect(within(dialog).getByRole('heading', { name: label })).toHaveFocus();
      await user.tab();
      expect(within(dialog).getByRole('textbox', { name: label })).toHaveFocus();
    }
    await user.click(within(dialog).getByRole('button', { name: 'Skript ansehen →' }));
    expect(within(dialog).getByRole('heading', { level: 2 })).toHaveFocus();
    await user.click(within(dialog).getByRole('button', { name: 'Skript bearbeiten' }));
    expect(within(dialog).getByRole('heading', { name: 'Worum geht es im Gespräch?' })).toHaveFocus();
  });

  it('announces breathing phases without moving focus on every timer tick', () => {
    enableFocusableLayout();
    vi.useFakeTimers();
    const Tool = TOOL_COMPONENTS.atem;
    render(<Tool onClose={vi.fn()} />);
    const announcement = screen.getByRole('status');
    expect(announcement).toBeEmptyDOMElement();
    fireEvent.click(screen.getByRole('button', { name: 'Beginnen →' }));
    expect(screen.getByRole('group', { name: 'Geführte Atemübung' })).toHaveFocus();
    expect(screen.getByRole('status')).toBe(announcement);
    expect(screen.getByRole('status')).toHaveTextContent('Einatmen');

    const stopButton = screen.getByRole('button', { name: 'Abbrechen' });
    stopButton.focus();
    act(() => vi.advanceTimersByTime(4000));
    expect(screen.getByRole('status')).toHaveTextContent('Halten');
    expect(stopButton).toHaveFocus();
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole('status')).toHaveTextContent('Ausatmen');
    act(() => vi.advanceTimersByTime(6000));
    expect(screen.getByRole('status')).toHaveTextContent('Pause');
    expect(stopButton).toHaveFocus();

    fireEvent.click(stopButton);
    expect(screen.getByRole('heading', { name: 'Durchatmen' })).toHaveFocus();
  });

  it('keeps iceberg exploration and the selected overview in reading order', async () => {
    enableFocusableLayout();
    const user = userEvent.setup();
    const Tool = TOOL_COMPONENTS.eisberg;
    render(<Tool onClose={vi.fn()} onNavigate={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Eisberg ansehen →' }));
    expect(within(dialog).getByRole('heading', { name: 'Der Eisberg Ihrer Belastung' })).toHaveFocus();
    await user.tab();
    const firstTerm = dialog.querySelector('.eisberg-tool-btn');
    expect(firstTerm).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.click(within(dialog).getByRole('button', { name: 'Trifft auf mich zu' }));
    await user.click(within(dialog).getByRole('button', { name: 'Übersicht ansehen →' }));
    expect(within(dialog).getByRole('heading', { name: 'Ein Begriff wiedererkannt' })).toHaveFocus();
    await user.click(within(dialog).getByRole('button', { name: 'Erneut ansehen' }));
    expect(within(dialog).getByRole('heading', { name: 'Der Eisberg Ihrer Belastung' })).toHaveFocus();
  });

  it.each(['ee', 'phasenverlauf'])('connects %s keyboard tabs to their readable content', async (tool) => {
    enableFocusableLayout();
    const user = userEvent.setup();
    const Tool = TOOL_COMPONENTS[tool];
    render(<Tool onClose={vi.fn()} onNavigate={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    const tabs = within(dialog).getAllByRole('tab');
    const initialContent = within(dialog).getByRole('tabpanel').textContent;
    tabs[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    const panel = within(dialog).getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', tabs[1].id);
    expect(tabs[1]).toHaveAttribute('aria-controls', panel.id);
    expect(panel.textContent).not.toBe(initialContent);
    await user.tab();
    expect(panel).toHaveFocus();
  });
});
