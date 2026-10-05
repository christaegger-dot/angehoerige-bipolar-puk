import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomePage } from '../home.jsx';
import { Modul1Page } from '../modul1.jsx';
import { Modul2Page } from '../modul2.jsx';
import { Modul3Page } from '../modul3.jsx';
import { Modul4Page } from '../modul4.jsx';
import { Modul5Page } from '../modul5.jsx';
import { Modul6Page } from '../modul6.jsx';
import { Modul7Page } from '../modul7.jsx';

const FICTION_LABEL = 'Redaktionelles Fallbeispiel (fiktiv)';

describe('sichtbare Kennzeichnung redaktioneller Fallbeispiele', () => {
  it.each([
    [1, Modul1Page, 3],
    [2, Modul2Page, 3],
    [3, Modul3Page, 4],
    [4, Modul4Page, 4],
    [5, Modul5Page, 4],
    [6, Modul6Page, 2],
    [7, Modul7Page, 4],
  ])('kennzeichnet jedes Beispiel in Modul %i ohne erfundene Biografie', (number, Page, count) => {
    const { container } = render(<Page onNavigate={() => {}} />);
    const quotes = container.querySelectorAll('blockquote');

    expect(quotes).toHaveLength(count);
    quotes.forEach(quote => {
      const attribution = quote.querySelector('cite');
      expect(attribution).toBeVisible();
      expect(attribution.textContent).toContain(FICTION_LABEL);
      expect(attribution.textContent).not.toMatch(/anonymisiert|\d+\s*Jahre|seit\s+\d+/i);
      expect(quote.id).toMatch(new RegExp(`^quote-m${number}-\\d{2}$`));
    });
    expect(screen.getByText(/keine dokumentierten Originalzitate von Angehörigen/)).toBeVisible();
  });

  it('ordnet die Startseitengeschichte vor dem Lesen ausdrücklich als fiktiv ein', () => {
    const { container } = render(<HomePage onNavigate={() => {}} />);
    const story = container.querySelector('#quote-start-01');
    const label = screen.getByText(FICTION_LABEL);
    const quote = story.querySelector('.story-quote');
    const attribution = story.querySelector('.story-attribution');

    expect(label).toBeVisible();
    expect(label.compareDocumentPosition(quote) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(attribution).toHaveTextContent('kein dokumentierter Erfahrungsbericht');
    expect(attribution.textContent).not.toMatch(/anonymisiert|\d+|S\.,/i);
  });
});
