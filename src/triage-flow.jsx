import React from 'react';
import { navHandler, navHref } from './nav-handler.js';

const TRIAGE_RESULTS = {
  'q1b-yes': { label: 'Empfehlung', text: 'Modul 1 — Die bipolare Störung verstehen', target: 'modul1' },
  'q2-yes': { label: 'Empfehlung', text: 'Beratung und Entlastung', target: 'unterstuetzung', secondary: true },
  'q3-yes': { label: 'Empfehlung', text: 'Modul 1 — Grundlagen verstehen', target: 'modul1' },
  'q4-beziehung': { label: 'Empfehlung', text: 'Modul 3 — Wie Beziehungen unter Druck geraten', target: 'modul3' },
  'q4-handeln': { label: 'Empfehlung', text: 'Modul 6 — Was Sie konkret tun können', target: 'modul6' },
  'q4-selbst': { label: 'Empfehlung', text: 'Modul 2 — Die eigene Belastung verstehen', target: 'modul2' },
};

const TRIAGE_STEPS = {
  q1b: {
    progress: 'Frage 1 von bis zu 4',
    question: 'Ist die Diagnose für Sie neu?',
    options: [
      { action: 'q1b-yes', label: 'Ja, die Diagnose ist neu' },
      { action: 'q1b-no', label: 'Nein, schon länger' },
    ],
  },
  q2: {
    progress: 'Frage 2 von bis zu 4',
    question: 'Sind Sie gerade so erschöpft oder überfordert, dass Sie an Ihre Grenzen kommen?',
    options: [
      { action: 'q2-yes', label: 'Ja' },
      { action: 'q2-no', label: 'Nein' },
    ],
  },
  q3: {
    progress: 'Frage 3 von bis zu 4',
    question: 'Möchten Sie vor allem mehr über die Erkrankung erfahren?',
    options: [
      { action: 'q3-yes', label: 'Ja' },
      { action: 'q3-both', label: 'Sowohl als auch' },
      { action: 'q3-no', label: 'Nein, eher Werkzeuge' },
    ],
  },
  q4: {
    progress: 'Frage 4 von bis zu 4',
    question: 'Was steht bei Ihnen gerade am meisten im Vordergrund?',
    options: [
      { action: 'q4-beziehung', label: 'Beziehung, Vertrauen, Nähe' },
      { action: 'q4-handeln', label: 'Konkret handeln, Grenzen, Gespräche' },
      { action: 'q4-selbst', label: 'Verstehen, was mit mir passiert' },
    ],
  },
};

const TRIAGE_NEXT_STEPS = {
  'q1b-no': 'q2',
  'q2-no': 'q3',
  'q3-no': 'q4',
  'q3-both': 'q4',
};

const TRIAGE_STEP_ORDER = ['q1b', 'q2', 'q3', 'q4'];

const TRIAGE_TOOLS = {
  'q4-beziehung': { text: 'Kommunikations-Trainer — ein Gespräch vorbereiten', target: 'werkzeuge', anchor: 'kommunikation' },
  'q4-handeln': { text: 'Kommunikations-Trainer — Anliegen und Grenzen vorbereiten', target: 'werkzeuge', anchor: 'kommunikation' },
  'q4-selbst': { text: 'Meine Belastung wahrnehmen — fünf Reflexionsfragen', target: 'werkzeuge', anchor: 'selbsttest' },
};

function recommendationFor(action, format) {
  const recommendation = TRIAGE_RESULTS[action];
  if (action === 'q1b-yes') {
    return {
      label: 'Passende Einstiege',
      links: [recommendation, TRIAGE_RESULTS['q2-yes']],
      note: 'Wählen Sie, was Sie gerade brauchen: Informationen zur Diagnose oder Beratung und Entlastung für Ihre eigene Situation.',
    };
  }
  const tool = TRIAGE_TOOLS[action];
  if (!tool) return { ...recommendation, links: [recommendation] };

  const links = format === 'both'
    ? [TRIAGE_RESULTS['q3-yes'], tool, recommendation]
    : [tool, recommendation];
  return {
    label: 'Passende Einstiege',
    links,
    note: format === 'both'
      ? 'Hier finden Sie Grundlagen und ein passendes Werkzeug. Wählen Sie, womit Sie beginnen möchten. Das zusätzliche Modul vertieft Ihr Thema.'
      : 'Das Werkzeug lässt sich direkt nutzen. Wenn Sie danach mehr lesen möchten, finden Sie hier auch das passende Modul.',
  };
}

function TriageFlow({ onNavigate }) {
  const [step, setStep] = React.useState('q1b');
  const [result, setResult] = React.useState(null);
  const [answers, setAnswers] = React.useState({});
  const stepRef = React.useRef(null);
  const resultRef = React.useRef(null);
  const isFirstRender = React.useRef(true);

  const handleAction = React.useCallback((action) => {
    const nextAnswers = { ...answers, [step]: action };
    if (answers[step] !== action) {
      for (const laterStep of TRIAGE_STEP_ORDER.slice(TRIAGE_STEP_ORDER.indexOf(step) + 1)) {
        delete nextAnswers[laterStep];
      }
    }
    setAnswers(nextAnswers);

    if (TRIAGE_RESULTS[action]) {
      const format = nextAnswers.q3 === 'q3-both' ? 'both' : 'tools';
      setResult(recommendationFor(action, format));
      return;
    }

    const nextStep = TRIAGE_NEXT_STEPS[action];
    if (nextStep) {
      setStep(nextStep);
    }
  }, [answers, step]);

  const goBack = React.useCallback(() => {
    if (result) {
      setResult(null);
      return;
    }
    const previousStep = TRIAGE_STEP_ORDER[TRIAGE_STEP_ORDER.indexOf(step) - 1];
    if (previousStep) setStep(previousStep);
  }, [result, step]);

  const restart = React.useCallback(() => {
    setResult(null);
    setAnswers({});
    setStep('q1b');
  }, []);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (result && resultRef.current) {
      resultRef.current.focus();
    } else if (!result && stepRef.current) {
      const answerButton = stepRef.current.querySelector('[aria-pressed="true"]')
        || stepRef.current.querySelector('.triage-options button');
      answerButton?.focus();
    }
  }, [step, result, answers]);

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
                aria-pressed={answers[step] === option.action}
                onClick={() => handleAction(option.action)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="triage-controls">
            {step !== 'q1b' && <button type="button" className="triage-restart" onClick={goBack}>Vorherige Frage</button>}
            <button type="button" className="triage-restart" onClick={restart}>Neu beginnen</button>
          </div>
        </div>
      )}

      {result && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="triage-result"
        >
          <span className="triage-result-label">{result.label}</span>
          {result.note && <p>{result.note}</p>}
          {result.links.map(link => (
            <a
              key={`${link.target}-${link.anchor || ''}`}
              className="triage-result-link"
              href={navHref(link.target, link.anchor)}
              onClick={navHandler(link.target, onNavigate, link.anchor)}
            >
              {link.text} →
            </a>
          ))}
          {result.secondary && <p>Sie können sich direkt beraten lassen. Wenn Sie auch etwas zu Ihrer Situation lesen möchten: <a href={navHref('modul4')} onClick={navHandler('modul4', onNavigate)}>Wenn die Kraft nachlässt</a>.</p>}
          <div className="triage-controls">
            <button type="button" className="triage-restart" onClick={goBack}>Antwort ändern</button>
            <button type="button" className="triage-restart" onClick={restart}>Nochmal beantworten</button>
          </div>
        </div>
      )}
    </div>
  );
}

export { TriageFlow };
