// Force actual HTML text enlargement, including fluid vw/clamp headings.
// SVG illustrations have complete HTML text alternatives and are checked
// separately through reflow; this is a test transform, never shipped code.
export async function resizeHtmlText(page, percent) {
  return page.evaluate(percent => {
    const multiplier = percent / 100;
    const text = [...document.querySelectorAll('body, body *')]
      .filter(element => element instanceof HTMLElement)
      .map(element => ({ element, original: Number.parseFloat(getComputedStyle(element).fontSize) }));
    document.documentElement.style.fontSize = `${percent}%`;
    for (const { element, original } of text) element.style.fontSize = `${original * multiplier}px`;
    const measurements = text.filter(({ element }) => element.getClientRects().length)
      .map(({ element, original }) => ({
        expected: original * multiplier,
        actual: Number.parseFloat(getComputedStyle(element).fontSize),
      }));
    return {
      method: 'Each computed HTML font size doubled; root rem geometry enlarged too; SVG text represented by visible HTML alternatives',
      measuredElements: measurements.length,
      failedEnlargements: measurements.filter(({ expected, actual }) => Math.abs(expected - actual) > .1).length,
    };
  }, percent);
}
