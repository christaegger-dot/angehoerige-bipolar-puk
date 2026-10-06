import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WerkzeugePage } from '../werkzeuge.jsx';

const LEGACY_KEYS = ['puk-krisenplan-v1', 'puk-kommunikation-v1'];

describe('WerkzeugePage purpose orientation', () => {
  it('offers four purposes with all nine tools, without hiding cards behind filters', async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    const { container } = render(<WerkzeugePage anchor={null} onNavigate={navigate} />);
    const purposeNav = screen.getByRole('navigation', { name: 'Werkzeuge nach Zweck' });
    expect(within(purposeNav).getAllByRole('link')).toHaveLength(4);
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(9);
    expect([...container.querySelectorAll('.tool-card-lg')].map(card => card.id).sort()).toEqual([
      'atem', 'belastungsverlauf', 'ee', 'eisberg', 'kommunikation', 'krisenplan', 'phasenverlauf', 'saeulen', 'selbsttest',
    ]);
    expect(within(screen.getByRole('region', { name: 'Eigene Situation anschauen' })).getByRole('button', { name: /Meine Belastung wahrnehmen/i })).toBeInTheDocument();
    const preparation = within(purposeNav).getByRole('link', { name: 'Gespräche und Absprachen vorbereiten' });
    expect(preparation).toHaveAttribute('href', '/werkzeuge#tools-vorbereiten');
    await user.click(preparation);
    expect(navigate).toHaveBeenCalledWith('werkzeuge', 'tools-vorbereiten');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it.each([
    ['selbsttest', 'Meine Belastung wahrnehmen'],
    ['phasenverlauf', 'Bipolarer Phasenverlauf'],
    ['eisberg', 'Eisberg-Modell'],
    ['krisenplan', 'Krisenplan'],
    ['kommunikation', 'Kommunikations-Trainer'],
    ['saeulen', 'Säulen-Check'],
    ['ee', 'Wenn Belastung Gespräche verändert'],
    ['belastungsverlauf', 'Belastungsverlauf'],
    ['atem', 'Atemübung Durchatmen'],
  ])('keeps the direct tool entry #%s available after grouping', async (anchor, title) => {
    render(<WerkzeugePage anchor={anchor} onNavigate={vi.fn()} />);
    expect(await screen.findByRole('dialog', { name: title })).toBeInTheDocument();
  });
});

function seedLegacyDrafts() {
  for (const storage of [window.localStorage, window.sessionStorage]) {
    LEGACY_KEYS.forEach(key => storage.setItem(key, JSON.stringify({ fixture: 'Old draft' })));
  }
}

function spyOnStorageMethod(storage, method) {
  const owner = Object.hasOwn(storage, method) ? storage : Object.getPrototypeOf(storage);
  return vi.spyOn(owner, method);
}

describe('WerkzeugePage legacy draft deletion', () => {
  it('does not read or write stored drafts when displaying the page', () => {
    seedLegacyDrafts();
    const reads = [spyOnStorageMethod(window.localStorage, 'getItem'), spyOnStorageMethod(window.sessionStorage, 'getItem')];
    const writes = [spyOnStorageMethod(window.localStorage, 'setItem'), spyOnStorageMethod(window.sessionStorage, 'setItem')];

    render(<WerkzeugePage onNavigate={() => {}} />);

    expect(screen.getByRole('button', { name: 'Alte gespeicherte Entwürfe löschen' })).toBeEnabled();
    [...reads, ...writes].forEach(operation => expect(operation).not.toHaveBeenCalled());
    expect(window.localStorage.length).toBe(2);
    expect(window.sessionStorage.length).toBe(2);
  });

  it('keeps both historical drafts when confirmation is declined', async () => {
    const user = userEvent.setup();
    seedLegacyDrafts();
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<WerkzeugePage onNavigate={() => {}} />);

    await user.click(screen.getByRole('button', { name: 'Alte gespeicherte Entwürfe löschen' }));

    for (const storage of [window.localStorage, window.sessionStorage]) {
      LEGACY_KEYS.forEach(key => expect(storage.getItem(key)).toContain('Old draft'));
    }
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('deletes both historical drafts after confirmation and preserves unrelated data', async () => {
    const user = userEvent.setup();
    seedLegacyDrafts();
    window.localStorage.setItem('unrelated-setting', 'keep');
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<WerkzeugePage onNavigate={() => {}} />);

    await user.click(screen.getByRole('button', { name: 'Alte gespeicherte Entwürfe löschen' }));

    for (const storage of [window.localStorage, window.sessionStorage]) {
      LEGACY_KEYS.forEach(key => expect(storage.getItem(key)).toBeNull());
    }
    expect(window.localStorage.getItem('unrelated-setting')).toBe('keep');
    expect(screen.getByRole('status')).toHaveTextContent('Alte Entwürfe in diesem Browser sind gelöscht.');
  });

  it('attempts the other draft and session copies when one persistent copy cannot be deleted', async () => {
    const user = userEvent.setup();
    seedLegacyDrafts();
    const storage = window.localStorage;
    const owner = Object.hasOwn(storage, 'removeItem') ? storage : Object.getPrototypeOf(storage);
    const removeItem = owner.removeItem;
    vi.spyOn(owner, 'removeItem').mockImplementation(function (key) {
      if (this === storage && key === LEGACY_KEYS[0]) throw new DOMException('Storage blocked', 'SecurityError');
      return removeItem.call(this, key);
    });
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<WerkzeugePage onNavigate={() => {}} />);

    await user.click(screen.getByRole('button', { name: 'Alte gespeicherte Entwürfe löschen' }));

    expect(window.localStorage.getItem(LEGACY_KEYS[0])).toContain('Old draft');
    expect(window.localStorage.getItem(LEGACY_KEYS[1])).toBeNull();
    expect(window.sessionStorage.length).toBe(0);
    expect(screen.getByRole('status')).toHaveTextContent('Frühere Kopien in diesem Browser konnten nicht vollständig gelöscht werden.');
    expect(screen.getByRole('status')).not.toHaveTextContent('Alte Entwürfe in diesem Browser sind gelöscht.');
  });

  it('disables the page deletion action while a tool is open and enables it again after closing', async () => {
    const user = userEvent.setup();
    seedLegacyDrafts();
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<WerkzeugePage onNavigate={() => {}} />);
    const deleteOldDrafts = screen.getByRole('button', { name: 'Alte gespeicherte Entwürfe löschen' });

    await user.click(screen.getByRole('button', { name: /Krisenplan öffnen/ }));
    await screen.findByRole('dialog', { name: 'Krisenplan' });
    expect(deleteOldDrafts).toBeDisabled();
    await user.click(deleteOldDrafts);
    expect(confirm).not.toHaveBeenCalled();
    expect(window.localStorage.length).toBe(2);
    expect(window.sessionStorage.length).toBe(2);

    await user.click(screen.getAllByRole('button', { name: 'Dialog schliessen' }).find(button => button.classList.contains('tool-close')));
    expect(deleteOldDrafts).toBeEnabled();
  });
});
