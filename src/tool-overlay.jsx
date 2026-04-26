import React from 'react';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useToolOverlay(onClose) {
  React.useEffect(() => {
    const previousFocus = document.activeElement;

    const getFocusables = () => {
      const card = document.querySelector('.tool-overlay-card');
      if (!card) return [];
      return Array.from(card.querySelectorAll(FOCUSABLE_SELECTOR))
        .filter(el => !el.hasAttribute('aria-hidden') && el.offsetParent !== null);
    };

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = getFocusables();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!getFocusables().includes(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const focusables = getFocusables();
      if (focusables.length > 0) focusables[0].focus();
    });

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (previousFocus && typeof previousFocus.focus === 'function' && document.contains(previousFocus)) {
        previousFocus.focus();
      }
    };
  }, [onClose]);
}

function ToolOverlay({ onClose, ariaLabel, cardClass = '', overlayClass = '', noPrint = false, children }) {
  useToolOverlay(onClose);
  const printClass = noPrint ? ' no-print' : '';
  const overlayCls = overlayClass ? `tool-overlay ${overlayClass}` : 'tool-overlay';
  const cardCls = cardClass ? `tool-overlay-card ${cardClass}` : 'tool-overlay-card';
  return (
    <div className={overlayCls} role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <button className={`tool-overlay-bg${printClass}`} onClick={onClose} aria-label="Hintergrund — schliessen" tabIndex={-1}></button>
      <div className={cardCls}>
        <button className={`tool-close${printClass}`} onClick={onClose} aria-label="schliessen">×</button>
        {children}
      </div>
    </div>
  );
}

export { ToolOverlay };
