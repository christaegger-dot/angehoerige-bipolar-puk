import React from 'react';
import { Eisberg } from './modul2.jsx';
import { clearStoredDraft } from './storage.js';
import { ToolOverlay } from './tool-overlay.jsx';

// WAI-ARIA-konforme Pfeil-Navigation für role="tablist": ArrowLeft/Right
// wechseln + aktivieren den Nachbartab, Home/End springen an die Enden.
// Voraussetzung: Tab-Buttons haben tabIndex roving (selected=0, sonst -1).
function handleTabKeyDown(e) {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault();
  const tabs = Array.from(e.currentTarget.parentElement.querySelectorAll('[role="tab"]'));
  const i = tabs.indexOf(e.currentTarget);
  const next =
    e.key === 'ArrowRight' ? tabs[(i + 1) % tabs.length] :
    e.key === 'ArrowLeft' ? tabs[(i - 1 + tabs.length) % tabs.length] :
    e.key === 'Home' ? tabs[0] :
    tabs[tabs.length - 1];
  next.focus();
  next.click();
}

const ATEM_PHASEN = [
  { name: 'einatmen', label: 'Einatmen', duration: 4000, scale: 1 },
  { name: 'halten',   label: 'Halten',   duration: 2000, scale: 1 },
  { name: 'ausatmen', label: 'Ausatmen', duration: 6000, scale: 0.4 },
  { name: 'pause',    label: '',         duration: 2000, scale: 0.4 },
];
const ATEM_ZYKLEN = 5;

function AtemuebungTool({ onClose }) {
  const [phase, setPhase] = React.useState('intro'); // intro | einatmen | halten | ausatmen | pause | done
  const [zyklus, setZyklus] = React.useState(0);

  React.useEffect(() => {
    if (phase === 'intro' || phase === 'done') return;
    const idx = ATEM_PHASEN.findIndex(p => p.name === phase);
    const t = setTimeout(() => {
      if (idx === ATEM_PHASEN.length - 1) {
        if (zyklus + 1 >= ATEM_ZYKLEN) setPhase('done');
        else { setZyklus(z => z + 1); setPhase(ATEM_PHASEN[0].name); }
      } else {
        setPhase(ATEM_PHASEN[idx + 1].name);
      }
    }, ATEM_PHASEN[idx].duration);
    return () => clearTimeout(t);
  }, [phase, zyklus]);


  const start = () => { setZyklus(0); setPhase('einatmen'); };
  const stop  = () => { setPhase('intro'); setZyklus(0); };

  const aktiv = ATEM_PHASEN.find(p => p.name === phase);
  const scale = aktiv ? aktiv.scale : 0.4;
  const dur   = aktiv ? aktiv.duration : 0;
  const label = aktiv ? aktiv.label : '';

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Atemübung Durchatmen">
      <span className="kicker">Werkzeug · Pause</span>

        {phase === 'intro' && (
          <>
            <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Durchatmen</h2>
            <p className="lede" style={{ maxWidth: '40ch' }}>Wenn der Moment gerade zu viel ist. Fünf geführte Atemzüge als freiwillige Pause. Passen Sie die Atmung an das an, was sich angenehm anfühlt.</p>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '40ch' }}>Einatmen 4 · Halten 2 · Ausatmen 6 · Pause 2. Wiederholt sich fünf Mal, etwa 70 Sekunden. Atemhalten ist optional. Bei Unwohlsein stoppen und normal weiteratmen. Alternativ: den Bodenkontakt spüren und drei Dinge im Raum betrachten.</p>
            <div style={{ marginTop: 24 }}>
              <button className="btn btn-primary" onClick={start}>Beginnen →</button>
            </div>
          </>
        )}

        {(phase !== 'intro' && phase !== 'done') && (
          <>
            <div className="atem-stage">
              <div
                className={`atem-circle atem-${phase}`}
                style={{
                  transform: `scale(${scale})`,
                  transitionDuration: `${dur}ms`,
                }}
              />
              <div className="atem-label">{label}</div>
            </div>
            <div className="atem-meta">Atemzug {Math.min(zyklus + 1, ATEM_ZYKLEN)} von {ATEM_ZYKLEN}</div>
            <button className="tool-quiet-btn" onClick={stop}>abbrechen</button>
          </>
        )}

        {phase === 'done' && (
          <>
            <div className="atem-stage atem-done">
              <div className="atem-circle" style={{ transform: 'scale(0.7)' }} />
              <div className="atem-label">fertig.</div>
            </div>
            <p className="lede" style={{ maxWidth: '36ch', textAlign: 'center', margin: '0 auto 24px' }}>Wenn es noch einmal sein soll, gerne. Ihre Pause wartet.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={start}>Nochmal</button>
              <button className="tool-quiet-btn" onClick={onClose}>schliessen</button>
            </div>
          </>
        )}
    </ToolOverlay>
  );
}

const SELBSTTEST_FRAGEN = [
  {
    q: 'Wie ist Ihr Schlaf in den letzten zwei Wochen?',
    opts: [
      { label: 'Erholsam, ich schlafe meistens gut durch' },
      { label: 'Meist okay, aber mit unruhigen Nächten' },
      { label: 'Oberflächlich — ich werde oft wach' },
      { label: 'Gestört — ich liege wach oder kann nicht abschalten' },
    ],
  },
  {
    q: 'Wie geht es Ihnen mit dem täglichen Funktionieren?',
    opts: [
      { label: 'Ich habe Energie für mehr als das Nötigste' },
      { label: 'Ich schaffe, was ansteht — manchmal mit Mühe' },
      { label: 'Ich funktioniere, fühle aber wenig' },
      { label: 'Ich komme kaum noch durch den Tag' },
    ],
  },
  {
    q: 'Wie ist Ihr Kontakt zu Menschen ausserhalb der Erkrankung?',
    opts: [
      { label: 'Regelmässig — ich pflege eigene Kontakte' },
      { label: 'Reduziert, aber noch da' },
      { label: 'Stark zurückgegangen' },
      { label: 'Ich bin meist allein damit' },
    ],
  },
  {
    q: 'Wenn jemand fragt «Wie geht es Ihnen?» — welche Antwort liegt am nächsten?',
    opts: [
      { label: 'Ich kann ehrlich antworten' },
      { label: 'Ich antworte automatisch «gut»' },
      { label: 'Ich weiss nicht mehr, wie es mir wirklich geht' },
      { label: 'Mir fällt die Frage zunehmend schwer' },
    ],
  },
  {
    q: 'In den letzten Wochen — wie geht es Ihnen innerlich?',
    opts: [
      { label: 'Belastet, aber im Gleichgewicht' },
      { label: 'Wechselhaft — gute und schwere Tage' },
      { label: 'Erschöpft, dünnhäutig, gereizt' },
      { label: 'Leer, abgestumpft oder ständig in Alarm' },
    ],
  },
];

function SelbsttestTool({ onClose, onNavigate }) {
  const [phase, setPhase] = React.useState('intro');
  const [answers, setAnswers] = React.useState([]);
  const start = () => { setAnswers([]); setPhase('running'); };
  const answer = (optionIndex) => {
    const next = [...answers, optionIndex];
    setAnswers(next);
    if (next.length === SELBSTTEST_FRAGEN.length) setPhase('result');
  };
  const goto = (target, anchor) => { onClose(); onNavigate(target, anchor); };
  const qIdx = answers.length;
  const alltagSehrSchwer = answers[1] === 3;

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Meine Belastung wahrnehmen" cardClass="selbsttest-card">
      <span className="kicker">Werkzeug · Persönliche Reflexion</span>
      {phase === 'intro' && (
        <>
          <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Meine Belastung wahrnehmen</h2>
          <p className="lede" style={{ maxWidth: '44ch' }}>Fünf Fragen zu Schlaf, Alltag, Kontakten und Befinden. Sie sehen danach Ihre eigenen Antworten und können überlegen, welche Unterstützung Sie brauchen.</p>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '44ch' }}>Diese Fragen sind kein validierter Test. Es gibt keine Gesamtpunktzahl, Diagnose oder Risikoeinstufung. Ihre Antworten bleiben während der Nutzung im Browser und werden nicht gespeichert.</p>
          <div style={{ marginTop: 24 }}><button className="btn btn-primary" onClick={start}>Beginnen →</button></div>
        </>
      )}
      {phase === 'running' && (
        <div className="selbsttest-q-block">
          <div className="selbsttest-progress">
            Frage {qIdx + 1} von {SELBSTTEST_FRAGEN.length}
            <span className="selbsttest-progress-bar"><span style={{ width: `${(qIdx / SELBSTTEST_FRAGEN.length) * 100}%` }} /></span>
          </div>
          <div className="selbsttest-q">{SELBSTTEST_FRAGEN[qIdx].q}</div>
          <div className="selbsttest-options">
            {SELBSTTEST_FRAGEN[qIdx].opts.map((option, index) => (
              <button key={option.label} className="selbsttest-opt" onClick={() => answer(index)}>{option.label}</button>
            ))}
          </div>
          {answers.length > 0 && <button className="tool-quiet-btn" onClick={() => setAnswers(answers.slice(0, -1))}>← Frage zurück</button>}
        </div>
      )}
      {phase === 'result' && (
        <div className="selbsttest-result">
          <h2>Was Sie gerade beschreiben</h2>
          <p>Ihre Antworten stehen nebeneinander. Eine gute Erfahrung in einem Bereich hebt eine Belastung in einem anderen nicht auf.</p>
          <dl>
            {SELBSTTEST_FRAGEN.map((question, index) => (
              <React.Fragment key={question.q}>
                <dt><strong>{question.q}</strong></dt>
                <dd style={{ margin: '4px 0 20px' }}>{question.opts[answers[index]].label}</dd>
              </React.Fragment>
            ))}
          </dl>
          {alltagSehrSchwer && (
            <aside className="callout" role="status">
              <span className="callout-label">Wenn der Alltag kaum noch gelingt</span>
              <p>Sie beschreiben, dass Ihnen der Alltag derzeit sehr schwerfällt. Holen Sie möglichst zeitnah Unterstützung: bei Ihrer Hausärztin, Ihrem Hausarzt oder einer Beratungsstelle. Welche Aufgabe könnte heute jemand übernehmen?</p>
            </aside>
          )}
          <p className="selbsttest-body">Was fällt Ihnen besonders auf? Was tut Ihnen gut, was fehlt? Sie dürfen Beratung nutzen, auch wenn vieles noch gelingt. Bei anhaltenden Schlafproblemen, Erschöpfung oder anderen Beschwerden ist eine fachliche Abklärung sinnvoll.</p>
          <div className="selbsttest-phone">
            <a href="tel:+41583843800" className="selbsttest-phone-num">058 384 38 00</a>
            <span className="selbsttest-phone-label">Fachstelle Angehörigenarbeit PUK · werktags · kostenlos</span>
          </div>
          <div className="selbsttest-actions">
            <button className="btn btn-primary" onClick={() => goto('unterstuetzung')}>Unterstützung und Ressourcen →</button>
            <button className="selbsttest-secondary" onClick={() => goto('modul4', 's7')}>Mögliche Entlastungsschritte →</button>
          </div>
          <div className="selbsttest-foot">
            <button className="tool-quiet-btn" onClick={start}>Fragen erneut ansehen</button>
            <button className="tool-quiet-btn" onClick={onClose}>schliessen</button>
          </div>
        </div>
      )}
    </ToolOverlay>
  );
}

