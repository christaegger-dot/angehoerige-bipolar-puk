import React from 'react';
import { navHandler, navHref } from './nav-handler.js';
import { Eisberg } from './modul2.jsx';
import { clearStoredDraft, loadStoredDraft, saveStoredDraft } from './storage.js';
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
            <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Durchatmen</h2>
            <p className="lede" style={{ maxWidth: '40ch' }}>Wenn der Moment gerade zu viel ist. Fünf Atemzüge in Ihrem Tempo — geführt durch einen Kreis, der mit Ihnen ein- und ausatmet.</p>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '40ch' }}>Einatmen 4 · Halten 2 · Ausatmen 6 · Pause 2. Wiederholt sich fünf Mal, etwa eine Minute.</p>
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
      { label: 'Erholsam, ich schlafe meistens gut durch', score: 0 },
      { label: 'Meist okay, aber mit unruhigen Nächten', score: 1 },
      { label: 'Oberflächlich — ich werde oft wach', score: 2 },
      { label: 'Gestört — ich liege wach oder kann nicht abschalten', score: 3 },
    ],
  },
  {
    q: 'Wie geht es Ihnen mit dem täglichen Funktionieren?',
    opts: [
      { label: 'Ich habe Energie für mehr als das Nötigste', score: 0 },
      { label: 'Ich schaffe, was ansteht — manchmal mit Mühe', score: 1 },
      { label: 'Ich funktioniere, fühle aber wenig', score: 2 },
      { label: 'Ich komme kaum noch durch den Tag', score: 3 },
    ],
  },
  {
    q: 'Wie ist Ihr Kontakt zu Menschen ausserhalb der Erkrankung?',
    opts: [
      { label: 'Regelmässig — ich pflege eigene Kontakte', score: 0 },
      { label: 'Reduziert, aber noch da', score: 1 },
      { label: 'Stark zurückgegangen', score: 2 },
      { label: 'Ich bin meist allein damit', score: 3 },
    ],
  },
  {
    q: 'Wenn jemand fragt «Wie geht es Ihnen?» — welche Antwort liegt am nächsten?',
    opts: [
      { label: 'Ich kann ehrlich antworten', score: 0 },
      { label: 'Ich antworte automatisch «gut»', score: 1 },
      { label: 'Ich weiss nicht mehr, wie es mir wirklich geht', score: 2 },
      { label: 'Mir fällt die Frage zunehmend schwer', score: 3 },
    ],
  },
  {
    q: 'In den letzten Wochen — wie geht es Ihnen innerlich?',
    opts: [
      { label: 'Belastet, aber im Gleichgewicht', score: 0 },
      { label: 'Wechselhaft — gute und schwere Tage', score: 1 },
      { label: 'Erschöpft, dünnhäutig, gereizt', score: 2 },
      { label: 'Leer, abgestumpft oder ständig in Alarm', score: 3 },
    ],
  },
];

function selbsttestZone(score) {
  if (score <= 3)  return 'getragen';
  if (score <= 7)  return 'schmal';
  if (score <= 11) return 'reserve';
  return 'notlage';
}

const SELBSTTEST_ZONEN = {
  getragen: {
    label: 'Getragen',
    sub: 'Sie wirken aktuell tragfähig unterwegs.',
    body: 'Das heisst nicht, dass alles leicht ist — sondern dass Sie im Moment Ressourcen haben, die mittragen. Wenn Sie Hintergrundwissen oder Sprache für die eigene Erfahrung suchen, ist Modul 1 der gute Einstieg.',
    primary: { text: 'Modul 1 — Die bipolare Störung verstehen', target: 'modul1' }, // top — Intro
  },
  schmal: {
    label: 'Schmal',
    sub: 'Erste Belastungsspuren sind erkennbar.',
    body: 'Was Sie beobachten ist verständlich. Modul 2 ordnet ein, was bei Angehörigen typisch ist — Hypervigilanz, der unsichtbare Anteil, der Eisberg unter der Oberfläche. Es geht nicht darum, sofort etwas zu ändern, sondern erst einmal zu verstehen, was läuft.',
    primary: { text: 'Modul 2 — Die eigene Belastung verstehen', target: 'modul2', anchor: 's2' }, // Eisberg
  },
  reserve: {
    label: 'Reserve',
    sub: 'Ihre Belastung ist deutlich.',
    body: 'Sie sind nicht «zu empfindlich». Modul 4 beschreibt, wie sich Erschöpfung über Zeit aufbaut und was helfen kann, wenn Sie an der Grenze sind. Eine kleine Entlastung jetzt verhindert oft eine grössere Krise später.',
    primary: { text: 'Modul 4 — Wenn die Kraft nachlässt', target: 'modul4', anchor: 's2' }, // Reservoir
    secondary: { text: 'Unterstützung und Ressourcen', target: 'unterstuetzung' },
  },
  notlage: {
    label: 'Notlage',
    sub: 'Sie sind am Limit.',
    body: 'Bitte holen Sie Unterstützung. Sie müssen das nicht weiter alleine tragen. Die Fachstelle Angehörigenarbeit PUK Zürich berät kostenlos und vertraulich — auch dann, wenn Sie noch nicht wissen, was Sie sagen wollen.',
    phone: { display: '058 384 38 00', href: 'tel:+41583843800', label: 'Fachstelle PUK Angehörigenarbeit' },
    primary: { text: 'Modul 4 — Wenn die Kraft nachlässt', target: 'modul4', anchor: 's7' }, // Erste Gegensteuerung
    secondary: { text: 'Notfallweg', target: 'notfall', urgent: true },
  },
};

