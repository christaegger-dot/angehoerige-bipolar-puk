import { describe, it, expect, afterEach, vi } from 'vitest';
import { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToolOverlay } from '../tool-overlay.jsx';

const originalOffsetParent = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetParent');

function enableFocusableLayout() {
  Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
    configurable: true,
    get() {
      return this.hidden ? null : document.body;
    },
  });
}

afterEach(() => {
  if (originalOffsetParent) {
    Object.defineProperty(HTMLElement.prototype, 'offsetParent', originalOffsetParent);
  } else {
    delete HTMLElement.prototype.offsetParent;
  }
});

describe('ToolOverlay', () => {
  it('closes on escape and backdrop click', async () => {
    enableFocusableLayout();
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ToolOverlay onClose={onClose} ariaLabel="Testdialog">
        <button>Aktion</button>
      </ToolOverlay>,
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getAllByRole('button', { name: 'Dialog schliessen' }).find(button => button.classList.contains('tool-overlay-bg')));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('keeps keyboard focus inside the dialog', () => {
    enableFocusableLayout();

    render(
      <>
        <button>Vorher</button>
        <ToolOverlay onClose={() => {}} ariaLabel="Testdialog">
          <button>Erstes Feld</button>
          <button>Letztes Feld</button>
        </ToolOverlay>
      </>,
    );

    const closeButton = screen.getAllByRole('button', { name: 'Dialog schliessen' }).find(button => button.classList.contains('tool-close'));
    const lastButton = screen.getByRole('button', { name: 'Letztes Feld' });

    closeButton.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(lastButton).toHaveFocus();

    lastButton.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(closeButton).toHaveFocus();
  });

  it('keeps a form field in the focus loop and returns focus to its opener on Escape', async () => {
    enableFocusableLayout();
    const user = userEvent.setup();
    function FormDialog() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Plan öffnen</button>
          {open && (
            <ToolOverlay onClose={() => setOpen(false)} ariaLabel="Testplan">
              <label htmlFor="test-plan-notes">Notizen</label>
              <textarea id="test-plan-notes" />
            </ToolOverlay>
          )}
        </>
      );
    }

    render(<FormDialog />);
    const opener = screen.getByRole('button', { name: 'Plan öffnen' });
    await user.click(opener);
    const close = screen.getAllByRole('button', { name: 'Dialog schliessen' })
      .find(button => button.classList.contains('tool-close'));
    await waitFor(() => expect(close).toHaveFocus());
    await user.tab();
    expect(screen.getByRole('textbox', { name: 'Notizen' })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });
});