const KRISENPLAN_FELDER = [
  {
    id: 'name',
    label: 'Plan für',
    sub: 'Name oder Initialen — optional, bleibt nur in Ihrem Browser.',
    placeholder: 'z.B. M. & Christine',
    kind: 'input',
  },
  {
    id: 'fruehzeichen',
    label: 'Frühwarnzeichen',
    sub: 'Drei bis fünf persönliche Veränderungen, die vor einer Episode auftreten können. Gemeinsam, bei Bedarf mit dem Behandlungsteam, besprechen.',
    placeholder: 'z.B.\n— deutlich weniger Schlaf als für die Person üblich\n— auffällig viele neue Pläne\n— Geldausgaben verändern sich\n— Reizbarkeit, Rückzug',
    kind: 'textarea',
    rows: 5,
  },
  {
    id: 'schritte',
    label: 'Erste Schritte bei Verschlechterung',
    sub: 'Welche Reihenfolge und Dringlichkeit haben wir gemeinsam mit dem Behandlungsteam besprochen?',
    placeholder: 'z.B.\n1. Vereinbarte Ansprechperson im Behandlungsteam kontaktieren\n2. Nächste Schritte gemeinsam fachlich klären\n3. Abgesprochene Unterstützung mit der erkrankten Person nutzen\n4. Vereinbarten Ausweichkontakt und besprochenes Vorgehen nutzen',
    kind: 'textarea',
    rows: 5,
  },
  {
    id: 'kontakte',
    label: 'Vertrauenspersonen & Behandlungsteam',
    sub: 'Mit Namen und Telefonnummern. Im Voraus festgehalten — nicht erst suchen müssen.',
    placeholder: 'z.B.\nSchwester Anna — 079 ... \nHausärztin Dr. ... — 044 ...\nPsychiaterin Dr. ... — 044 ...',
    kind: 'textarea',
    rows: 4,
  },
  {
    id: 'klinik',
    label: 'Klinikwunsch (falls stationär nötig)',
    sub: 'Welche Klinik bevorzugt die erkrankte Person, und welche Ansprechperson wurde gemeinsam vereinbart? Ein Wunsch garantiert keine Aufnahme.',
    placeholder: 'z.B. bevorzugte Klinik / vereinbarte Ansprechperson im Behandlungsteam',
    kind: 'textarea',
    rows: 2,
  },
  {
    id: 'hilft',
    label: 'Was hilft',
    sub: 'In der akuten Phase, gemeinsam in stabiler Phase abgesprochen.',
    placeholder: 'z.B.\n— ruhige Stimme, kein Streiten\n— gemeinsame Mahlzeiten\n— feste Bettzeiten\n— Reize reduzieren (TV aus, weniger Menschen)',
    kind: 'textarea',
    rows: 4,
  },
  {
    id: 'nichthilft',
    label: 'Was nicht hilft',
    sub: 'Auch wenn es gut gemeint ist — was wir bewusst lassen.',
    placeholder: 'z.B.\n— lange Diskussionen über die Wahrnehmung\n— Vorhaltungen, Schuldzuweisungen\n— Schweigen aus Angst\n— unklare Zuständigkeiten',
    kind: 'textarea',
    rows: 4,
  },
  { id: 'ausweichkontakt', label: 'Wenn niemand erreichbar ist', sub: 'Welcher vereinbarte Kontakt und welches besprochene Vorgehen gelten, wenn niemand erreichbar ist oder der Plan nicht zur Lage passt?', placeholder: 'Vereinbarter Ausweichkontakt / besprochenes Vorgehen / wer kann übernehmen?', kind: 'textarea', rows: 3 },
  { id: 'betreuung', label: 'Kinder und eigene Entlastung', sub: 'Wer betreut Kinder oder andere abhängige Personen? Wer übernimmt, wenn ich nicht begleiten kann?', placeholder: 'Betreuung: Name / Telefon / sicherer Ort. Meine Unterstützung: Name / Telefon.', kind: 'textarea', rows: 3 },
  { id: 'geprueft', label: 'Gemeinsam geprüft am', sub: 'Datum und nächster Überprüfungstermin. Eine private Absprache ersetzt keine rechtliche Vertretungsbefugnis.', placeholder: 'Datum / wer war dabei / erneut prüfen am', kind: 'input' },
];

const KRISENPLAN_STORAGE_KEY = 'puk-krisenplan-v1';

function KrisenplanTool({ onClose, onNavigate }) {
  const [data, setData] = React.useState({});
  const [deletionHint, setDeletionHint] = React.useState('');

  const update = (id, value) => {
    const next = { ...data, [id]: value, _updated: new Date().toISOString() };
    setData(next);
    setDeletionHint('');
  };

  const reset = () => {
    if (window.confirm('Krisenplan löschen? Aktuelle Eingaben und früher gespeicherte Browser-Kopien werden entfernt. Ausdrucke und PDF-Dateien bleiben erhalten.')) {
      setData({});
      const cleared = clearStoredDraft(KRISENPLAN_STORAGE_KEY);
      setDeletionHint(cleared ? 'Aktuelle Eingaben und frühere Browser-Kopien gelöscht.' : 'Die Eingaben sind hier entfernt. Frühere Browser-Kopien konnten nicht vollständig gelöscht werden. Löschen Sie die Website-Daten in Ihren Browser-Einstellungen.');
    }
  };

  const lastUpdate = data._updated
    ? new Date(data._updated).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null;

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Krisenplan" overlayClass="krisenplan-overlay" cardClass="krisenplan-card" noPrint={true}>
        <header className="krisenplan-head">
          <span className="kicker">Werkzeug · Krisenplan</span>
          <h2>Krisenplan</h2>
          <p className="krisenplan-intro">Füllen Sie den Plan in einer ruhigen Phase aus. In einer Krise kann er Ihnen helfen, nächste Schritte und passende Kontakte zu finden. Er ersetzt keine fachliche Einschätzung. Holen Sie bei Unsicherheit professionelle Unterstützung.</p>
          <p>Dies ist die vollständige gemeinsame Vorlage. Besprechen Sie beim Ausfüllen, welche Aufgaben gewünscht und tragbar sind, was fachlich geklärt werden muss und wann Sie die Absprachen erneut prüfen.</p>
          <button className="tool-quiet-btn no-print" onClick={() => { onClose(); onNavigate('modul6', 's2'); }}>Plan gemeinsam vorbereiten · Modul 6 →</button>
          <div className="tool-intro-notes krisenplan-intro-notes" data-storage-key={KRISENPLAN_STORAGE_KEY}>
            <p data-storage-notice="memory-only">Ihre Eingaben können persönliche Gesundheits- und Kontaktdaten enthalten. Sie werden nicht automatisch gespeichert oder versendet. Beim Schliessen des Werkzeugs oder Neuladen der Seite gehen sie verloren. Sichern Sie den ausgefüllten Plan bei Bedarf vor dem Schliessen.</p>
            <p data-storage-notice="legacy-deletion">Entwürfe aus früheren Versionen werden nicht wieder geöffnet. Mit «Entwurf löschen» können Sie aktuelle Eingaben und frühere Browser-Kopien dieses Werkzeugs entfernen.</p>
            <p data-export-notice="print-pdf">Drucke und PDF-Dateien sind zusätzliche Kopien, die Sie separat löschen müssen. Auf gemeinsam genutzten Geräten schliessen Sie nach der Nutzung auch andere offene Tabs mit persönlichen Eingaben.</p>
          </div>
          {lastUpdate && (
            <p className="krisenplan-meta">Zuletzt bearbeitet: {lastUpdate}</p>
          )}
        </header>

        <div className="krisenplan-fields" data-sensitive-content="true" data-storage-key={KRISENPLAN_STORAGE_KEY}>
          {KRISENPLAN_FELDER.map((f) => (
            <div className="krisenplan-feld" key={f.id}>
              <label htmlFor={`kp-${f.id}`} className="krisenplan-label">
                <span className="krisenplan-label-main">{f.label}</span>
                <span className="krisenplan-label-sub">{f.sub}</span>
              </label>
              {f.kind === 'input' ? (
                <input
                  id={`kp-${f.id}`}
                  type="text"
                  className="krisenplan-input"
                  value={data[f.id] || ''}
                  onChange={(e) => update(f.id, e.target.value)}
                  placeholder={f.placeholder}
                />
              ) : (
                <textarea
                  id={`kp-${f.id}`}
                  className="krisenplan-textarea"
                  rows={f.rows || 4}
                  value={data[f.id] || ''}
                  onChange={(e) => update(f.id, e.target.value)}
                  placeholder={f.placeholder}
                />
              )}
            </div>
          ))}
        </div>

        <p>Beratung für Angehörige: Fachstelle Angehörigenarbeit PUK · <a href="tel:+41583843800">058 384 38 00</a> · werktags.</p>

        <div className="krisenplan-actions no-print">
          <div className="krisenplan-actions-left">
            <button className="btn btn-primary" onClick={() => window.print()} data-data-export="print-pdf" data-storage-key={KRISENPLAN_STORAGE_KEY}>Drucken / als PDF speichern</button>
            <button className="tool-quiet-btn" onClick={reset} data-storage-delete={KRISENPLAN_STORAGE_KEY} data-storage-scope="session local">Entwurf löschen</button>
          </div>
          <div className="krisenplan-saved" role="status" aria-live="polite">{deletionHint}</div>
        </div>

        <p className="krisenplan-disclaimer no-print">
          Dieser Plan ersetzt keine professionelle Beratung.
        </p>
    </ToolOverlay>
  );
}

