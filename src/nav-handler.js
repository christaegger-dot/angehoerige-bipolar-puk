// Navigation helper — plain function, not a component.
// Kept separate so react-refresh works correctly for shared.jsx.
export function navHandler(target, onNavigate) {
  return (e) => { e.preventDefault(); onNavigate(target); };
}
