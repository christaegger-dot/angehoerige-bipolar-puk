import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EvidenceSourceList, EvidenceSources } from '../module-guidance.jsx';

describe('research cutoff and source-specific checks', () => {
  it('dates the checked abstract individually while keeping other entries at the research cutoff', () => {
    const { container } = render(<EvidenceSourceList keys={['parentsAfterSuicideCrisis', 'bipolar2']} />);
    const entries = container.querySelectorAll('li');
    expect(entries[0].textContent).toContain('Originalabstract am 6. Oktober 2026 nachgeprüft.');
    expect(entries[0].querySelector('small').textContent).toContain('Einzelprüfung: 6. Oktober 2026');
    expect(entries[1].querySelector('small').textContent).toContain('Recherchebasis: 5. Oktober 2026');
    expect(entries[1].textContent).not.toContain('Einzelprüfung: 6. Oktober 2026');
  });

  it('explains later individual checks without claiming a newer overall research review', () => {
    render(<EvidenceSources number={2} />);
    expect(screen.getByText(/Recherchebasis: 5. Oktober 2026\. Spätere Einzelprüfungen/)).toBeInTheDocument();
  });
});