const SAEULEN_DEF = [
  {
    key: 'koerper',
    label: 'Körper',
    sub: 'Schlaf · Bewegung · Pausen',
    questions: [
      {
        q: 'Wie ist Ihr Schlaf in den letzten zwei Wochen?',
        opts: [
          { label: 'Erholsam — meist gut durchgeschlafen', score: 3 },
          { label: 'Meist okay, aber mit unruhigen Nächten', score: 2 },
          { label: 'Oberflächlich — ich werde oft wach', score: 1 },
          { label: 'Gestört — kaum Erholung', score: 0 },
        ],
      },
      {
        q: 'Wie viel Bewegung oder Pause haben Sie diese Woche bekommen?',
        opts: [
          { label: 'Regelmässig — bewusst eingeplant', score: 3 },
          { label: 'Etwas — wenn es sich ergeben hat', score: 2 },
          { label: 'Wenig — meist nur das Nötigste', score: 1 },
          { label: 'Gar nicht', score: 0 },
        ],
      },
    ],
  },
  {
    key: 'beziehungen',
    label: 'Beziehungen',
    sub: 'ausserhalb der Erkrankung',
    questions: [
      {
        q: 'Wie regelmässig haben Sie Kontakt zu Menschen ausserhalb der Erkrankung?',
        opts: [
          { label: 'Mehrfach pro Woche', score: 3 },
          { label: 'Wöchentlich', score: 2 },
          { label: 'Alle paar Wochen', score: 1 },
          { label: 'Kaum noch', score: 0 },
        ],
      },
      {
        q: 'Gibt es jemanden, mit dem Sie auch über Schweres sprechen können?',
        opts: [
          { label: 'Ja, mehrere Personen', score: 3 },
          { label: 'Eine Person', score: 2 },
          { label: 'Eher nicht — ich behalte vieles für mich', score: 1 },
          { label: 'Niemand', score: 0 },
        ],
      },
    ],
  },
  {
    key: 'eigeneWelt',
    label: 'Eigene Welt',
    sub: 'Tätigkeit · Räume · Interessen',
    questions: [
      {
        q: 'Haben Sie Aktivitäten, die nichts mit der Erkrankung zu tun haben?',
        opts: [
          { label: 'Ja, regelmässig', score: 3 },
          { label: 'Manchmal', score: 2 },
          { label: 'Selten', score: 1 },
          { label: 'Kaum bis gar nicht', score: 0 },
        ],
      },
      {
        q: 'Gibt es eine Zeit oder einen Ort, der nur Ihnen gehört?',
        opts: [
          { label: 'Ja, fest verankert', score: 3 },
          { label: 'Manchmal — wenn ich es schaffe', score: 2 },
          { label: 'Selten', score: 1 },
          { label: 'Nicht wirklich', score: 0 },
        ],
      },
    ],
  },
  {
    key: 'fachlich',
    label: 'Fachlicher Halt',
    sub: 'Beratung · Therapie · Selbsthilfe',
    questions: [
      {
        q: 'Ist passende Unterstützung für Ihre eigenen Anliegen erreichbar und für Sie ausreichend?',
        opts: [
          { label: 'Ja, erreichbar und ausreichend — bei Bedarf', score: 3 },
          { label: 'Teilweise — ich wünsche mir mehr Unterstützung', score: 2 },
          { label: 'Ich bin unsicher, welche Hilfe passen würde', score: 1 },
          { label: 'Keine passende Hilfe erreichbar', score: 0 },
        ],
      },
      {
        q: 'Kennen Sie eine Anlaufstelle, an die Sie sich bei Bedarf wenden würden?',
        opts: [
          { label: 'Ja, ich weiss wohin', score: 3 },
          { label: 'Vage — ich müsste suchen', score: 2 },
          { label: 'Eher nicht', score: 1 },
          { label: 'Nein, ich kenne noch keine passende Anlaufstelle', score: 0 },
        ],
      },
    ],
  },
];

// Hoist: alle Fragen einmal flatten, statt per Render.
const SAEULEN_ALL_QUESTIONS = SAEULEN_DEF.flatMap((s) =>
  s.questions.map((q) => ({ saeule: s.key, ...q }))
);
const SAEULEN_BY_KEY = Object.fromEntries(SAEULEN_DEF.map((s) => [s.key, s]));

function SaeulenCheckTool({ onClose, onNavigate }) {
  const [phase, setPhase] = React.useState('intro'); // intro | running | result
  const [answers, setAnswers] = React.useState([]); // flat array of scores


  const start  = () => { setAnswers([]); setPhase('running'); };
  const answer = (score) => {
    const next = [...answers, score];
    setAnswers(next);
    if (next.length === SAEULEN_ALL_QUESTIONS.length) setPhase('result');
  };
  const back   = () => setAnswers(answers.slice(0, -1));

  const qIdx = answers.length;
  const cur  = SAEULEN_ALL_QUESTIONS[qIdx];
  const curSaeule = cur && SAEULEN_BY_KEY[cur.saeule];

  // Pillar scores nur in der Ergebnisphase berechnen.
  let saeuleScores = null, leastRoom = [], mostRoom = [];
  if (phase === 'result') {
    saeuleScores = SAEULEN_DEF.map((s) => {
      const total = answers.reduce(
        (sum, score, i) => SAEULEN_ALL_QUESTIONS[i].saeule === s.key ? sum + score : sum,
        0
      );
      return { ...s, score: total, max: s.questions.length * 3 };
    });
    const proportions = saeuleScores.map(s => s.score / s.max);
    const minimum = Math.min(...proportions);
    const maximum = Math.max(...proportions);
    leastRoom = saeuleScores.filter(s => s.score / s.max === minimum);
    mostRoom = saeuleScores.filter(s => s.score / s.max === maximum);
  }

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Säulen-Check" cardClass="selbsttest-card">
      <span className="kicker">Werkzeug · Säulen-Check</span>

        {phase === 'intro' && (
          <>
            <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Säulen-Check</h2>
            <p className="lede" style={{ maxWidth: '44ch' }}>Acht kurze Fragen zu Ihren Ressourcen in vier Bereichen: Körper, Beziehungen, eigene Welt, fachlicher Halt. Die Darstellung fasst Ihre eigenen Einschätzungen zusammen. Sie können überlegen, was Sie bewahren möchten und wo Sie Unterstützung wünschen. Sie misst keine gesundheitliche Stabilität oder Tragfähigkeit.</p>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '44ch' }}>Etwa drei Minuten. Anonym, im Browser. Eine persönliche Reflexion ohne validierte klinische Auswertung oder Diagnose. Bei starkem oder anhaltendem Unterstützungsbedarf ist fachliche Beratung sinnvoll.</p>
            <div style={{ marginTop: 24 }}>
              <button className="btn btn-primary" onClick={start}>Beginnen →</button>
            </div>
          </>
        )}

        {phase === 'running' && cur && (
          <div className="selbsttest-q-block">
            <div className="selbsttest-progress">
              <span style={{ color: 'var(--accent)' }}>Säule · {curSaeule.label}</span>
              <span style={{ color: 'var(--ink-mute)', fontSize: '0.72rem' }}>Frage {qIdx + 1} von {SAEULEN_ALL_QUESTIONS.length}</span>
              <span className="selbsttest-progress-bar"><span style={{ width: `${(qIdx / SAEULEN_ALL_QUESTIONS.length) * 100}%` }}></span></span>
            </div>
            <div className="selbsttest-q">{cur.q}</div>
            <div className="selbsttest-options">
              {cur.opts.map((o, i) => (
                <button key={i} className="selbsttest-opt" onClick={() => answer(o.score)}>
                  {o.label}
                </button>
              ))}
            </div>
            {answers.length > 0 && (
              <button className="tool-quiet-btn" onClick={back}>← Frage zurück</button>
            )}
          </div>
        )}

        {phase === 'result' && (
          <div className="selbsttest-result">
            <div className="selbsttest-zone">
              <span className="selbsttest-zone-kicker">Ihre Einschätzungen jetzt</span>
              <h2>Meine Ressourcen</h2>
              <p className="selbsttest-zone-sub">Die Höhe fasst Ihre Antworten schematisch zusammen. Sie ist kein gemessener Wert Ihrer Belastbarkeit.</p>
            </div>

            <div className="saeulen-result">
              {saeuleScores.map((s) => {
                const pct = (s.score / s.max) * 100;
                return (
                  <div className="saeulen-result-col" key={s.key}>
                    <div className="saeulen-result-bar-wrap">
                      <div className="saeulen-result-bar" style={{ height: `${Math.max(pct, 6)}%` }}></div>
                    </div>
                    <div className="saeulen-result-label">{s.label}</div>
                    <div className="saeulen-result-score">{s.score}/{s.max}</div>
                  </div>
                );
              })}
            </div>

            <section aria-label="Einordnung Ihrer Antworten">
              <p className="selbsttest-body">
                {leastRoom.length === SAEULEN_DEF.length ? (
                  <>Ihre Einschätzungen sind in allen vier Bereichen gleich hoch. Es gibt keine stärkste oder schwächste Säule. Welchen Bereich möchten Sie näher anschauen?</>
                ) : (
                  <>
                    Weniger Raum zeigen Ihre Antworten für <strong style={{ color: 'var(--accent)' }}>{leastRoom.map(s => s.label).join(', ')}</strong>. Besonders viel Raum zeigen sie für <strong style={{ color: 'var(--accent)' }}>{mostRoom.map(s => s.label).join(', ')}</strong>.
                    {(leastRoom.length > 1 || mostRoom.length > 1) && <> Gleich hoch eingeschätzte Bereiche stehen nebeneinander; ihre Reihenfolge ist keine Rangfolge.</>}
                    {' '}Was möchten Sie bewahren, und wo wünschen Sie sich Unterstützung? Sie entscheiden, welcher Bereich für Sie gerade wichtig ist.
                  </>
                )}
              </p>
              <p className="selbsttest-body">Kleine Schritte können helfen; bei starker oder anhaltender Belastung braucht es möglicherweise mehr Entlastung und fachliche Hilfe. Diese Darstellung gibt keine gesundheitliche Entwarnung.</p>
            </section>

            <div className="selbsttest-actions">
              <button className="btn btn-primary" onClick={() => { onClose(); onNavigate('modul7', 's4'); }}>
                Modul 7 — Langfristige Tragfähigkeit →
              </button>
              <button className="selbsttest-secondary" onClick={() => { onClose(); onNavigate('unterstuetzung'); }}>
                Unterstützung und Ressourcen →
              </button>
            </div>

            <div className="selbsttest-foot">
              <button className="tool-quiet-btn" onClick={start}>Fragen erneut ansehen</button>
              <button className="tool-quiet-btn" onClick={onClose}>schliessen</button>
            </div>
          </div>
        )}
    </ToolOverlay>
  );
}

