import React from 'react';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]):not([tabindex="-1"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function revealFocusedField(event) {
  const field = event.target;
  if (!field.matches('input, select, textarea')) return;

  const card = event.currentTarget;
  const fieldRect = field.getBoundingClientRect();
  const visibleHeight = card.clientHeight;
  if (!visibleHeight || fieldRect.height > visibleHeight) return;

  // Native focus can leave a partly visible textarea clipped in a short dialog.
  // Reveal only fitting fields, without scrolling the page or adding motion.
  const top = card.getBoundingClientRect().top + card.clientTop;
  const margin = Math.min(12, (visibleHeight - fieldRect.height) / 2);
  const bottom = top + visibleHeight;
  if (fieldRect.top < top + margin) {
    card.scrollTop += fieldRect.top - top - margin;
  } else if (fieldRect.bottom > bottom - margin) {
    card.scrollTop += fieldRect.bottom - bottom + margin;
  }
}

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
      } else if (!document.querySelector('.tool-overlay-card')?.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    const focusFrame = requestAnimationFrame(() => {
      // A fast interaction may already have focused a step inside the dialog.
      if (document.querySelector('.tool-overlay-card')?.contains(document.activeElement)) return;
      const focusables = getFocusables();
      if (focusables.length > 0) focusables[0].focus();
    });

    return () => {
      cancelAnimationFrame(focusFrame);
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
      <button className={`tool-overlay-bg${printClass}`} onClick={onClose} aria-label="Dialog schliessen" tabIndex={-1}></button>
      <div className={cardCls} onFocus={revealFocusedField}>
        <button className={`tool-close${printClass}`} onClick={onClose} aria-label="Dialog schliessen">×</button>
        {children}
      </div>
    </div>
  );
}

export { ToolOverlay };
