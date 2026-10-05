import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Nav } from '../shared.jsx';

describe('original PUK logo motion', () => {
  afterEach(() => vi.useRealTimers());

  it('stops the supplied looping animation before five seconds', () => {
    vi.useFakeTimers();
    const { container, unmount } = render(<Nav page="start" onNavigate={() => {}} />);
    const logo = container.querySelector('.nav-logo');
    expect(logo).toHaveAttribute('data-logo-animation', 'brief');
    act(() => vi.advanceTimersByTime(4000));
    expect(logo).toHaveAttribute('data-logo-animation', 'stopped');
    expect(logo.querySelector('[data-motion="logo-statisch"]')).toHaveAttribute('src', '/assets/puk/PUK_Logo_statisch_positiv_de.svg');
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
