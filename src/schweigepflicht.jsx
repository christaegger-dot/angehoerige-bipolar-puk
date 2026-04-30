
function SchweigepflichtPage() {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Praktische Referenz</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '22ch' }}>Schweigepflichtentbindung — kurz erklärt.</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '60ch' }}>
            Damit Behandelnde mit Ihnen sprechen dürfen, braucht es eine Erlaubnis der erkrankten Person.
            Diese Seite erklärt, was die Entbindung leistet, was sie nicht ist, und wie Sie sie sinnvoll vorbereiten.
            Zum Ausdrucken oder Speichern als Referenz.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <article className="prose">

            <h2>Was die Schweigepflicht ist</h2>
            <p>
              Ärztinnen, Therapeutinnen und Pflegende stehen unter <strong>Berufsgeheimnis</strong> nach
              Art. 321 StGB. Sie dürfen Angehörigen ohne ausdrückliche Erlaubnis der erkrankten Person
              <em> nichts</em> mitteilen — auch nicht, ob die Person überhaupt in Behandlung ist.
            </p>
            <p>
              Eine <strong>Schweigepflichtentbindung</strong> hebt diese Pflicht auf — für klar benannte
              Personen, für klar benannte Inhalte und für einen klar benannten Zeitraum. Nur die erkrankte
              Person selbst kann sie erteilen, und sie kann sie jederzeit widerrufen.
            </p>

            <h2>Was sie leistet — und was sie nicht ist</h2>
            <p>
              Die Entbindung ist eine <strong>Erlaubnis zum Sprechen</strong>. Sie macht aus Angehörigen
              nicht Vertretende oder Entscheidende. Diese Unterscheidung ist wichtig, damit Erwartungen
              auf allen Seiten realistisch bleiben.
            </p>
            <ul>
              <li><strong>Was sie ermöglicht:</strong> Behandelnde dürfen mit Ihnen sprechen, Sie erhalten Informationen über Verlauf und Therapie, Sie können Beobachtungen einbringen, in Krisen kann schneller koordiniert werden.</li>
              <li><strong>Was sie nicht ist:</strong> keine Vertretungsvollmacht, kein Recht Behandlung zu bestimmen, kein Ersatz für Vorsorgeauftrag oder Patientenverfügung, kein Persilschein — der Inhalt kann eng oder weit gefasst sein.</li>
            </ul>

            <h2>Wann sie formuliert werden sollte</h2>
            <p>
              Eine Schweigepflichtentbindung ist nur so gut wie das Gespräch, das sie vorbereitet. In der
              Manie wird oft alles zurückgewiesen, in der Depression alles unterschrieben — beides ist
              nicht hilfreich. Der gute Moment ist die <strong>stabile, ansprechbare Phase</strong>.
            </p>
            <ol>
              <li>Gemeinsam besprechen — was soll wann mit wem geteilt werden dürfen.</li>
              <li>Schriftlich festhalten und unterzeichnen.</li>
              <li>Original bei der behandelnden Stelle hinterlegen, Kopie behalten.</li>
              <li>Bei Wechsel von Klinik oder Therapeut:in: neu erteilen.</li>
              <li>Regelmässig prüfen — passt der Umfang noch zur aktuellen Situation?</li>
            </ol>

            <h2>Was inhaltlich hineingehört</h2>
            <p>Eine sauber formulierte Entbindung beantwortet fünf Fragen:</p>
            <ul>
              <li><strong>Wer entbindet wen?</strong> Vollständige Namen, Geburtsdatum, behandelnde Stelle, Name der angehörigen Person und ihre Beziehung zur erkrankten Person.</li>
              <li><strong>Worüber darf gesprochen werden?</strong> Diagnose und Verlaufsform, aktuelle Behandlung, Klinikaufenthalte, Medikation, Frühwarnzeichen, Entlassung und Nachsorge — je präziser, desto besser. Pauschalentbindungen werden von Behandelnden oft zurückhaltender ausgelegt.</li>
              <li><strong>In welche Richtung?</strong> Beidseitig (Information fliesst hin und zurück), nur empfangen (Sie erhalten Auskunft), oder nur weitergeben (Sie geben Beobachtungen weiter, erhalten aber keine Auskunft).</li>
              <li><strong>Wie lange?</strong> Empfehlung 12 Monate, danach gemeinsam neu prüfen. Auch unbefristet ist möglich, wird aber von Fachstellen oft konservativer ausgelegt. Möglich ist auch: «bis Ende der aktuellen Episode».</li>
              <li><strong>Widerruf</strong>: Die erkrankte Person kann die Entbindung jederzeit zurücknehmen — schriftlich oder mündlich gegenüber der Klinik. Das ist ihr Recht und sollte explizit benannt werden.</li>
            </ul>

            <h2>Vorlagentext zum Abschreiben</h2>
            <p>
              Der folgende Text ist ein Beispiel zur Orientierung. Er ist in der Schweiz formell
              ausreichend, sofern er handschriftlich oder eigenhändig ausgefüllt und unterzeichnet wird.
              Die Klinik führt häufig auch eigene Formulare — fragen Sie ggf. zuerst dort.
            </p>
            <div className="contact-info-block" style={{ fontFamily: 'var(--font-serif, Georgia), serif', lineHeight: 1.7 }}>
              <p style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 13, marginBottom: 24 }}>
                <strong>Schweigepflichtentbindung</strong>
              </p>
              <p>
                Ich, <strong>[Vorname Nachname]</strong>, geboren am <strong>[TT.MM.JJJJ]</strong>,
                entbinde hiermit die behandelnden Fachpersonen der <strong>[Klinik / Praxis]</strong> von
                ihrer Schweigepflicht gegenüber:
              </p>
              <p style={{ paddingLeft: 16, borderLeft: '2px solid var(--accent, #999)', margin: '12px 0' }}>
                <strong>[Vorname Nachname der angehörigen Person]</strong> — [Beziehung, z.B. Ehefrau, Sohn, Schwester]
              </p>
              <p>Die Entbindung umfasst folgende Bereiche (Zutreffendes ankreuzen oder einzeln aufzählen):</p>
              <ul>
                <li>Diagnose und Verlaufsform</li>
                <li>Aktuelle Behandlung und Therapieplanung</li>
                <li>Klinikaufenthalte (Beginn, Dauer, Setting)</li>
                <li>Medikation und Veränderungen</li>
                <li>Frühwarnzeichen und Krisensituationen</li>
                <li>Entlassung und Nachsorge</li>
              </ul>
              <p>
                Informationsfluss: <strong>[in beide Richtungen / nur an die angehörige Person /
                nur von der angehörigen Person an die Behandelnden]</strong>.
              </p>
              <p>
                Diese Entbindung gilt <strong>[12 Monate / 24 Monate / unbefristet / bis Ende der
                aktuellen Episode]</strong> ab Unterschriftsdatum. Ich kann sie jederzeit schriftlich oder
                mündlich gegenüber der behandelnden Stelle widerrufen.
              </p>
              <p style={{ marginTop: 32 }}>
                Ort, Datum: <strong>[Ort], [TT.MM.JJJJ]</strong>
              </p>
              <p style={{ marginTop: 16 }}>
                Unterschrift erkrankte Person: ________________________________
              </p>
            </div>

            <h2>Hinweise für die Praxis</h2>
            <ul>
              <li>Original bei der Klinik hinterlegen, Kopie zu Hause aufbewahren — und beide Personen wissen wo.</li>
              <li>Bei mehreren Behandelnden (z.B. Psychiaterin + Hausärztin + Klinik): pro Stelle eine Entbindung.</li>
              <li>Eine Schweigepflichtentbindung ersetzt keinen Vorsorgeauftrag und keine Patientenverfügung. Diese drei Dokumente regeln verschiedene Bereiche und ergänzen sich.</li>
              <li>Wenn die erkrankte Person die Entbindung verweigert, ist das ihr gutes Recht. Sie als angehörige Person dürfen weiterhin <em>Beobachtungen mitteilen</em> — die Klinik darf nur nicht zurücksprechen.</li>
            </ul>

            <p style={{ marginTop: 56, color: 'var(--ink-3)', fontSize: 14 }}>
              Diese Seite ist eine praktische Referenz, keine Rechtsberatung. Bei komplexen Situationen
              (Beistandschaft, Vorsorgeauftrag, FU) hilft Pro&nbsp;Mente Sana weiter (0848 800 858, werktags).
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { SchweigepflichtPage };
