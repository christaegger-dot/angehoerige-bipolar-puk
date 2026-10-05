
function ImpressumPage() {
  return (
    <>
      <header className="about-hero">
        <div className="container">
          <div className="eyebrow animate-in" style={{ marginBottom: 24 }}><span className="dot"></span>Impressum</div>
          <h1 className="animate-in delay-1" style={{ maxWidth: '22ch' }}>Impressum.</h1>
          <p className="lede animate-in delay-2" style={{ marginTop: 28, maxWidth: '54ch' }}>
            Angaben zur Trägerschaft, inhaltlichen Verantwortung und zum Kontakt.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <article className="prose">
            <h2>Trägerschaft</h2>
            <p>
              Diese Website ist ein Angebot der <strong>Fachstelle Angehörigenarbeit</strong> der
              Psychiatrischen Universitätsklinik Zürich (PUK). Sie wird ausschliesslich an Angehörige weitergegeben,
              die sich an die Fachstelle gewandt haben. Das Angebot wird nicht öffentlich beworben.
            </p>

            <h2>Inhaltliche Verantwortung</h2>
            <div className="contact-info-block">
              <div className="value">Ch. Egger</div>
              <div className="sub">Fachstelle Angehörigenarbeit · PUK Zürich</div>
            </div>

            <h2>Kontakt</h2>
            <div className="contact-info-block">
              <div className="label">POSTANSCHRIFT</div>
              <div className="value">Psychiatrische Universitätsklinik Zürich</div>
              <div className="sub">Fachstelle Angehörigenarbeit · Lenggstrasse 31, Postfach, 8032 Zürich</div>
            </div>
            <div className="contact-info-block">
              <div className="label">E-MAIL</div>
              <div className="value"><a className="link-underline" href="mailto:angehoerigenarbeit@pukzh.ch">angehoerigenarbeit@pukzh.ch</a></div>
            </div>
            <div className="contact-info-block">
              <div className="label">TELEFON</div>
              <div className="value">058 384 38 00</div>
              <div className="sub">Werktags.</div>
            </div>

            <h2>Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website bieten Angehörigen Informationen und Orientierung zur Erkrankung
              und zum eigenen Alltag.
              Sie ersetzen keine ärztliche, psychotherapeutische oder rechtliche Beratung. Eine
              Haftung für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte sowie für Schäden, die
              aus der Nutzung der Inhalte entstehen, wird — soweit gesetzlich zulässig — ausgeschlossen.
            </p>
            <p>
              Die Website verlinkt auf externe Anlaufstellen und Hilfsangebote. Für die Inhalte dieser
              externen Seiten ist ausschliesslich deren Betreiber verantwortlich.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Sämtliche Texte, Illustrationen und Werkzeuge sind urheberrechtlich geschützt. Die Weitergabe an
              andere Angehörige im persönlichen Umfeld ist ausdrücklich erwünscht. Eine Verwendung in
              Publikationen, Schulungen oder für kommerzielle Zwecke braucht die vorherige schriftliche
              Zustimmung.
            </p>

            <p style={{ marginTop: 56, color: 'var(--ink-3)', fontSize: '0.875rem' }}>
              Redaktioneller Stand: Oktober 2026
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export { ImpressumPage };