const EISBERG_LABELS = {
  oben: [
    {
      key: 'sorge',
      label: 'Sorge',
      kind: 'primary',
      x: 50, y: 18,
      desc: 'Ihre Aufmerksamkeit, Ihr Mitgefühl, das Fragen wie es geht. Andere sehen das oft als Stärke — und übersehen, was es kostet.',
    },
    {
      key: 'geduld',
      label: 'Geduld',
      kind: 'tertiary',
      x: 72, y: 28,
      desc: 'Nicht sofort reagieren, eine Viertelstunde durchatmen, einen Streit nicht eskalieren lassen. Geduld kostet Energie — nicht weniger, weil sie still ist.',
    },
    {
      key: 'hilfsbereitschaft',
      label: 'Hilfsbereitschaft',
      kind: 'secondary',
      x: 28, y: 30,
      desc: 'Termine begleiten, Medikamente erinnern, beruhigen. Wirkt nach aussen wie Selbstverständlichkeit. Ist es nicht.',
    },
  ],
  unten: [
    {
      key: 'erschoepfung',
      label: 'Erschöpfung',
      kind: 'primary',
      x: 50, y: 64,
      desc: 'Anhaltende Erschöpfung kann mit langer Belastung und ständiger Aufmerksamkeit zusammenhängen. Sie kann auch andere Ursachen haben. Wenn Erschöpfung anhält oder Ihren Alltag beeinträchtigt, ist eine eigene fachliche Abklärung sinnvoll.',
    },
    {
      key: 'wut',
      label: 'Wut',
      kind: 'secondary',
      x: 26, y: 52,
      desc: 'Auf die Erkrankung, manchmal auf die Person, manchmal auf sich selbst. Oft ein Signal, dass eine Grenze erreicht ist — kein Charakterproblem.',
    },
    {
      key: 'scham',
      label: 'Scham',
      kind: 'tertiary',
      x: 74, y: 50,
      desc: 'Für eigene Bedürfnisse, eigene Müdigkeit, eigene Wut. Scham macht still in genau den Momenten, in denen Sprechen helfen würde.',
    },
    {
      key: 'einsamkeit',
      label: 'Einsamkeit',
      kind: 'secondary',
      x: 30, y: 76,
      desc: 'Auch mitten in der Beziehung. Das Gefühl, vieles allein zu tragen, weil es niemanden gibt, mit dem Sie es so teilen könnten, wie es ist.',
    },
    {
      key: 'schuld',
      label: 'Schuldgefühle',
      kind: 'tertiary',
      x: 70, y: 76,
      desc: 'Wenn Sie sich für eigene Pausen, eigene Freude, eigenen Abstand schuldig fühlen. Diese Gefühle sind häufig — und meistens kein Hinweis darauf, dass etwas falsch ist.',
    },
    {
      key: 'trauer',
      label: 'Trauer',
      kind: 'tertiary',
      x: 50, y: 88,
      desc: 'Um das, was war. Um die Pläne, die nicht so kamen. Um veränderte Nähe oder Erwartungen. «Ambiguous Loss» beschreibt einen uneindeutigen Verlust; das Bild erklärt nicht die ganze Person oder jede Angehörigenerfahrung.',
    },
    {
      key: 'angst',
      label: 'Angst',
      kind: 'tertiary',
      x: 22, y: 90,
      desc: 'Vor der nächsten Episode. Vor einem Anruf nachts. Manchmal vor sich selbst — vor dem, was Sie nicht mehr halten können.',
    },
    {
      key: 'erstarrung',
      label: 'Erstarrung',
      kind: 'tertiary',
      x: 78, y: 90,
      desc: 'Wenn das Gefühl gar nicht mehr durchkommt. Manche Angehörige beschreiben es als Glaswand — Sie sehen, was passiert, aber Sie spüren es nicht mehr.',
    },
  ],
};

// Hoist: alle Eisberg-Begriffe als Map für O(1)-Lookup statt O(n) per Render.
const EISBERG_BY_KEY = Object.fromEntries(
  [...EISBERG_LABELS.oben, ...EISBERG_LABELS.unten].map((l) => [l.key, l])
);

function EisbergTool({ onClose, onNavigate }) {
  const [phase, setPhase] = React.useState('intro'); // intro | explore | result
  const [selected, setSelected] = React.useState(null);
  const [marked, setMarked] = React.useState(new Set());


  const findLabel = (key) => EISBERG_BY_KEY[key];

  const toggleMark = (key) => {
    setMarked((m) => {
      const next = new Set(m);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const start = () => { setPhase('explore'); setSelected(null); };
  const reset = () => { setMarked(new Set()); setSelected(null); };
  const goResult = () => setPhase('result');

  const sel = selected ? findLabel(selected) : null;

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Eisberg-Modell" cardClass="eisberg-tool-card">
      <span className="kicker">Werkzeug · Verstehen</span>

        {phase === 'intro' && (
          <>
            <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Der Eisberg Ihrer Belastung</h2>
            <p className="lede" style={{ maxWidth: '46ch' }}>Der Eisberg ist eine Metapher, keine Messung: Manche Belastungen sind sichtbar, andere bleiben verborgen. Die Begriffe sind mögliche Erfahrungen; nicht alle müssen auf Sie zutreffen.</p>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '46ch' }}>Klicken Sie auf einen Begriff, um zu lesen, was er für viele Angehörige bedeutet. Markieren Sie, was Sie wiedererkennen — am Ende sehen Sie eine Übersicht.</p>
            <div style={{ marginTop: 24 }}>
              <button className="btn btn-primary" onClick={start}>Eisberg ansehen →</button>
            </div>
          </>
        )}

        {phase === 'explore' && (
          <div className="eisberg-tool">
            <div className="eisberg-tool-zones">
              <div className="eisberg-zone-top">
                <span className="eisberg-zone-kicker">Was andere sehen</span>
                <span className="eisberg-zone-line"></span>
              </div>
            </div>
            <div className="eisberg-tool-stage">
              <Eisberg />
              <div className="eisberg-tool-terms" role="group" aria-label="Was andere sehen">
                <span className="eisberg-tool-fallback-heading" aria-hidden="true">Was andere sehen</span>
              {EISBERG_LABELS.oben.map((item) => (
                <button
                  key={item.key}
                  className={`eisberg-word eisberg-${item.kind} eisberg-above-word eisberg-tool-btn ${selected === item.key ? 'is-selected' : ''} ${marked.has(item.key) ? 'is-marked' : ''}`}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  onClick={() => setSelected(item.key)}
                  aria-pressed={selected === item.key}
                >
                  {item.label}
                </button>
              ))}
              </div>
              <div className="eisberg-tool-terms" role="group" aria-label="Was Sie tragen">
                <span className="eisberg-tool-fallback-heading" aria-hidden="true">Was Sie tragen</span>
              {EISBERG_LABELS.unten.map((item) => (
                <button
                  key={item.key}
                  className={`eisberg-word eisberg-${item.kind} eisberg-below-word eisberg-tool-btn ${selected === item.key ? 'is-selected' : ''} ${marked.has(item.key) ? 'is-marked' : ''}`}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  onClick={() => setSelected(item.key)}
                  aria-pressed={selected === item.key}
                >
                  {item.label}
                </button>
              ))}
              </div>
            </div>
            <div className="eisberg-tool-zones">
              <div className="eisberg-zone-bottom">
                <span className="eisberg-zone-line"></span>
                <span className="eisberg-zone-kicker">Was Sie tragen</span>
              </div>
            </div>

            <div className="eisberg-tool-detail">
              {sel ? (
                <>
                  <h3>{sel.label}</h3>
                  <p>{sel.desc}</p>
                  <button
                    className={`eisberg-tool-mark ${marked.has(sel.key) ? 'is-marked' : ''}`}
                    onClick={() => toggleMark(sel.key)}
                    aria-pressed={marked.has(sel.key)}
                  >
                    {marked.has(sel.key) ? '✓ markiert' : 'Trifft auf mich zu'}
                  </button>
                </>
              ) : (
                <p className="eisberg-tool-hint">Klicken Sie auf einen Begriff im Eisberg, um zu lesen, was er bedeutet.</p>
              )}
            </div>

            <div className="eisberg-tool-foot">
              <span className="eisberg-tool-counter">
                {marked.size === 0 ? 'Nichts markiert' : marked.size === 1 ? '1 Begriff markiert' : `${marked.size} Begriffe markiert`}
              </span>
              <button className="btn btn-primary" onClick={goResult} disabled={marked.size === 0}>
                Übersicht ansehen →
              </button>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="selbsttest-result">
            <div className="selbsttest-zone">
              <span className="selbsttest-zone-kicker">Was Sie tragen</span>
              <h2>{marked.size === 1 ? 'Ein Begriff wiedererkannt' : `${marked.size} Begriffe wiedererkannt`}</h2>
              <p className="selbsttest-zone-sub">Sie entscheiden, was Sie daran belastet und was auch eine Ressource sein kann. Eigene Gefühle und Bedürfnisse verdienen Aufmerksamkeit; sie sind keine Schwäche und kein Charakterfehler.</p>
            </div>

            <ul className="eisberg-tool-marked">
              {Array.from(marked).map((key) => {
                const l = findLabel(key);
                return l ? (
                  <li key={key}>
                    <strong>{l.label}.</strong> {l.desc}
                  </li>
                ) : null;
              })}
            </ul>

            <p className="selbsttest-body">
              Modul 2 vertieft mögliche Angehörigenerfahrungen: anhaltende Wachsamkeit, verborgene Belastungen und das Zurückstellen eigener Anliegen.
            </p>

            <div className="selbsttest-actions">
              <button className="btn btn-primary" onClick={() => { onClose(); onNavigate('modul2', 's2'); }}>
                Modul 2 — Die eigene Belastung verstehen →
              </button>
            </div>

            <div className="selbsttest-foot">
              <button className="tool-quiet-btn" onClick={() => { reset(); setPhase('explore'); }}>Erneut ansehen</button>
              <button className="tool-quiet-btn" onClick={onClose}>schliessen</button>
            </div>
          </div>
        )}
    </ToolOverlay>
  );
}

const KOMMUNIKATION_ANLAESSE = [
  {
    key: 'fruehzeichen',
    label: 'Ich möchte Frühwarnzeichen ansprechen',
    sub: 'In stabiler Phase oder beginnender Verschlechterung.',
    eroeffnung: 'Ich möchte mit dir über eine Beobachtung sprechen; passt der Moment dafür?',
  },
  {
    key: 'nachher',
    label: 'Ich möchte nach einer Episode reden',
    sub: 'Wenn die akute Phase vorbei ist und die Person wieder ansprechbar.',
    eroeffnung: 'Ich würde gern über die letzten Wochen reden, wenn du bereit bist. Es muss nicht heute sein.',
  },
  {
    key: 'grenze',
    label: 'Ich möchte eine Grenze setzen',
    sub: 'Wenn etwas nicht mehr tragbar ist — Verhalten, Verantwortung, Aufgabenverteilung.',
    eroeffnung: 'Ich brauche, dass wir kurz über etwas Wichtiges reden. Es geht um etwas, das ich so nicht mehr halten kann.',
  },
  {
    key: 'behandlung',
    label: 'Ich möchte über Behandlung sprechen',
    sub: 'Medikamente, Therapie, Termine — Themen, die schnell heikel werden.',
    eroeffnung: 'Ich mache mir Gedanken zu deiner Behandlung. Können wir das zusammen anschauen, in Ruhe?',
  },
  {
    key: 'anderes',
    label: 'Ein anderes Anliegen',
    sub: 'Ein eigenes Thema, das nicht in die Kategorien oben passt.',
    eroeffnung: 'Ich möchte etwas mit dir besprechen. Ist gerade ein guter Moment?',
  },
];

const KOMMUNIKATION_HINWEISE = {
  beobachtung: 'Beschreiben Sie konkret, was Sie wahrgenommen haben — mit Zeitfenster, ohne Interpretation. «Mir ist in den letzten drei Wochen aufgefallen, dass …»',
  wirkung: 'Sagen Sie, was es mit Ihnen macht — nicht «du machst», sondern «bei mir kommt das so an». Eine Ich-Botschaft.',
  bitte: 'Formulieren Sie eine Bitte oder Frage, keinen Befehl. Konkret und klein. «Können wir vielleicht zusammen …»',
};

const KOMMUNIKATION_STORAGE_KEY = 'puk-kommunikation-v1';
const KOMMUNIKATION_DEFAULT = { anlass: '', beobachtung: '', wirkung: '', bitte: '', grenze: '' };

