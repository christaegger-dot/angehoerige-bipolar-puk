
function BarrierefreiheitPage() {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Barrierefreiheit</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '22ch' }}>Erklärung zur Barrierefreiheit.</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '54ch' }}>
            Diese Lese-Begleitung soll für alle Angehörigen zugänglich sein — auch unter Stress,
            mit Sehhilfe, mit Tastatur statt Maus, mit Screenreader oder bei langsamer Verbindung.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <article className="prose">

            <h2>Stand der Vereinbarkeit</h2>
            <p>
              Die Lese-Begleitung wurde an den <strong>Web Content Accessibility Guidelines (WCAG) 2.1 auf
              Konformitätsstufe AA</strong> ausgerichtet und intern mit Tastatur, Screenreader-Semantik und
              responsiven Layouts geprüft. Eine formale externe Konformitätsprüfung liegt derzeit nicht vor.
            </p>

            <h2>Was umgesetzt ist</h2>
            <ul>
              <li><strong>Tastatur-Bedienbarkeit</strong>: Alle interaktiven Elemente (Navigation, Werkzeuge, Modul-Überblick, Orientierungsfragen, Notfall-Akkordeon) sind ohne Maus erreichbar; sichtbarer Fokusrahmen.</li>
              <li><strong>Screenreader-Unterstützung</strong>: Semantisches HTML, ARIA-Beschriftungen, Skip-Link zum Hauptinhalt, Fokus-Management in Dialogen.</li>
              <li><strong>Kontrast</strong>: Text gegenüber Hintergrund mindestens 4.5:1, UI-Elemente mindestens 3:1.</li>
              <li><strong>Skalierbarkeit</strong>: Layout bleibt bei 200%-Zoom nutzbar; Schriftgrössen in relativen Einheiten.</li>
              <li><strong>Touch-Ziele</strong>: Schaltflächen und Links auf mobilen Geräten mindestens 44 × 44 Pixel.</li>
              <li><strong>Keine Auto-Play-Inhalte</strong>: Keine selbst startenden Videos, Audios oder Animationen, die Aufmerksamkeit beanspruchen.</li>
              <li><strong>Druck-Versionen</strong>: Werkzeuge und Handouts sind als saubere PDFs druckbar.</li>
            </ul>

            <h2>Bekannte Einschränkungen</h2>
            <ul>
              <li>Die Anwendung wurde intern getestet, aber noch nicht mit einer vollständigen externen WCAG-AA-Prüfung abgenommen.</li>
              <li>Einzelne interaktive Visualisierungen werden laufend auf noch stärkere Tastatur- und Screenreader-Unterstützung nachgerüstet.</li>
              <li>Kontrastwerte werden bei jeder Farb- oder Typografie-Anpassung erneut überprüft, sind aber noch nicht separat dokumentiert veröffentlicht.</li>
            </ul>
            <p>Sollten Sie auf eine Barriere stossen — etwa einen unleserlichen Bereich, eine nicht erreichbare Funktion oder einen vom Screenreader falsch ausgesprochenen Text — melden Sie es uns bitte.</p>

            <h2>Feedback &amp; Kontakt</h2>
            <p>
              Wenn Sie Schwierigkeiten beim Zugang zu Inhalten feststellen oder Barrierefreiheits-Verbesserungen
              vorschlagen möchten, freuen wir uns über Ihre Rückmeldung:
            </p>
            <div className="contact-info-block">
              <div className="label">E-MAIL</div>
              <div className="value"><a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a></div>
              <div className="sub">Bitte schildern Sie das Problem so konkret wie möglich (Seite, Browser, Hilfsmittel). Antwort innerhalb von zwei Werktagen.</div>
            </div>
            <div className="contact-info-block">
              <div className="label">POSTANSCHRIFT</div>
              <div className="value">Fachstelle Angehörigenarbeit · PUK Zürich</div>
              <div className="sub">Lenggstrasse 31, Postfach, 8032 Zürich</div>
            </div>

            <h2>Durchsetzungsverfahren</h2>
            <p>
              Diese Lese-Begleitung ist ein Angebot der Psychiatrischen Universitätsklinik Zürich (PUK) und
              fällt unter die Zugänglichkeits-Standards des kantonalen Gesundheitswesens. Sollten Sie auf
              eine Rückmeldung keine zufriedenstellende Antwort erhalten, können Sie sich an die
              Schweizerische Stiftung «Zugang für alle» oder an Pro&nbsp;Infirmis wenden.
            </p>

            <p style={{ marginTop: 56, color: 'var(--ink-3)', fontSize: 14 }}>
              Stand: April 2026 · Selbstbewertung
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { BarrierefreiheitPage };
