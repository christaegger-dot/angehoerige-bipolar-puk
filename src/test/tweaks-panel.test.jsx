import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TweaksPanel, TweakRadio, TweakSlider, TweakToggle, TweakNumber } from '../tweaks-panel.jsx';

describe('TweaksPanel protocol behavior', () => {
  it('announces availability, opens on activate message, and dismisses on close', async () => {
    const user = userEvent.setup();
    const postMessageSpy = vi.spyOn(window.parent, 'postMessage').mockImplementation(() => {});

    render(<TweaksPanel title="Editor"><div>Panel content</div></TweaksPanel>);

    expect(postMessageSpy).toHaveBeenCalledWith({ type: '__edit_mode_available' }, '*');
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();

    window.dispatchEvent(new MessageEvent('message', { data: { type: '__activate_edit_mode' } }));
    expect(await screen.findByText('Panel content')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close tweaks' }));

    expect(postMessageSpy).toHaveBeenCalledWith({ type: '__edit_mode_dismissed' }, '*');
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument();
  });
});

describe('Tweaks controls', () => {
  it('converts slider input to number', () => {
    const onChange = vi.fn();
    render(<TweakSlider label="Opacity" value={20} min={0} max={100} onChange={onChange} />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: '42' } });
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it('toggles boolean value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TweakToggle label="Dark mode" value={false} onChange={onChange} />);

    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('clamps number input to min and max', () => {
    const onChange = vi.fn();
    render(<TweakNumber label="Size" value={5} min={0} max={10} onChange={onChange} />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '15' } });
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '-3' } });

    expect(onChange).toHaveBeenNthCalledWith(1, 10);
    expect(onChange).toHaveBeenNthCalledWith(2, 0);
  });

  it('maps pointer position to radio option value', () => {
    const onChange = vi.fn();
    render(
      <TweakRadio
        label="Theme"
        value="a"
        options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }]}
        onChange={onChange}
      />,
    );

    const group = screen.getByRole('radiogroup');
    vi.spyOn(group, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      right: 300,
      width: 300,
      top: 0,
      bottom: 20,
      height: 20,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    fireEvent.pointerDown(group, { clientX: 250 });
    fireEvent.pointerUp(window);

    expect(onChange).toHaveBeenCalledWith('c');
  });
});