function KommunikationsTrainerTool({ onClose, onNavigate }) {
  const [step, setStep] = React.useState('intro'); // intro | anlass | beobachtung | wirkung | bitte | result
  const [data, setData] = React.useState({ ...KOMMUNIKATION_DEFAULT });
  const [storageHint, setStorageHint] = React.useState('');
  const [copyHint, setCopyHint] = React.useState({ tone: '', text: '' });
  const copyHintTimer = React.useRef(null);

  React.useEffect(() => () => {
    if (copyHintTimer.current) window.clearTimeout(copyHintTimer.current);
  }, []);

  const showCopyHint = (tone, text) => {
    setCopyHint({ tone, text });
    if (copyHintTimer.current) window.clearTimeout(copyHintTimer.current);
    copyHintTimer.current = window.setTimeout(() => setCopyHint({ tone: '', text: '' }), 4000);
  };


  const updateField = (key, value) => {
    const next = { ...data, [key]: value };
    setData(next);
    setStorageHint('');
  };

  const start = () => setStep('anlass');
  const reset = () => {
    if (window.confirm('Entwurf löschen? Aktuelle Eingaben und früher gespeicherte Browser-Kopien werden entfernt. Zwischenablage und geteilte Kopien bleiben erhalten.')) {
      setData({ ...KOMMUNIKATION_DEFAULT });
      const cleared = clearStoredDraft(KOMMUNIKATION_STORAGE_KEY);
      setStorageHint(cleared ? 'Aktuelle Eingaben und frühere Browser-Kopien gelöscht.' : 'Die Eingaben sind hier entfernt. Frühere Browser-Kopien konnten nicht vollständig gelöscht werden. Löschen Sie die Website-Daten in Ihren Browser-Einstellungen.');
      setStep('anlass');
    }
  };

  const anlass = KOMMUNIKATION_ANLAESSE.find((a) => a.key === data.anlass) || KOMMUNIKATION_ANLAESSE[0];
  const eroeffnung = anlass.eroeffnung;
  const isBoundary = data.anlass === 'grenze';

  const scriptParts = [eroeffnung, data.beobachtung || '[Ihre Beobachtung]', data.wirkung || '[Wirkung auf Sie]'];
  if (data.bitte || !isBoundary) scriptParts.push(data.bitte || '[Ihre Bitte]');
  if (isBoundary) scriptParts.push(data.grenze || '[Ihre eigene Grenze]');
  const skript = scriptParts.join('\n\n');

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(skript).then(
        () => { showCopyHint('ok', 'Skript kopiert.'); },
        () => { showCopyHint('warn', 'Konnte nicht in die Zwischenablage kopieren — bitte das Skript manuell markieren und kopieren.'); },
      );
    } else {
      showCopyHint('warn', 'Kopieren nicht verfügbar — bitte das Skript manuell markieren und kopieren.');
    }
  };

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Kommunikations-Trainer" cardClass="kommunikation-card" noPrint={true}>
      <span className="kicker">Werkzeug · Kommunikations-Trainer</span>

        {step === 'intro' && (
          <>
            <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Kommunikations-Trainer</h2>
            <p className="lede" style={{ maxWidth: '46ch' }}>Vier kurze Schritte für ein schwieriges Gespräch. Sie formulieren Ihr Anliegen, eine konkrete Bitte und bei Bedarf eine eigene Grenze. Am Ende haben Sie ein Skript in Ihren Worten. Wie die andere Person reagiert, können Sie nicht vollständig beeinflussen.</p>
            <div className="tool-intro-notes kommunikation-intro-notes">
              <p>Nicht jedes Gespräch funktioniert nach Plan. Aber ein vorbereitetes Skript hilft, in der Spannung nicht das eigene Anliegen zu verlieren.</p>
              <p>Dieses Werkzeug dient der Gesprächsvorbereitung; es ist nicht für akute Manie, Psychose, Gewalt oder akute Suizidalität gedacht.</p>
            </div>
            <div style={{ marginTop: 18 }}>
              <button className="btn btn-primary" onClick={start}>Beginnen →</button>
            </div>
          </>
        )}

        {step === 'anlass' && (
          <div className="kommunikation-step">
            <div className="kommunikation-progress">Schritt 1 von 4 · Anlass</div>
            <h3 className="kommunikation-q">Worum geht es im Gespräch?</h3>
            <div className="kommunikation-anlaesse">
              {KOMMUNIKATION_ANLAESSE.map((a) => (
                <button
                  key={a.key}
                  className={`kommunikation-anlass ${data.anlass === a.key ? 'is-selected' : ''}`}
                  onClick={() => updateField('anlass', a.key)}
                  aria-pressed={data.anlass === a.key}
                >
                  <strong>{a.label}</strong>
                  <span>{a.sub}</span>
                </button>
              ))}
            </div>
            <div className="kommunikation-nav">
              <button className="tool-quiet-btn" onClick={() => setStep('intro')}>← zurück</button>
              <button className="btn btn-primary" onClick={() => setStep('beobachtung')} disabled={!data.anlass}>weiter →</button>
            </div>
          </div>
        )}

        {step === 'beobachtung' && (
          <div className="kommunikation-step">
            <div className="kommunikation-progress">Schritt 2 von 4 · Beobachtung</div>
            <h3 className="kommunikation-q"><label htmlFor="kommunikation-beobachtung">Was haben Sie konkret beobachtet?</label></h3>
            <p className="kommunikation-hint">{KOMMUNIKATION_HINWEISE.beobachtung}</p>
            <textarea
              id="kommunikation-beobachtung"
              className="krisenplan-textarea"
              rows={5}
              value={data.beobachtung}
              onChange={(e) => updateField('beobachtung', e.target.value)}
              placeholder="z.B. Mir ist in den letzten drei Wochen aufgefallen, dass du nachts oft auf bist und tagsüber wenig isst."
            />
            <div className="kommunikation-nav">
              <button className="tool-quiet-btn" onClick={() => setStep('anlass')}>← zurück</button>
              <button className="btn btn-primary" onClick={() => setStep('wirkung')}>weiter →</button>
            </div>
          </div>
        )}

        {step === 'wirkung' && (
          <div className="kommunikation-step">
            <div className="kommunikation-progress">Schritt 3 von 4 · Wirkung auf mich</div>
            <h3 className="kommunikation-q"><label htmlFor="kommunikation-wirkung">Was macht das mit Ihnen?</label></h3>
            <p className="kommunikation-hint">{KOMMUNIKATION_HINWEISE.wirkung}</p>
            <textarea
              id="kommunikation-wirkung"
              className="krisenplan-textarea"
              rows={5}
              value={data.wirkung}
              onChange={(e) => updateField('wirkung', e.target.value)}
              placeholder="z.B. Das macht mir Sorgen — und ich merke, dass ich selbst nicht mehr richtig schlafe, weil ich darauf höre."
            />
            <div className="kommunikation-nav">
              <button className="tool-quiet-btn" onClick={() => setStep('beobachtung')}>← zurück</button>
              <button className="btn btn-primary" onClick={() => setStep('bitte')}>weiter →</button>
            </div>
          </div>
        )}

        {step === 'bitte' && (
          <div className="kommunikation-step">
            <div className="kommunikation-progress">Schritt 4 von 4 · {isBoundary ? 'Bitte und eigene Grenze' : 'Bitte'}</div>
            <h3 className="kommunikation-q"><label htmlFor="kommunikation-bitte">{isBoundary ? 'Welche Bitte möchten Sie ergänzen? (optional)' : 'Was wäre Ihr Anliegen oder Ihre Bitte?'}</label></h3>
            <p className="kommunikation-hint">{KOMMUNIKATION_HINWEISE.bitte}</p>
            <textarea
              id="kommunikation-bitte"
              className="krisenplan-textarea"
              rows={5}
              value={data.bitte}
              onChange={(e) => updateField('bitte', e.target.value)}
              placeholder="z.B. Können wir vielleicht zusammen schauen, ob ein Termin bei der Ärztin schon Sinn machen würde?"
            />
            {isBoundary && (
              <>
                <h3 className="kommunikation-q"><label htmlFor="kommunikation-grenze">Welche eigene Grenze können Sie umsetzen?</label></h3>
                <p className="kommunikation-hint">Benennen Sie, was Sie selbst tun werden, wenn Ihre Grenze überschritten wird. Diese Handlung braucht nicht die Zustimmung der anderen Person. Wählen Sie etwas, das für Sie möglich und sicher ist.</p>
                <textarea
                  id="kommunikation-grenze"
                  className="krisenplan-textarea"
                  rows={4}
                  value={data.grenze}
                  onChange={(e) => updateField('grenze', e.target.value)}
                  placeholder="z.B. Wenn das Gespräch verletzend wird, beende ich es für heute."
                />
              </>
            )}
            <div className="kommunikation-nav">
              <button className="tool-quiet-btn" onClick={() => setStep('wirkung')}>← zurück</button>
              <button className="btn btn-primary" onClick={() => setStep('result')} disabled={isBoundary && !data.grenze.trim()}>Skript ansehen →</button>
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="kommunikation-result">
            <div className="selbsttest-zone">
              <span className="selbsttest-zone-kicker">Ihr Gesprächs-Skript</span>
              <h2>{anlass.label.replace('Ich möchte ', '').replace(/^./, c => c.toUpperCase())}</h2>
            </div>

            <div className="kommunikation-skript">
              <div className="kommunikation-zeile">
                <span className="kommunikation-rolle">Eröffnung</span>
                <p>«{eroeffnung}»</p>
              </div>
              <div className="kommunikation-zeile">
                <span className="kommunikation-rolle">Beobachtung</span>
                <p>«{data.beobachtung || '— noch nicht ausgefüllt —'}»</p>
              </div>
              <div className="kommunikation-zeile">
                <span className="kommunikation-rolle">Wirkung</span>
                <p>«{data.wirkung || '— noch nicht ausgefüllt —'}»</p>
              </div>
              {(!isBoundary || data.bitte) && (
                <div className="kommunikation-zeile">
                  <span className="kommunikation-rolle">Bitte</span>
                  <p>«{data.bitte || '— noch nicht ausgefüllt —'}»</p>
                </div>
              )}
              {isBoundary && (
                <div className="kommunikation-zeile">
                  <span className="kommunikation-rolle">Eigene Grenze</span>
                  <p>«{data.grenze}»</p>
                </div>
              )}
              <div className="kommunikation-zeile">
                <span className="kommunikation-rolle">Pause</span>
                <p className="kommunikation-pause">— stille zulassen, antwort abwarten —</p>
              </div>
            </div>

            <aside className="kommunikation-tipp">
              <span className="kommunikation-tipp-kicker">Vor dem Gespräch</span>
              <ul>
                <li>Bewusst gewählter Moment — nicht direkt nach einer Episode oder im Stress</li>
                <li>Reize reduzieren — TV aus, Telefon stumm</li>
                <li>Eine Pause oder ein Gesprächsende ist erlaubt: «Ich beende das Gespräch für heute.» Eine Fortsetzung bleibt freiwillig.</li>
                <li>Lassen Sie nach Ihrer Bitte eine Pause, damit die andere Person antworten kann.</li>
              </ul>
            </aside>

            <div className="selbsttest-actions">
              <button className="btn btn-primary" onClick={copyToClipboard} data-data-export="clipboard" data-storage-key={KOMMUNIKATION_STORAGE_KEY}>Skript kopieren</button>
              <button className="selbsttest-secondary" onClick={() => { onClose(); onNavigate('modul6', 's4'); }}>
                Modul 6 — Was Sie konkret tun können →
              </button>
            </div>
            {copyHint.text && (
              <p
                className={`kommunikation-copy-hint kommunikation-copy-hint-${copyHint.tone}`}
                role="status"
                aria-live="polite"
              >
                {copyHint.text}
              </p>
            )}

            <div className="selbsttest-foot">
              <button className="tool-quiet-btn" onClick={() => setStep('anlass')}>Skript bearbeiten</button>
              <button className="tool-quiet-btn" onClick={onClose}>schliessen</button>
            </div>
          </div>
        )}
        <div className="tool-intro-notes no-print" data-storage-key={KOMMUNIKATION_STORAGE_KEY}>
          <p data-storage-notice="memory-only">Ihr Entwurf kann persönliche Gesundheits- und Beziehungsdaten enthalten. Er wird nicht automatisch gespeichert oder versendet. Beim Schliessen des Werkzeugs oder Neuladen der Seite geht er verloren. Kopieren Sie wichtige Inhalte bei Bedarf vor dem Schliessen.</p>
          <p data-storage-notice="legacy-deletion">Entwürfe aus früheren Versionen werden nicht wieder geöffnet. Mit «Entwurf löschen» können Sie aktuelle Eingaben und frühere Browser-Kopien dieses Werkzeugs entfernen.</p>
          <p data-export-notice="clipboard">Beim Kopieren liegt Ihr Skript zusätzlich in der Zwischenablage; das Gerät kann es in einem Verlauf behalten oder synchronisieren. «Entwurf löschen» entfernt diese Kopien nicht. Löschen Sie die Zwischenablage und geteilte Kopien separat und schliessen Sie auf gemeinsam genutzten Geräten auch andere offene Tabs mit persönlichen Eingaben.</p>
          <button className="tool-quiet-btn" onClick={reset} data-storage-delete={KOMMUNIKATION_STORAGE_KEY} data-storage-scope="session local">Entwurf löschen</button>
          <p role="status" aria-live="polite">{storageHint}</p>
        </div>
    </ToolOverlay>
  );
}

const EE_ASPEKTE = [
  {
    key: 'schuld',
    label: 'Schuldgefühle',
    pos: { left: '50%', top: '14%' },
    desc: '«Hätte ich die Warnzeichen früher erkannt? Mache ich genug?» Schuldgefühle können zusätzliche Kontrolle oder Aufmerksamkeit auslösen; andere Reaktionen sind ebenso möglich.',
    unterbrechen: 'Schuldgefühle bemerken, nicht als Urteil übernehmen. Modul 5 vertieft: «Schuldgefühl ist kein Beweis von Schuld.» Es kann auch dann kommen, wenn Sie etwas Richtiges tun.',
  },
  {
    key: 'engagement',
    label: 'Zusätzliche Verantwortung',
    pos: { left: '86%', top: '50%' },
    desc: 'Vielleicht begleiten Sie Termine, unterstützen bei Alltagsaufgaben oder besprechen vereinbarte Beobachtungen. Prüfen Sie gemeinsam, welche Hilfe gewünscht und für Sie tragbar ist, was die andere Person selbst übernehmen möchte und wo Sie Entlastung brauchen. Diagnose und Behandlung bleiben fachliche Aufgaben.',
    unterbrechen: 'Wählen Sie eine Aufgabe, die Sie neu besprechen möchten: Was können und möchten Sie übernehmen, wo liegt Ihre eigene Grenze und wer könnte Sie entlasten? Eine neue Aufgabenverteilung braucht Absprachen; Verantwortung für den Krankheitsverlauf wird daraus nicht abgeleitet.',
  },
  {
    key: 'erschoepfung',
    label: 'Erschöpfung',
    pos: { left: '50%', top: '86%' },
    desc: 'Unter Belastung können Energie und Geduld nachlassen. Gereiztheit ist keine zwangsläufige Folge. Entlastung darf früh beginnen.',
    unterbrechen: 'Eigene Belastung ansprechen. Die Fragen «Meine Belastung wahrnehmen» oder der Säulen-Check helfen bei der Reflexion; sie messen keine Grenze.',
  },
  {
    key: 'kritik',
    label: 'Kritik',
    pos: { left: '14%', top: '50%' },
    desc: 'Unter Belastung können verletzende Sätze fallen. Das muss keinen festen Kreislauf auslösen. Eine Pause, eine spätere Klärung oder Unterstützung können helfen.',
    unterbrechen: 'Pause statt Reaktion. «Ich brauche kurz Pause» ist kein Aufgeben. Eine Pause kann Raum schaffen. Sie dürfen das Gespräch beenden; eine Fortsetzung bleibt freiwillig.',
  },
];

