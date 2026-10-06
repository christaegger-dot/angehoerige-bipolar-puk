import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modul1Page } from '../modul1.jsx';
import { Modul2Page } from '../modul2.jsx';
import { Modul3Page } from '../modul3.jsx';
import { Modul4Page } from '../modul4.jsx';
import { Modul5Page } from '../modul5.jsx';
import { Modul6Page } from '../modul6.jsx';
import { Modul7Page } from '../modul7.jsx';
import { useBrowserNavigation } from '../use-browser-navigation.js';

const modules = [Modul1Page, Modul2Page, Modul3Page, Modul4Page, Modul5Page, Modul6Page, Modul7Page];

describe('module contents links', () => {
  it.each(modules.map((Page, index) => [index + 1, Page]))('routes module %s contents through its canonical section link', async (number, Page) => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    window.history.replaceState({}, '', `/module/${number}#s6`);
    const { container } = render(<Page onNavigate={navigate} />);
    const firstSection = container.querySelector(`a[href="/module/${number}#s1"]`);
    expect(firstSection).not.toBeNull();

    await user.click(firstSection);
    expect(navigate).toHaveBeenCalledExactlyOnceWith(`modul${number}`, 's1');
    navigate.mockClear();

    for (const modifier of ['ctrlKey', 'metaKey', 'shiftKey', 'altKey']) {
      // Dispatch returns false if preventDefault swallowed the native action.
      expect(fireEvent.click(firstSection, { button: 0, [modifier]: true })).toBe(true);
      expect(navigate).not.toHaveBeenCalled();
    }
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  it('replaces the stale section hash when a reader selects another section', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/module/4#s6');
    function RoutedModule() {
      const [, navigate] = useBrowserNavigation();
      return <Modul4Page onNavigate={navigate} />;
    }
    const { container } = render(<RoutedModule />);
    await user.click(container.querySelector('a[href="/module/4#s1"]'));
    expect(window.location.pathname + window.location.hash).toBe('/module/4#s1');
  });
});
