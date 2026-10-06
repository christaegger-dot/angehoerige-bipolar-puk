import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Nav } from '../shared.jsx';

describe('original static PUK logo', () => {
  it('renders one official logo without an initial GIF request', () => {
    const { container } = render(<Nav page="start" onNavigate={() => {}} />);
    const logos = container.querySelectorAll('.nav-logo img');
    expect(logos).toHaveLength(1);
    expect(logos[0]).toHaveAttribute('src', '/assets/puk/PUK_Logo_statisch_positiv_de.svg');
    expect(container.querySelector('img[src$=".gif"]')).toBeNull();
  });
});