function EeKreislaufTool({ onClose, onNavigate }) {
  const [selected, setSelected] = React.useState('schuld');
  const [view, setView] = React.useState('was'); // 'was' | 'unterbrechen'


  const cur = EE_ASPEKTE.find((p) => p.key === selected);

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Wenn Belastung Gespräche verändert" cardClass="ee-card">
      <span className="kicker">Werkzeug · Beziehung</span>
        <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Wenn Belastung Gespräche verändert</h2>
        <p className="ee-intro">Vier mögliche Erfahrungen im Umgang mit Belastung. Die Zusammenstellung dient der persönlichen Reflexion; sie ist kein Test und gibt keine feste Reihenfolge vor. Wählen Sie, was Sie wiedererkennen.</p>

        <div className="ee-stage">
          <svg viewBox="0 0 400 400" className="ee-svg" aria-hidden="true">
            {/* Vier unabhängig auswählbare Aspekte ohne gerichtete Folge. */}
            <text x="200" y="195" textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="normal" fontSize="14" fill="var(--ink-mute)">
              Vier Aspekte
            </text>
            <text x="200" y="215" textAnchor="middle" fontFamily="var(--sans)" fontSize="10" letterSpacing="0" fill="var(--ink-mute)">
              FREI AUSWÄHLBAR
            </text>
          </svg>

          {EE_ASPEKTE.map((p) => (
            <button
              key={p.key}
              className={`ee-node ${selected === p.key ? 'is-selected' : ''}`}
              style={{ left: p.pos.left, top: p.pos.top }}
              onClick={() => setSelected(p.key)}
              aria-pressed={selected === p.key}
            >
              <span className="ee-node-label">{p.label}</span>
            </button>
          ))}
        </div>

        <div className="ee-detail">
          <div className="ee-detail-head">
            <span className="ee-detail-num">Mögliche Erfahrung</span>
            <h3>{cur.label}</h3>
          </div>
          <div className="ee-detail-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={view === 'was'}
              tabIndex={view === 'was' ? 0 : -1}
              className={`ee-detail-tab ${view === 'was' ? 'is-active' : ''}`}
              onClick={() => setView('was')}
              onKeyDown={handleTabKeyDown}
            >
              Was passiert
            </button>
            <button
              role="tab"
              aria-selected={view === 'unterbrechen'}
              tabIndex={view === 'unterbrechen' ? 0 : -1}
              className={`ee-detail-tab ${view === 'unterbrechen' ? 'is-active' : ''}`}
              onClick={() => setView('unterbrechen')}
              onKeyDown={handleTabKeyDown}
            >
              Wo unterbrechen
            </button>
          </div>
          <div className="ee-detail-body">
            <p>{view === 'was' ? cur.desc : cur.unterbrechen}</p>
          </div>
        </div>

        <div className="selbsttest-actions">
          <button className="btn btn-primary" onClick={() => { onClose(); onNavigate('modul5', 's3'); }}>
            Modul 5 — Loyalitätskonflikte →
          </button>
          <button className="selbsttest-secondary" onClick={() => { onClose(); onNavigate('modul2', 's3'); }}>
            Modul 2 — Eigene Belastung →
          </button>
        </div>

        <p className="ee-foot-note">
          Eigene Grenzen sind erlaubt. Schuldgefühle sind kein Urteil über Ihre Verantwortung. Modul 5 vertieft, wie Zuwendung und Selbstschutz nebeneinander Platz haben können.
        </p>
    </ToolOverlay>
  );
}

const PHASEN_VARIANTEN = [
  {
    key: 'bipolar1',
    label: 'Bipolar I',
    sub: 'Diagnose: fachlich einzuordnen',
    path: 'M 0,90 L 60,90 Q 90,30 120,55 Q 150,90 180,135 Q 210,160 230,140 Q 260,90 320,90 Q 350,40 380,75 L 400,90',
    desc: 'Die Kurve ist ein fiktives Beispiel, keine Diagnosehilfe. Die diagnostischen Kriterien richten sich nach der verwendeten Klassifikation; eine Fachperson beurteilt den bisherigen Verlauf, Dauer, Begleitsymptome und Beeinträchtigung gemeinsam.',
    angehoerige: 'Bei einer schweren Manie können Kontrollverlust und Angst im Vordergrund stehen. Welche Belastung entsteht, ist individuell.',
  },
  {
    key: 'bipolar2',
    label: 'Bipolar II',
    sub: 'Diagnose: fachlich einzuordnen',
    path: 'M 0,90 L 50,90 Q 70,60 95,75 Q 110,90 135,140 Q 175,165 215,160 Q 250,150 280,90 Q 295,68 320,80 Q 340,90 360,140 Q 380,160 400,150',
    desc: 'Auch dieses Beispiel beschreibt keine diagnostischen Kriterien. Eine Fachperson ordnet den bisherigen Verlauf und die einzelnen Episoden anhand der verwendeten Klassifikation ein. An der Form der Kurve lässt sich keine Diagnose ablesen.',
    angehoerige: 'Depressionen können erheblich belasten. Dauer und Sichtbarkeit unterscheiden sich; Angehörige dürfen eigene Bedürfnisse unabhängig davon ansprechen.',
  },
  {
    key: 'misch',
    label: 'Mischzustände',
    sub: 'Zustand: gleichzeitige Symptome',
    path: 'M 0,90 L 30,80 Q 50,55 70,100 Q 90,140 110,75 Q 130,40 155,120 Q 175,150 200,80 Q 220,55 250,135 Q 280,155 305,90 Q 325,55 350,130 L 400,110',
    desc: 'Die Abbildung zeigt erhöhte Aktivierung und depressive Stimmung im gleichen Zeitraum. Ob und wie solche Erfahrungen als Mischzustand einzuordnen sind, wird fachlich anhand des Gesamtverlaufs und der verwendeten Klassifikation beurteilt. Die Linien sind keine Messung.',
    angehoerige: 'Gleichzeitige Aktivierung und depressive Symptome können für Angehörige besonders belastend und schwer verständlich sein; die Belastung ist individuell.',
  },
  {
    key: 'stabil',
    label: 'Stabile Phase',
    sub: 'Zustand: ausserhalb einer Episode',
    path: 'M 0,92 Q 50,85 100,93 Q 150,88 200,92 Q 250,87 300,90 Q 350,93 400,88',
    desc: 'Stabile Phasen können lange dauern und Erholung, eigene Pläne und gute gemeinsame Zeit ermöglichen. Manchmal bestehen Restsymptome oder eigene Wachsamkeit fort.',
    angehoerige: 'Stabile Phasen sind wertvoll für Planung und Gespräche, aber nicht automatisch entlastend. Viele Angehörige bleiben innerlich wachsam, auch wenn nach aussen Ruhe sichtbar ist.',
  },
];

function PhasenverlaufTool({ onClose, onNavigate }) {
  const [active, setActive] = React.useState('bipolar1');


  const cur = PHASEN_VARIANTEN.find((p) => p.key === active);

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Bipolarer Phasenverlauf" cardClass="phasen-card">
      <span className="kicker">Werkzeug · Interaktiv</span>
        <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Bipolarer Phasenverlauf</h2>
        <p className="ee-intro">Bipolare Verläufe sehen selten gleich aus. Wählen Sie eine fiktive Verlaufsskizze und lesen Sie dazu mögliche Erfahrungen von Angehörigen. Die Auswahlfelder Bipolar I und II sind keine Erklärung der Diagnoseunterscheidung; diese finden Sie in Modul 1. Die Kurven haben keinen Zeitmassstab und geben keine individuelle Prognose. Keine Diagnose lässt sich an einer Kurve ablesen.</p>

        <div className="phasen-tabs" role="tablist">
          {PHASEN_VARIANTEN.map((p) => (
            <button
              key={p.key}
              role="tab"
              aria-selected={active === p.key}
              tabIndex={active === p.key ? 0 : -1}
              className={`phasen-tab ${active === p.key ? 'is-active' : ''}`}
              onClick={() => setActive(p.key)}
              onKeyDown={handleTabKeyDown}
            >
              <strong>{p.label}</strong>
              <span>{p.sub}</span>
            </button>
          ))}
        </div>

        {active === 'misch' ? (
          <figure className="phasen-figure">
            <svg viewBox="0 0 420 200" className="phasen-svg" role="img" aria-label="Fiktives Beispiel: erhöhte Aktivierung und depressive Stimmung bestehen gleichzeitig. Zwei getrennte Linien zeigen die beiden Dimensionen.">
              <text x="10" y="20" fontFamily="var(--sans)" fontSize="11" fill="var(--accent)">Erhöhte Aktivierung / Getriebenheit</text>
              <path d="M 10,65 Q 100,40 190,60 T 400,50" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
              <text x="10" y="120" fontFamily="var(--sans)" fontSize="11" fill="var(--ink)">Depressive Stimmung / Hoffnungslosigkeit</text>
              <path d="M 10,160 Q 100,140 190,160 T 400,150" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="6 3" />
              <text x="400" y="192" textAnchor="end" fontFamily="var(--sans)" fontSize="10" fill="var(--ink-mute)">Gleicher Zeitraum →</text>
            </svg>
            <figcaption>Zwei gleichzeitige Dimensionen, kein rascher Wechsel zwischen Hoch und Tief. Fiktive Darstellung, keine Messung oder Diagnose.</figcaption>
          </figure>
        ) : (
        <figure className="phasen-figure">
          <svg viewBox="0 0 420 200" className="phasen-svg" aria-hidden="true">
            <defs>
              <linearGradient id="phasen-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--accent)" stopOpacity="0.18" />
                <stop offset="1" stopColor="var(--accent)" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            {/* Achsen-Beschriftung */}
            <text x="6" y="14" fontFamily="var(--sans)" fontSize="9" letterSpacing="0" fill="var(--ink-mute)" fontWeight="500">HOCHPHASE</text>
            <text x="6" y="178" fontFamily="var(--sans)" fontSize="9" letterSpacing="0" fill="var(--ink-mute)" fontWeight="500">DEPRESSION</text>
            <text x="395" y="100" fontFamily="var(--sans)" fontSize="9" letterSpacing="0" fill="var(--ink-mute)" textAnchor="end">Zeit →</text>

            {/* Neutral-Linie */}
            <line x1="10" y1="90" x2="400" y2="90" stroke="var(--ink-mute)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />

            {/* Verlauf — Pfad gefüllt + Linie */}
            <path d={cur.path + ' L 400,90 L 10,90 Z'} transform="translate(10 0)" fill="url(#phasen-fill)" />
            <path d={cur.path} transform="translate(10 0)" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <figcaption>Schematische Darstellung zur Orientierung — kein Diagnosewerkzeug. Reale Verläufe, Übergänge und Zwischenphasen variieren stark.</figcaption>
        </figure>

        )}

        <div className="ee-detail">
          <div className="ee-detail-head">
            <span className="ee-detail-num">{cur.label} · {cur.sub}</span>
            <h3>Zur fiktiven Darstellung</h3>
          </div>
          <div className="ee-detail-body">
            <p>{cur.desc}</p>
          </div>
        </div>

        <div className="ee-detail">
          <div className="ee-detail-head">
            <h3>Mögliche Erfahrungen von Angehörigen</h3>
          </div>
          <div className="ee-detail-body">
            <p>{cur.angehoerige}</p>
          </div>
        </div>

        <div className="selbsttest-actions">
          <button className="btn btn-primary" onClick={() => { onClose(); onNavigate('modul1', 's5'); }}>
            Bipolar I und II unterscheiden · Modul 1 →
          </button>
        </div>
    </ToolOverlay>
  );
}

