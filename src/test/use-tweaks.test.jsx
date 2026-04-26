import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTweaks } from '../use-tweaks.js';

function HookHarness() {
  const [values, setTweak] = useTweaks({ palette: 'cream', heroLayout: 'split' });

  return (
    <>
      <div data-testid="palette">{values.palette}</div>
      <button type="button" onClick={() => setTweak('palette', 'blue')}>Set palette</button>
    </>
  );
}

describe('useTweaks', () => {
  it('updates tweak values and posts edit-mode updates to host', async () => {
    const user = userEvent.setup();
    const postMessageSpy = vi.spyOn(window.parent, 'postMessage').mockImplementation(() => {});

    render(<HookHarness />);

    expect(screen.getByTestId('palette')).toHaveTextContent('cream');

    await user.click(screen.getByRole('button', { name: 'Set palette' }));

    expect(screen.getByTestId('palette')).toHaveTextContent('blue');
    expect(postMessageSpy).toHaveBeenCalledWith(
      { type: '__edit_mode_set_keys', edits: { palette: 'blue' } },
      '*',
    );
  });
});
