import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Modul1Page } from '../modul1.jsx';
import { Modul2Page } from '../modul2.jsx';
import { Modul3Page } from '../modul3.jsx';
import { Modul4Page } from '../modul4.jsx';
import { Modul5Page } from '../modul5.jsx';
import { Modul6Page } from '../modul6.jsx';
import { Modul7Page } from '../modul7.jsx';

const modules = [Modul1Page, Modul2Page, Modul3Page, Modul4Page, Modul5Page, Modul6Page, Modul7Page];

describe('module source transparency', () => {
  it.each(modules.map((Page, index) => [index + 1, Page]))(
    'provides the review scope and limitations for every inline source in module %s',
    (number, Page) => {
      const { container } = render(<Page onNavigate={() => {}} />);
      const sourcePanel = container.querySelector('details.module-credits');
      expect(sourcePanel).not.toBeNull();
      const registeredSources = [...sourcePanel.querySelectorAll('li[data-source-status]')];
      for (const citation of container.querySelectorAll('.evidence-citation a')) {
        const entry = registeredSources.find(source => source.querySelector('a')?.href === citation.href);
        expect(entry, `Module ${number}: no source details for ${citation.textContent}`).toBeDefined();
        expect(entry.querySelector('small').textContent).toContain('Prüfumfang:');
      }
    },
  );
});