function SelbsttestTool({ onClose, onNavigate }) {
  const [phase, setPhase] = React.useState('intro');
  const [answers, setAnswers] = React.useState([]);


  const start  = () => { setAnswers([]); setPhase('running'); };
  const answer = (score) => {
    const next = [...answers, score];
    setAnswers(next);
    if (next.length === SELBSTTEST_FRAGEN.length) setPhase('result');
  };
  const back     = () => setAnswers(answers.slice(0, -1));

  const qIdx = answers.length;
  const total = answers.reduce((a, b) => a + b, 0);
  const zoneKey = selbsttestZone(total);
  const zone = SELBSTTEST_ZONEN[zoneKey];

  const goto = (target, anchor) => { onNavigate(target, anchor); onClose(); };

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Belastungs-Selbsttest" cardClass="selbsttest-card">
      <span className="kicker">Werkzeug · Belastungs-Selbsttest</span>

        {phase === 'intro' && (
          <>
            <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Belastungs-Selbsttest</h2>
            <p className="lede" style={{ maxWidth: '44ch' }}>Fünf kurze Fragen, etwa zwei Minuten. Sie bekommen am Ende eine Einordnung — Information, Entlastung oder Gespräch — als Orientierung.</p>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '44ch' }}>Dieser Test ist keine Diagnose und kein Ersatz für eine fachliche Einschätzung. Er gibt Hinweise, wo Sie gerade stehen — anonym, im Browser. Ihre Antworten verlassen Ihr Gerät nicht. Bei akuter Gefahr ist dieses Werkzeug nicht der richtige erste Schritt: 144. Sonst hilft der <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallweg</a> oder eine professionelle Einschätzung.</p>
            <div style={{ marginTop: 24 }}>
              <button className="btn btn-primary" onClick={start}>Beginnen →</button>
            </div>
          </>
        )}

        {phase === 'running' && (
          <div className="selbsttest-q-block">
            <div className="selbsttest-progress">
              Frage {qIdx + 1} von {SELBSTTEST_FRAGEN.length}
              <span className="selbsttest-progress-bar"><span style={{ width: `${(qIdx / SELBSTTEST_FRAGEN.length) * 100}%` }}></span></span>
            </div>
            <div className="selbsttest-q">{SELBSTTEST_FRAGEN[qIdx].q}</div>
            <div className="selbsttest-options">
              {SELBSTTEST_FRAGEN[qIdx].opts.map((o, i) => (
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
            <div className={`selbsttest-zone selbsttest-zone-${zoneKey}`}>
              <span className="selbsttest-zone-kicker">Ihre Einordnung</span>
              <h2>{zone.label}</h2>
              <p className="selbsttest-zone-sub">{zone.sub}</p>
            </div>
            <p className="selbsttest-body">{zone.body}</p>

            {zone.phone && (
              <div className="selbsttest-phone">
                <a href={zone.phone.href} className="selbsttest-phone-num">{zone.phone.display}</a>
                <span className="selbsttest-phone-label">{zone.phone.label}</span>
              </div>
            )}

            <div className="selbsttest-actions">
              {zone.primary && (
                <button className="btn btn-primary" onClick={() => goto(zone.primary.target, zone.primary.anchor)}>
                  {zone.primary.text} →
                </button>
              )}
              {zone.secondary && (
                <button
                  className={`selbsttest-secondary ${zone.secondary.urgent ? 'selbsttest-secondary-alert' : ''}`}
                  onClick={() => goto(zone.secondary.target, zone.secondary.anchor)}
                >
                  {zone.secondary.text} →
                </button>
              )}
            </div>

            <div className="selbsttest-foot">
              <button className="tool-quiet-btn" onClick={start}>Test wiederholen</button>
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
    sub: 'Drei bis fünf konkrete Verhaltensänderungen, die typischerweise vor einer Episode auftreten.',
    placeholder: 'z.B.\n— Schlaf unter 5 Stunden\n— auffällig viele neue Pläne\n— Geldausgaben verändern sich\n— Reizbarkeit, Rückzug',
    kind: 'textarea',
    rows: 5,
  },
  {
    id: 'schritte',
    label: 'Erste Schritte bei Verschlechterung',
    sub: 'In welcher Reihenfolge handeln wir? Konkret und geordnet.',
    placeholder: 'z.B.\n1. Hausärztin / behandelnde Psychiaterin anrufen\n2. Termin innerhalb von 48 Stunden\n3. Krisenplan mit erkrankter Person aktivieren\n4. Bei akuter Gefährdung → 144 / 117',
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
    sub: 'Wo möchten wir eine Behandlung — und wer ist Ansprechperson?',
    placeholder: 'z.B. PUK Zürich · Notfall Erwachsene 058 384 20 00',
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
    placeholder: 'z.B.\n— lange Diskussionen über die Wahrnehmung\n— Vorhaltungen, Schuldzuweisungen\n— Schweigen aus Angst\n— ohne Vorwarnung Polizei',
    kind: 'textarea',
    rows: 4,
  },
];

const KRISENPLAN_NOTFALLNUMMERN = [
  { num: '144', label: 'Sanität · Lebensgefahr · 24 h' },
  { num: '117', label: 'Polizei · Gewalt · Bedrohung' },
  { num: '143', label: 'Dargebotene Hand · anonym · 24 h' },
  { num: '147', label: 'Pro Juventute · Kinder & Jugendliche · 24 h' },
  { num: '0800 33 66 55', label: 'Ärztefon ZH · Notfalldienst · 24 h' },
  { num: '058 384 20 00', label: 'PUK Notfall Erwachsene · 24 h' },
  { num: '058 384 38 00', label: 'Fachstelle Angehörigenarbeit PUK · werktags' },
];

const KRISENPLAN_STORAGE_KEY = 'puk-krisenplan-v1';

function KrisenplanTool({ onClose, onNavigate }) {
  const initialState = React.useMemo(() => loadStoredDraft(KRISENPLAN_STORAGE_KEY), []);
  const [data, setData] = React.useState(initialState.data);
  const [remember, setRemember] = React.useState(initialState.remember);
  const [savedHint, setSavedHint] = React.useState('');
  const savedTimer = React.useRef(null);


  React.useEffect(() => () => {
    if (savedTimer.current) window.clearTimeout(savedTimer.current);
  }, []);

  const update = (id, value) => {
    const next = { ...data, [id]: value, _updated: new Date().toISOString() };
    setData(next);
    saveStoredDraft(KRISENPLAN_STORAGE_KEY, next, remember);
    setSavedHint('Gespeichert');
    if (savedTimer.current) window.clearTimeout(savedTimer.current);
    savedTimer.current = window.setTimeout(() => setSavedHint(''), 1600);
  };

  const reset = () => {
    if (window.confirm('Krisenplan zurücksetzen? Alle Eingaben gehen verloren.')) {
      setData({});
      clearStoredDraft(KRISENPLAN_STORAGE_KEY);
    }
  };

  const toggleRemember = () => {
    const nextRemember = !remember;
    setRemember(nextRemember);
    saveStoredDraft(KRISENPLAN_STORAGE_KEY, data, nextRemember);
  };

  const lastUpdate = data._updated
    ? new Date(data._updated).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null;

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Krisenplan" overlayClass="krisenplan-overlay" cardClass="krisenplan-card" noPrint={true}>
        <header className="krisenplan-head">
          <span className="kicker">Werkzeug · Krisenplan</span>
          <h2>Krisenplan</h2>
          <p className="krisenplan-intro">In ruhiger Phase ausfüllen. In der Krise nur noch lesen — Sie müssen nicht mehr entscheiden, sondern handeln. Standardmässig bleibt der Entwurf nur bis zum Schliessen dieses Tabs erhalten und wird nicht versendet. Wenn Sie drucken oder als PDF speichern, entstehen zusätzliche Kopien auf Ihrem Gerät. Auf gemeinsam genutzten Geräten können Sie den Entwurf unten zusätzlich dauerhaft löschen.</p>
          {lastUpdate && (
            <p className="krisenplan-meta">Zuletzt bearbeitet: {lastUpdate}</p>
          )}
          <label className="storage-toggle no-print">
            <input type="checkbox" checked={remember} onChange={toggleRemember} />
            <span>Auf diesem Gerät dauerhaft behalten</span>
          </label>
        </header>

        <div className="krisenplan-fields">
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

        <section className="krisenplan-notruf">
          <span className="krisenplan-notruf-kicker">Notfallnummern · Schweiz</span>
          <ul>
            {KRISENPLAN_NOTFALLNUMMERN.map((n) => (
              <li key={n.num}>
                <span className="krisenplan-notruf-num">{n.num}</span>
                <span className="krisenplan-notruf-label">{n.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="krisenplan-actions no-print">
          <div className="krisenplan-actions-left">
            <button className="btn btn-primary" onClick={() => window.print()}>Drucken / als PDF speichern</button>
            <button className="tool-quiet-btn" onClick={reset}>zurücksetzen</button>
          </div>
          <div className="krisenplan-saved" aria-live="polite">{savedHint}</div>
        </div>

        <p className="krisenplan-disclaimer no-print">
          Dieser Plan ersetzt keine professionelle Beratung. Bei akuter Gefährdung gilt der <a href={navHref('notfall')} onClick={(e) => { e.preventDefault(); onClose(); onNavigate('notfall'); }}>Notfallweg</a>.
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
        q: 'Haben Sie professionelle Unterstützung — für sich selbst, nicht für die erkrankte Person?',
        opts: [
          { label: 'Ja, in regelmässigem Kontakt', score: 3 },
          { label: 'Ja, aber selten genutzt', score: 2 },
          { label: 'Nein, aber ich überlege', score: 1 },
          { label: 'Nein', score: 0 },
        ],
      },
      {
        q: 'Kennen Sie eine Anlaufstelle, an die Sie sich bei Bedarf wenden würden?',
        opts: [
          { label: 'Ja, ich weiss wohin', score: 3 },
          { label: 'Vage — ich müsste suchen', score: 2 },
          { label: 'Eher nicht', score: 1 },
          { label: 'Nein', score: 0 },
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
  let saeuleScores = null, weakest = null, strongest = null;
  if (phase === 'result') {
    saeuleScores = SAEULEN_DEF.map((s) => {
      const total = answers.reduce(
        (sum, score, i) => SAEULEN_ALL_QUESTIONS[i].saeule === s.key ? sum + score : sum,
        0
      );
      return { ...s, score: total, max: s.questions.length * 3 };
    });
    const sortedAsc = [...saeuleScores].sort((a, b) => (a.score / a.max) - (b.score / b.max));
    weakest = sortedAsc[0];
    strongest = sortedAsc[sortedAsc.length - 1];
  }

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Säulen-Check" cardClass="selbsttest-card">
      <span className="kicker">Werkzeug · Säulen-Check</span>

        {phase === 'intro' && (
          <>
            <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Säulen-Check</h2>
            <p className="lede" style={{ maxWidth: '44ch' }}>Acht kurze Fragen zu vier Bereichen, die Angehörige langfristig tragen: Körper, Beziehungen, eigene Welt, fachlicher Halt. Sie sehen am Ende, wo die Architektur gerade hält und wo eine Stütze nachgezogen werden müsste.</p>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '44ch' }}>Etwa drei Minuten. Anonym, im Browser. Keine Diagnose und nicht für akute Krisen gedacht — nur eine Standortbestimmung. Bei akuter Gefahr: 144. Sonst hilft der <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallweg</a> oder eine professionelle Einschätzung.</p>
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
              <span className="selbsttest-zone-kicker">Ihre Säulen jetzt</span>
              <h2>Tragwerk</h2>
              <p className="selbsttest-zone-sub">Die Höhe der Säulen zeigt, wie viel Tragfähigkeit gerade in jedem Bereich da ist.</p>
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

            <p className="selbsttest-body">
              {weakest && weakest.score / weakest.max < 0.5 ? (
                <>
                  Am dünnsten ist gerade <strong style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{weakest.label}</strong>. Das ist kein Befund, sondern ein Hinweis — meistens reicht eine kleine, regelmässige Bewegung in dem Bereich, um die ganze Architektur stabiler zu machen.
                </>
              ) : (
                <>
                  Ihre vier Stützen sind insgesamt tragfähig. Was am stärksten trägt, ist gerade <strong style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{strongest.label}</strong> — gut, dass es da ist. Wenn Sie eine Stütze gezielt stärken wollen: <strong style={{ fontStyle: 'italic' }}>{weakest.label}</strong> hat aktuell am meisten Spielraum.
                </>
              )}
            </p>

            <div className="selbsttest-actions">
              <button className="btn btn-primary" onClick={() => { onNavigate('modul7', 's4'); onClose(); }}>
                Modul 7 — Langfristige Tragfähigkeit →
              </button>
              <button className="selbsttest-secondary" onClick={() => { onNavigate('unterstuetzung'); onClose(); }}>
                Unterstützung und Ressourcen →
              </button>
            </div>

            <div className="selbsttest-foot">
              <button className="tool-quiet-btn" onClick={start}>Test wiederholen</button>
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
      desc: 'Nicht die Müdigkeit nach einer langen Woche, sondern die, die auch mit Schlaf nicht weggeht. Der Effekt einer langen, stillen Daueraufmerksamkeit.',
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
      desc: 'Um das, was war. Um die Pläne, die nicht so kamen. Um den Menschen, wie er einmal war. Pauline Boss nennt das «Ambiguous Loss» — Trauer um jemanden, der noch da ist.',
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
            <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Der Eisberg Ihrer Belastung</h2>
            <p className="lede" style={{ maxWidth: '46ch' }}>Was nach aussen sichtbar ist — Sorge, Geduld, Hilfsbereitschaft — ist nur die Spitze. Darunter liegt das, was Angehörige selten zeigen, oft nicht einmal vor sich selbst zugeben.</p>
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
              <h2>{marked.size === 1 ? 'Eine Belastung erkannt' : `${marked.size} Belastungen erkannt`}</h2>
              <p className="selbsttest-zone-sub">Diese Gefühle sind real. Sie sind die normale Innenseite einer ungewöhnlichen Situation — keine Schwäche, kein Charakterfehler.</p>
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
              Wenn Sie mehr über diese Innenseite verstehen wollen — Modul 2 ordnet ein, was bei Angehörigen typisch ist und wie Hypervigilanz, Eisberg und Schonhaltung zusammenhängen.
            </p>

            <div className="selbsttest-actions">
              <button className="btn btn-primary" onClick={() => { onNavigate('modul2', 's2'); onClose(); }}>
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
    eroeffnung: 'Hast du heute Abend zehn Minuten? Ich möchte etwas mit dir besprechen — nichts Dringendes, aber etwas Wichtiges.',
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
const KOMMUNIKATION_DEFAULT = { anlass: '', beobachtung: '', wirkung: '', bitte: '' };

function KommunikationsTrainerTool({ onClose, onNavigate }) {
  const initialState = React.useMemo(
    () => loadStoredDraft(KOMMUNIKATION_STORAGE_KEY, KOMMUNIKATION_DEFAULT),
    [],
  );
  const [step, setStep] = React.useState('intro'); // intro | anlass | beobachtung | wirkung | bitte | result
  const [data, setData] = React.useState(initialState.data);
  const [remember, setRemember] = React.useState(initialState.remember);
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
    setData((d) => {
      const next = { ...d, [key]: value };
      saveStoredDraft(KOMMUNIKATION_STORAGE_KEY, next, remember);
      return next;
    });
  };

  const start = () => setStep('anlass');
  const reset = () => {
    if (window.confirm('Skript zurücksetzen? Alle Eingaben gehen verloren.')) {
      setData(KOMMUNIKATION_DEFAULT);
      clearStoredDraft(KOMMUNIKATION_STORAGE_KEY);
      setStep('anlass');
    }
  };

  const toggleRemember = () => {
    const nextRemember = !remember;
    setRemember(nextRemember);
    saveStoredDraft(KOMMUNIKATION_STORAGE_KEY, data, nextRemember);
  };

  const anlass = KOMMUNIKATION_ANLAESSE.find((a) => a.key === data.anlass) || KOMMUNIKATION_ANLAESSE[0];
  const eroeffnung = anlass.eroeffnung;

  const skript = `${eroeffnung}\n\n${data.beobachtung || '[Ihre Beobachtung]'}\n\n${data.wirkung || '[Wirkung auf Sie]'}\n\n${data.bitte || '[Ihre Bitte]'}`;

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
            <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Kommunikations-Trainer</h2>
            <p className="lede" style={{ maxWidth: '46ch' }}>Vier kurze Schritte für ein schwieriges Gespräch. Am Ende haben Sie ein eigenes Skript — in Ihren Worten, in einer Form, die nicht eskaliert.</p>
            <p style={{ color: 'var(--ink-soft)', maxWidth: '46ch' }}>Nicht jedes Gespräch funktioniert nach Plan. Aber ein vorbereitetes Skript hilft, in der Spannung nicht das eigene Anliegen zu verlieren. Dieses Werkzeug ist nicht für akute Manie, Psychose, Gewalt oder akute Suizidalität gedacht. Bei akuter Gefahr: 144. Sonst hilft der <a href={navHref('notfall')} onClick={navHandler('notfall', onNavigate)}>Notfallweg</a> oder eine professionelle Einschätzung. Standardmässig bleibt Ihr Entwurf nur bis zum Schliessen dieses Tabs erhalten. Wenn Sie das Skript kopieren, liegt es zusätzlich in der Zwischenablage Ihres Geräts. Auf gemeinsam genutzten Geräten können Sie den Entwurf jederzeit zurücksetzen.</p>
            <label className="storage-toggle">
              <input type="checkbox" checked={remember} onChange={toggleRemember} />
              <span>Auf diesem Gerät dauerhaft behalten</span>
            </label>
            <div style={{ marginTop: 24 }}>
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
            <h3 className="kommunikation-q">Was haben Sie konkret beobachtet?</h3>
            <p className="kommunikation-hint">{KOMMUNIKATION_HINWEISE.beobachtung}</p>
            <textarea
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
            <h3 className="kommunikation-q">Was macht das mit Ihnen?</h3>
            <p className="kommunikation-hint">{KOMMUNIKATION_HINWEISE.wirkung}</p>
            <textarea
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
            <div className="kommunikation-progress">Schritt 4 von 4 · Bitte</div>
            <h3 className="kommunikation-q">Was wäre Ihr Anliegen oder Ihre Bitte?</h3>
            <p className="kommunikation-hint">{KOMMUNIKATION_HINWEISE.bitte}</p>
            <textarea
              className="krisenplan-textarea"
              rows={5}
              value={data.bitte}
              onChange={(e) => updateField('bitte', e.target.value)}
              placeholder="z.B. Können wir vielleicht zusammen schauen, ob ein Termin bei der Ärztin schon Sinn machen würde?"
            />
            <div className="kommunikation-nav">
              <button className="tool-quiet-btn" onClick={() => setStep('wirkung')}>← zurück</button>
              <button className="btn btn-primary" onClick={() => setStep('result')}>Skript ansehen →</button>
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
              <div className="kommunikation-zeile">
                <span className="kommunikation-rolle">Bitte</span>
                <p>«{data.bitte || '— noch nicht ausgefüllt —'}»</p>
              </div>
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
                <li>Wenn es eskaliert: «Ich brauche kurz Pause» ist kein Aufgeben</li>
                <li>Wer zu schnell weiterspricht, raubt der anderen Person den Raum für eine echte Antwort</li>
              </ul>
            </aside>

            <div className="selbsttest-actions">
              <button className="btn btn-primary" onClick={copyToClipboard}>Skript kopieren</button>
              <button className="selbsttest-secondary" onClick={() => { onNavigate('modul6', 's4'); onClose(); }}>
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
              <button className="tool-quiet-btn" onClick={reset}>zurücksetzen</button>
              <button className="tool-quiet-btn" onClick={onClose}>schliessen</button>
            </div>
          </div>
        )}
    </ToolOverlay>
  );
}

const EE_PHASEN = [
  {
    key: 'schuld',
    label: 'Schuld',
    pos: { left: '50%', top: '14%' },
    desc: '«Hätte ich die Warnzeichen früher erkannt? Mache ich genug?» Die Schuld treibt Sie zu noch mehr Kontrolle und Aufmerksamkeit.',
    unterbrechen: 'Schuld als Gefühl bemerken, nicht als Urteil. Modul 5 vertieft: «Schuldgefühl ist kein Beweis von Schuld.» Es kann auch dann kommen, wenn Sie etwas Richtiges tun.',
  },
  {
    key: 'engagement',
    label: 'Überengagement',
    pos: { left: '86%', top: '50%' },
    desc: 'Sie übernehmen alles: Medikamente, Termine, Stimmungs-Monitoring, Krisenmanagement. Die erkrankte Person verliert Eigenverantwortung — und Sie verlieren Spielraum.',
    unterbrechen: 'Eine einzige Aufgabe abgeben. Nicht alle. Eine. Etwas, das auch jemand anderes tragen kann — Geschwister, Behandlungsteam, Spitex.',
  },
  {
    key: 'erschoepfung',
    label: 'Erschöpfung',
    pos: { left: '50%', top: '86%' },
    desc: 'Irgendwann kippen Sie. Die Belastung wird zu Gereiztheit — ungewollt, aber unvermeidlich. Energie und Geduld werden dünn.',
    unterbrechen: 'Den Pegel früher benennen. Selbsttest oder Säulen-Check zeigen, wo Sie stehen, bevor das Limit erreicht ist.',
  },
  {
    key: 'kritik',
    label: 'Kritik',
    pos: { left: '14%', top: '50%' },
    desc: 'Sätze, die Sie bereuen. Vorwürfe, die verletzen. Danach kommt die Schuld zurück — und der Kreislauf beginnt von vorn.',
    unterbrechen: 'Pause statt Reaktion. «Ich brauche kurz Pause» ist kein Aufgeben. Es verhindert, dass eine angespannte Situation zu einem verletzenden Gespräch wird.',
  },
];

function EeKreislaufTool({ onClose, onNavigate }) {
  const [selected, setSelected] = React.useState('schuld');
  const [view, setView] = React.useState('was'); // 'was' | 'unterbrechen'


  const cur = EE_PHASEN.find((p) => p.key === selected);
  const curIdx = EE_PHASEN.findIndex((p) => p.key === selected);

  return (
    <ToolOverlay onClose={onClose} ariaLabel="EE-Kreislauf" cardClass="ee-card">
      <span className="kicker">Werkzeug · Beziehung</span>
        <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Der EE-Kreislauf</h2>
        <p className="ee-intro">Wie Schuld, Überengagement, Erschöpfung und Kritik sich gegenseitig hochschaukeln — und wo der Kreislauf unterbrechbar ist. Klicken Sie auf eine Phase.</p>

        <div className="ee-stage">
          <svg viewBox="0 0 400 400" className="ee-svg" aria-hidden="true">
            <defs>
              <marker id="ee-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* Vier Bögen im Uhrzeigersinn — Schuld → Engagement → Erschöpfung → Kritik → Schuld */}
            <path d="M 240,80 A 130,130 0 0 1 320,240" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ee-arrow)" />
            <path d="M 320,240 A 130,130 0 0 1 240,320" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ee-arrow)" />
            <path d="M 160,320 A 130,130 0 0 1 80,240" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ee-arrow)" />
            <path d="M 80,160 A 130,130 0 0 1 160,80" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ee-arrow)" />

            {/* Zentraler Kreislauf-Hinweis */}
            <text x="200" y="195" textAnchor="middle" fontFamily="var(--serif-display)" fontStyle="italic" fontSize="14" fill="var(--ink-mute)">
              Kreislauf
            </text>
            <text x="200" y="215" textAnchor="middle" fontFamily="var(--sans)" fontSize="10" letterSpacing="0.14em" fill="var(--ink-mute)">
              UNTERBRECHBAR
            </text>
          </svg>

          {EE_PHASEN.map((p, i) => (
            <button
              key={p.key}
              className={`ee-node ${selected === p.key ? 'is-selected' : ''}`}
              style={{ left: p.pos.left, top: p.pos.top }}
              onClick={() => setSelected(p.key)}
              aria-pressed={selected === p.key}
            >
              <span className="ee-node-num">{i + 1}</span>
              <span className="ee-node-label">{p.label}</span>
            </button>
          ))}
        </div>

        <div className="ee-detail">
          <div className="ee-detail-head">
            <span className="ee-detail-num">Phase {curIdx + 1} von 4</span>
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
          <button className="btn btn-primary" onClick={() => { onNavigate('modul5', 's3'); onClose(); }}>
            Modul 5 — Loyalitätskonflikte →
          </button>
          <button className="selbsttest-secondary" onClick={() => { onNavigate('modul2', 's3'); onClose(); }}>
            Modul 2 — Eigene Belastung →
          </button>
        </div>

        <p className="ee-foot-note">
          EE-Kreislauf ist selten Bosheit — meist Überlastung, die in Beziehungssprache kippt. Schon das Erkennen des Musters ist ein erster Schritt, es zu durchbrechen.
        </p>
    </ToolOverlay>
  );
}

const PHASEN_VARIANTEN = [
  {
    key: 'bipolar1',
    label: 'Bipolar I',
    sub: 'die «sichtbare» Form',
    path: 'M 0,90 L 60,90 Q 90,30 120,55 Q 150,90 180,135 Q 210,160 230,140 Q 260,90 320,90 Q 350,40 380,75 L 400,90',
    desc: 'Vollständige manische Episoden mit oft sichtbarer Eskalation. Die Manie kann so schwer werden, dass eine Hospitalisation nötig wird. Dazwischen tiefe depressive Phasen und längere stabile Strecken.',
    angehoerige: 'Sichtbare Eskalation steht im Vordergrund — Kontrollverlust, Angst, das Gefühl, den vertrauten Menschen zeitweise nicht wiederzuerkennen.',
  },
  {
    key: 'bipolar2',
    label: 'Bipolar II',
    sub: 'die «unsichtbare» Form',
    path: 'M 0,90 L 50,90 Q 70,60 95,75 Q 110,90 135,140 Q 175,165 215,160 Q 250,150 280,90 Q 295,68 320,80 Q 340,90 360,140 Q 380,160 400,150',
    desc: 'Statt vollständiger Manien treten Hypomanien auf — abgeschwächte, kürzere Hochphasen von 4–7 Tagen. Die depressiven Phasen sind oft schwerer und dauern länger als bei Bipolar I.',
    angehoerige: 'Die eigentliche Krankheitslast liegt in der langen, zermürbenden Depression — die von aussen oft kaum sichtbar ist. Angehörige fühlen sich häufig nicht ernst genommen.',
  },
  {
    key: 'misch',
    label: 'Mischzustände',
    sub: 'wenn beide Pole gleichzeitig',
    path: 'M 0,90 L 30,80 Q 50,55 70,100 Q 90,140 110,75 Q 130,40 155,120 Q 175,150 200,80 Q 220,55 250,135 Q 280,155 305,90 Q 325,55 350,130 L 400,110',
    desc: 'Beide Pole sind gleichzeitig da: rasende Gedanken bei tiefer Hoffnungslosigkeit, gereizte Manie statt Euphorie, schnelle Wechsel ohne klaren Boden. Klinisch besonders belastend.',
    angehoerige: 'Für Angehörige gehören Mischzustände zu den schwersten Phasen, weil Energie und Verzweiflung zusammenkommen — und weil die übliche Phasenlehre nicht greift.',
  },
  {
    key: 'stabil',
    label: 'Stabile Phase',
    sub: 'ambivalent, nicht entlastet',
    path: 'M 0,92 Q 50,85 100,93 Q 150,88 200,92 Q 250,87 300,90 Q 350,93 400,88',
    desc: 'Keine Episode — aber selten echte innere Pause. Restsymptome können bestehen bleiben, und die Frage «ist das jetzt Stabilität oder schon der Beginn einer neuen Phase?» läuft mit.',
    angehoerige: 'Stabile Phasen sind wertvoll für Planung und Gespräche, aber nicht automatisch entlastend. Viele Angehörige bleiben innerlich wachsam, auch wenn nach aussen Ruhe sichtbar ist.',
  },
];

function PhasenverlaufTool({ onClose, onNavigate }) {
  const [active, setActive] = React.useState('bipolar1');


  const cur = PHASEN_VARIANTEN.find((p) => p.key === active);

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Bipolarer Phasenverlauf" cardClass="phasen-card">
      <span className="kicker">Werkzeug · Interaktiv</span>
        <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Bipolarer Phasenverlauf</h2>
        <p className="ee-intro">Bipolare Verläufe sehen selten gleich aus. Vier typische Muster zur Orientierung — wählen Sie eines, um den Verlauf und seine typischen Eigenheiten zu sehen. Nicht dargestellt sind damit automatisch alle Varianten, etwa Zyklothymie oder besonders unruhige Mischverläufe.</p>

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

        <figure className="phasen-figure">
          <svg viewBox="0 0 420 200" className="phasen-svg" aria-hidden="true">
            <defs>
              <linearGradient id="phasen-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--accent)" stopOpacity="0.18" />
                <stop offset="1" stopColor="var(--accent)" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            {/* Achsen-Beschriftung */}
            <text x="6" y="14" fontFamily="var(--sans)" fontSize="9" letterSpacing="0.12em" fill="var(--ink-mute)" fontWeight="600">MANIE</text>
            <text x="6" y="178" fontFamily="var(--sans)" fontSize="9" letterSpacing="0.12em" fill="var(--ink-mute)" fontWeight="600">DEPRESSION</text>
            <text x="395" y="100" fontFamily="var(--sans)" fontSize="9" letterSpacing="0.06em" fill="var(--ink-mute)" textAnchor="end">Zeit →</text>

            {/* Neutral-Linie */}
            <line x1="10" y1="90" x2="400" y2="90" stroke="var(--ink-mute)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.35" />

            {/* Verlauf — Pfad gefüllt + Linie */}
            <path d={cur.path + ' L 400,90 L 10,90 Z'} transform="translate(10 0)" fill="url(#phasen-fill)" />
            <path d={cur.path} transform="translate(10 0)" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <figcaption>Schematische Darstellung zur Orientierung — kein Diagnosewerkzeug. Reale Verläufe, Übergänge und Zwischenphasen variieren stark.</figcaption>
        </figure>

        <div className="ee-detail">
          <div className="ee-detail-head">
            <span className="ee-detail-num">{cur.label} · {cur.sub}</span>
            <h3>Was passiert</h3>
          </div>
          <div className="ee-detail-body">
            <p>{cur.desc}</p>
          </div>
        </div>

        <div className="ee-detail">
          <div className="ee-detail-head">
            <h3>Was Angehörige merken</h3>
          </div>
          <div className="ee-detail-body">
            <p>{cur.angehoerige}</p>
          </div>
        </div>

        <div className="selbsttest-actions">
          <button className="btn btn-primary" onClick={() => { onNavigate('modul1', 's4'); onClose(); }}>
            Modul 1 — Die bipolare Störung verstehen →
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
    { x: 110, y: 60,  label: 'Erste Episode', text: 'Frühphase — Notfallmodus. Sie schalten in den Krisenmodus: organisieren, Verantwortung übernehmen, funktionieren. Die eigene Erschöpfung ist noch zweitrangig.' },
    { x: 220, y: 95, label: 'Wiederkehr', text: 'Kumulation. Jede Episode hinterlässt Spuren: Schlafmangel, Misstrauen gegenüber Ruhe, mehr Wachsamkeit, weniger innere Reserve. Die Hoffnung wird vorsichtiger.' },
    { x: 330, y: 130, label: 'Chronische Phase', text: 'Dauer-Alarm. Die Belastung wird zu einem Hintergrundzustand. Schlafprobleme, Gereiztheit, Rückzug bleiben auch dann spürbar, wenn keine akute Krise sichtbar ist.' },
  ];
  const activateEpisode = React.useCallback((index) => {
    setActiveEpisode(index);
  }, []);

  return (
    <ToolOverlay onClose={onClose} ariaLabel="Belastungsverlauf" cardClass="phasen-card">
      <span className="kicker">Werkzeug · Verlauf</span>
        <h2 style={{ fontStyle: 'italic', marginTop: 8 }}>Belastungsverlauf über Jahre</h2>
        <p className="ee-intro">Wie sich die Belastbarkeit von Angehörigen über mehrere Episoden verändern kann — und welchen Unterschied Unterstützung macht. Klicken Sie auf eine Episode für die typische Phase.</p>

        <div className="belastung-toggle">
          <button
            className={`belastung-toggle-btn ${!showSupport ? 'is-active' : ''}`}
            onClick={() => setShowSupport(false)}
          >
            ohne Unterstützung
          </button>
          <button
            className={`belastung-toggle-btn ${showSupport ? 'is-active' : ''}`}
            onClick={() => setShowSupport(true)}
          >
            mit Unterstützung
          </button>
        </div>

        <figure className="phasen-figure">
          <svg viewBox="0 0 420 200" className="phasen-svg" role="img" aria-label="Belastungsverlauf von Angehörigen über mehrere Episoden, mit drei klickbaren Phasen-Markern.">
            {/* Achsen */}
            <text x="6" y="14" fontFamily="var(--sans)" fontSize="9" letterSpacing="0.12em" fill="var(--ink-mute)" fontWeight="600">VOLL</text>
            <text x="6" y="178" fontFamily="var(--sans)" fontSize="9" letterSpacing="0.12em" fill="var(--ink-mute)" fontWeight="600">RESERVE</text>
            <text x="395" y="100" fontFamily="var(--sans)" fontSize="9" letterSpacing="0.06em" fill="var(--ink-mute)" textAnchor="end">Zeit →</text>

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
              ohne Hilfe
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
                  mit Hilfe
                </text>
              </>
            )}

            {/* Episoden-Marker */}
            {episoden.map((ep, i) => (
              <g
                key={i}
                onClick={() => activateEpisode(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activateEpisode(i);
                  }
                }}
                style={{ cursor: 'pointer' }}
                tabIndex={0}
                role="button"
                aria-label={ep.label}
                aria-pressed={activeEpisode === i}
              >
                {/* Unsichtbarer 22px-Circle vergrössert das Touch-Target über den 14px-Marker hinaus auf min. 44px Durchmesser. */}
                <circle cx={ep.x} cy={ep.y} r="22" fill="transparent" pointerEvents="all" />
                <circle cx={ep.x} cy={ep.y} r="14" fill="var(--bg)" stroke={activeEpisode === i ? 'var(--accent)' : 'var(--ink-mute)'} strokeWidth={activeEpisode === i ? 2 : 1.2} />
                <text x={ep.x} y={ep.y + 4} textAnchor="middle" fontFamily="var(--mono)" fontSize="11" fill={activeEpisode === i ? 'var(--accent)' : 'var(--ink)'} fontWeight={activeEpisode === i ? 600 : 400}>
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>
          <figcaption>Schematisches Modell — basierend auf Perlick et al. (2007), Reinares et al. (2016).</figcaption>
        </figure>

        {activeEpisode !== null && (
          <div className="ee-detail">
            <div className="ee-detail-head">
              <span className="ee-detail-num">Phase {activeEpisode + 1}</span>
              <h3>{episoden[activeEpisode].label}</h3>
            </div>
            <div className="ee-detail-body">
              <p>{episoden[activeEpisode].text}</p>
            </div>
          </div>
        )}

        <p className="ee-foot-note">
          Belastung fällt mit jeder Episode oft nicht vollständig auf das vorherige Niveau zurück. Mit Unterstützung — Beratung, Selbsthilfegruppe, eigene Therapie — kann Belastbarkeit wieder tragfähiger werden, auch wenn die Ausgangslage nicht ungeschehen wird.
        </p>

        <div className="selbsttest-actions">
          <button className="btn btn-primary" onClick={() => { onNavigate('modul4', 's2'); onClose(); }}>
            Modul 4 — Wenn die Kraft nachlässt →
          </button>
          <button className="selbsttest-secondary" onClick={() => { onNavigate('unterstuetzung'); onClose(); }}>
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
