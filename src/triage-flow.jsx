import React from 'react';

const TRIAGE_RESULTS = {
  'q1-yes': { label: 'Notfallweg', text: 'Zum Notfallweg', target: 'notfall', urgent: true },
  'q1b-yes': { label: 'Empfehlung', text: 'Modul 1 — Die bipolare Störung verstehen', target: 'modul1' },
  'q2-yes': { label: 'Empfehlung', text: 'Modul 4 — Wenn die Kraft nachlässt', target: 'modul4' },
  'q3-yes': { label: 'Empfehlung', text: 'Modul 1 — Grundlagen verstehen', target: 'modul1' },
  'q4-beziehung': { label: 'Empfehlung', text: 'Modul 3 — Wie Beziehungen unter Druck geraten', target: 'modul3' },
  'q4-handeln': { label: 'Empfehlung', text: 'Modul 6 — Was Sie konkret tun können', target: 'modul6' },
  'q4-selbst': { label: 'Empfehlung', text: 'Modul 2 — Die eigene Belastung verstehen', target: 'modul2' },
};

const TRIAGE_STEPS = {
  q1: {
    progress: 'Frage 1 von bis zu 5',
    question: 'Ist gerade jemand in akuter Gefahr — die erkrankte Person oder Sie selbst?',
    options: [
      { action: 'q1-yes', label: 'Ja oder unklar', variant: 'yes' },
      { action: 'q1-no', label: 'Nein' },
    ],
  },
  q1b: {
    progress: 'Frage 2 von bis zu 5',
    question: 'Haben Sie gerade zum ersten Mal von der Diagnose erfahren?',
    options: [
      { action: 'q1b-yes', label: 'Ja, die Diagnose ist neu' },
      { action: 'q1b-no', label: 'Nein, schon länger' },
    ],
  },
  q2: {
    progress: 'Frage 3 von bis zu 5',
    question: 'Sind Sie selbst gerade am Limit — erschöpft, überfordert, ausgebrannt?',
    options: [
      { action: 'q2-yes', label: 'Ja' },
      { action: 'q2-no', label: 'Nein' },
    ],
  },
  q3: {
    progress: 'Frage 4 von bis zu 5',
    question: 'Brauchen Sie vor allem Grundlagenwissen über die Erkrankung?',
    options: [
      { action: 'q3-yes', label: 'Ja' },
      { action: 'q3-both', label: 'Sowohl als auch' },
      { action: 'q3-no', label: 'Nein, eher Werkzeuge' },
    ],
  },
  q4: {
    progress: 'Frage 5 von bis zu 5',
    question: 'Was steht bei Ihnen gerade am meisten im Vordergrund?',
    options: [
      { action: 'q4-beziehung', label: 'Beziehung, Vertrauen, Nähe' },
      { action: 'q4-handeln', label: 'Konkret handeln, Grenzen, Gespräche' },
      { action: 'q4-selbst', label: 'Verstehen, was mit mir passiert' },
    ],
  },
};

const TRIAGE_NEXT_STEPS = {
  'q1-no': 'q1b',
  'q1b-no': 'q2',
  'q2-no': 'q3',
  'q3-no': 'q4',
  'q3-both': 'q4',
};

function TriageFlow({ onNavigate }) {
  const [step, setStep] = React.useState('q1');
  const [result, setResult] = React.useState(null);
  const stepRef = React.useRef(null);
  const resultRef = React.useRef(null);
  const isFirstRender = React.useRef(true);

  const handleAction = React.useCallback((action) => {
    if (TRIAGE_RESULTS[action]) {
      setResult(TRIAGE_RESULTS[action]);
      return;
    }

    const nextStep = TRIAGE_NEXT_STEPS[action];
    if (nextStep) {
      setStep(nextStep);
    }
  }, []);

  const restart = React.useCallback(() => {
    setResult(null);
    setStep('q1');
  }, []);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (result && resultRef.current) {
      resultRef.current.focus();
    } else if (!result && stepRef.current) {
      const firstButton = stepRef.current.querySelector('button');
      firstButton?.focus();
    }
  }, [step, result]);

  const currentStep = TRIAGE_STEPS[step];

  return (
    <div className="triage-step">
      {!result && currentStep && (
        <div
          ref={stepRef}
          role="group"
          aria-live="polite"
          aria-atomic="true"
          aria-label={currentStep.question}
        >
          <div className="triage-progress">{currentStep.progress}</div>
          <div className="triage-q">{currentStep.question}</div>
          <div className="triage-options" role="group" aria-label="Antwort wählen">
            {currentStep.options.map((option) => (
              <button
                key={option.action}
                type="button"
                className={['triage-opt', option.variant === 'yes' && 'triage-opt-yes'].filter(Boolean).join(' ')}
                onClick={() => handleAction(option.action)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={`triage-result ${result.urgent ? 'triage-result-urgent' : ''}`}
        >
          <span className="triage-result-label">{result.label}</span>
          <a
            className="triage-result-link"
            href={`#${result.target}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(result.target);
            }}
          >
            {result.text} →
          </a>
          <button type="button" className="triage-restart" onClick={restart}>Nochmal beantworten</button>
        </div>
      )}
    </div>
  );
}

export { TriageFlow };