function BelastungsverlaufTool({ onClose, onNavigate }) {
  const [showSupport, setShowSupport] = React.useState(false);
  const [activeEpisode, setActiveEpisode] = React.useState(null);


  // Drei Episoden mit Erklärungen
  const episoden = [
    { x: 110, y: 60,  label: 'Erste Episode', text: 'Manche Angehörige reagieren zunächst mit viel Organisieren und Helfen; andere fühlen sich unsicher oder überfordert. Ihre eigene Belastung darf von Anfang an Aufmerksamkeit bekommen.' },
    { x: 220, y: 95, label: 'Wiederkehr', text: 'Nach einer weiteren Krise kann Erholung Zeit brauchen. Manche Angehörige erleben mehr Belastung, andere finden wieder zu Ruhe und Vertrauen. Eine feste Reihenfolge gibt es nicht.' },
    { x: 330, y: 130, label: 'Längerfristige Belastung', text: 'Bei manchen Angehörigen bleibt Belastung länger bestehen. Andere erleben lange stabile Zeiten. Neue Aufgabenverteilung, eigene Behandlung bei Bedarf und praktische Hilfe können wichtig sein.' },
  ];
  const activateEpisode = React.useCallback((index) => {
    setActiveEpisode(index);
  }, []);

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Belastungsverlauf" cardClass="phasen-card">
      <span className="kicker">Werkzeug · Verlauf</span>
        <h2 style={{ fontStyle: 'normal', marginTop: 8 }}>Mögliche Belastungsverläufe</h2>
        <p className="ee-intro">Die eigene Kraft kann nach Krisen abnehmen, sich erholen oder weitgehend stabil bleiben. Drei fiktive Beispiele zeigen diese Unterschiede. Die Linien sind keine Messwerte und kein Nachweis einer bestimmten Behandlung. Wählen Sie einen Marker für eine mögliche Erfahrung.</p>

        <div className="belastung-toggle">
          <button
            className={`belastung-toggle-btn ${!showSupport ? 'is-active' : ''}`}
            onClick={() => setShowSupport(false)}
          >
            Ein mögliches Beispiel
          </button>
          <button
            className={`belastung-toggle-btn ${showSupport ? 'is-active' : ''}`}
            onClick={() => setShowSupport(true)}
          >
            Weitere mögliche Verläufe
          </button>
        </div>

        <figure className="phasen-figure">
          <svg viewBox="0 0 420 200" className="phasen-svg" role="img" aria-label="Belastungsverlauf von Angehörigen über mehrere Episoden, mit drei nummerierten Markern. Die zugehörigen Erfahrungen können unterhalb der Abbildung ausgewählt werden.">
            {/* Achsen */}
            <text x="6" y="14" fontFamily="var(--sans)" fontSize="9" letterSpacing="0" fill="var(--ink-mute)" fontWeight="500">VOLL</text>
            <text x="6" y="178" fontFamily="var(--sans)" fontSize="9" letterSpacing="0" fill="var(--ink-mute)" fontWeight="500">RESERVE</text>
            <text x="395" y="100" fontFamily="var(--sans)" fontSize="9" letterSpacing="0" fill="var(--ink-mute)" textAnchor="end">Zeit →</text>

            {/* Hilfslinien */}
            <line x1="10" y1="40" x2="400" y2="40" stroke="var(--paper-edge)" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="10" y1="160" x2="400" y2="160" stroke="var(--paper-edge)" strokeWidth="0.5" strokeDasharray="2 4" />

            {/* Krankheitsverlauf — leise Hintergrundlinie */}
            <path
              d="M 10,90 L 90,90 Q 110,40 130,60 Q 150,90 170,135 Q 200,90 230,90 Q 250,55 270,75 Q 290,90 310,140 Q 340,90 370,90 Q 390,55 400,75"
              fill="none"
              stroke="var(--accent-soft)"
              strokeWidth="1"
              strokeOpacity="0.45"
              strokeDasharray="3 3"
            />
            <text x="60" y="84" fontFamily="var(--sans)" fontSize="8" fill="var(--accent)" opacity="0.6">Krankheitsverlauf</text>

            {/* Belastbarkeits-Linie ohne Unterstützung — fällt kumulativ */}
            <path
              d="M 10,40 L 90,42 L 130,68 L 170,80 L 230,92 L 270,108 L 310,135 L 370,148 L 400,150"
              fill="none"
              stroke="var(--alert)"
              strokeWidth="2"
              strokeLinejoin="round"
              opacity={showSupport ? 0.25 : 1}
              style={{ transition: 'opacity 0.4s' }}
            />
            <text x="380" y="158" textAnchor="end" fontFamily="var(--sans)" fontSize="9" fill="var(--alert)" opacity={showSupport ? 0.5 : 1}>
              A: länger belastet
            </text>

            {/* Belastbarkeits-Linie mit Unterstützung — kommt zurück */}
            {showSupport && (
              <>
                <path
                  d="M 10,40 L 90,42 L 130,68 L 170,80 L 200,72 L 230,68 L 270,76 L 290,68 L 310,82 L 340,72 L 370,72 L 400,68"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  style={{ animation: 'fadeUp 0.6s' }}
                />
                <text x="380" y="62" textAnchor="end" fontFamily="var(--sans)" fontSize="9" fill="var(--accent)" fontWeight="500">
                  B: erneute Erholung
                </text>
                <path d="M 10,48 Q 90,42 150,52 T 280,48 T 400,46" fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="7 4" />
                <text x="380" y="35" textAnchor="end" fontFamily="var(--sans)" fontSize="9" fill="var(--ink)">C: weitgehend stabil</text>
              </>
            )}

            {/* Episoden-Marker */}
            {episoden.map((ep, i) => (
              <g
                key={i}
              >
                <circle cx={ep.x} cy={ep.y} r="14" fill="var(--bg)" stroke={activeEpisode === i ? 'var(--accent)' : 'var(--ink-mute)'} strokeWidth={activeEpisode === i ? 2 : 1.2} />
                <text x={ep.x} y={ep.y + 4} textAnchor="middle" fontFamily="var(--mono)" fontSize="11" fill={activeEpisode === i ? 'var(--accent)' : 'var(--ink)'} fontWeight={activeEpisode === i ? 500 : 400}>
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>
          <figcaption>Fiktive Beispiele ohne Zeitmassstab. Verlauf und Unterstützungsbedarf sind individuell. Die Marker bezeichnen mögliche Erfahrungen, keine Entwicklungsstufen.</figcaption>
        </figure>

        <ol className="belastung-marker-actions" aria-label="Mögliche Erfahrungen auswählen">
          {episoden.map((ep, i) => (
            <li key={ep.label}>
              <button
                className="belastung-marker-button"
                onClick={() => activateEpisode(i)}
                aria-pressed={activeEpisode === i}
              >
                <span aria-hidden="true">{i + 1} · </span>{ep.label}
              </button>
            </li>
          ))}
        </ol>

        {activeEpisode !== null && (
          <div className="ee-detail">
            <div className="ee-detail-head">
              <span className="ee-detail-num">Mögliche Erfahrung</span>
              <h3>{episoden[activeEpisode].label}</h3>
            </div>
            <div className="ee-detail-body">
              <p>{episoden[activeEpisode].text}</p>
            </div>
          </div>
        )}

        <p className="ee-foot-note">
          Unterstützung kann entlasten, bestimmt aber nicht allein den Verlauf. Welche Hilfe passt, hängt von Ihrer Situation ab. Sie dürfen sie nutzen, bevor Sie an eine Grenze kommen.
        </p>

        <div className="selbsttest-actions">
          <button className="btn btn-primary" onClick={() => { onClose(); onNavigate('modul4', 's2'); }}>
            Modul 4 — Wenn die Kraft nachlässt →
          </button>
          <button className="selbsttest-secondary" onClick={() => { onClose(); onNavigate('unterstuetzung'); }}>
            Unterstützung und Ressourcen →
          </button>
        </div>
    </ToolOverlay>
  );
}

// Map: tool-key → React-Komponente. Reihenfolge irrelevant; TOOLS in site-content.js steuert die Karten-Reihenfolge.
const TOOL_COMPONENTS = {
  atem:              AtemuebungTool,
  selbsttest:        SelbsttestTool,
  krisenplan:        KrisenplanTool,
  saeulen:           SaeulenCheckTool,
  eisberg:           EisbergTool,
  kommunikation:     KommunikationsTrainerTool,
  ee:                EeKreislaufTool,
  phasenverlauf:     PhasenverlaufTool,
  belastungsverlauf: BelastungsverlaufTool,
};

export { TOOL_COMPONENTS, KrisenplanTool };
