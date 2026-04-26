import { describe, it, expect, afterEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
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

    await user.click(screen.getByRole('button', { name: /hintergrund — schliessen/i }));
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

    const closeButton = screen.getByRole('button', { name: /^schliessen$/i });
    const lastButton = screen.getByRole('button', { name: 'Letztes Feld' });

    closeButton.focus();
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(lastButton).toHaveFocus();

    lastButton.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(closeButton).toHaveFocus();
  });
});
