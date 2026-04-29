# Repo Hygiene & Documentation Audit

Projekt: `angehoerige-bipolar-puk`  
Datum: 29.04.2026  
Scope: GitHub-Status, Dokumentation, Repo-Hygiene, Checks

## 1. Kurzfazit

Das Repo ist insgesamt sauber, technisch konsistent und aus Repo-/Dokumentationssicht preview-ready. Die zentralen Konfigurationspunkte sind stimmig: `README.md`, `index.html`, `public/robots.txt`, `netlify.toml`, `.gitignore` und `eslint.config.js` widersprechen sich aktuell nicht. Die Check-Kette läuft vollständig grün, einschliesslich `lint` nach erzeugtem Coverage-Output. Offene Punkte liegen nicht im Produktcode, sondern in der Dokumentationskette: Ein älteres Struktur-Audit ist noch als offener PR/Issue-Strang ausserhalb von `main` hängig, und zwei Auditberichte enthalten noch lokale Preview-URLs als methodische Notiz.

## 2. GitHub-/Repo-Status

- **main-Status:** Lokal `main` und `origin/main` sind identisch auf Commit `9d3ed7b`. Es gibt keinen Hinweis auf einen Rückstand von `main`.
- **Offene PRs:** Aktuell ist nur `#18` offen: `docs: add content structure redundancy audit`. Der PR ist inhaltlich relevant, weil das zugehörige Audit noch nicht auf `main` liegt.
- **Offene Issues:** Offen sind nur `#44` (dieser Audit) und `#17` (`Content Structure Audit: Redundanzen und logische Gliederung prüfen`). `#17` korrespondiert mit PR `#18` und wirkt deshalb nicht vergessen, aber noch nicht abgeschlossen.
- **Branches:** Es bestehen weiterhin mehrere Remote-Branches aus bereits gemergten Arbeitssträngen, unter anderem ältere `audit/`, `fix/`, `polish/` und `refactor/`-Branches. Das ist kein funktionaler Mangel, aber ein Aufräumpunkt.
- **Worktree:** Die geforderte Check-Sequenz wurde vor dem Anlegen dieses Auditberichts auf sauberem Branchzustand ausgeführt. Vor und nach der Sequenz war `git status --short` leer; `dist/` und `coverage/` wurden nicht versehentlich versioniert.

## 3. Dokumentationsprüfung

### README

- **Status:** weitgehend korrekt
- **Befunde:**
  - Stack, lokale Entwicklung, Deployment und CI sind mit `package.json` und `netlify.toml` vereinbar.
  - Die Indexierungsentscheidung ist korrekt dokumentiert: `README.md:52` nennt `noindex, nofollow` und verweist auf `robots.txt` mit `Disallow: /`.
  - Die Hinweise zu sensiblen Eingaben sind konsistent mit `src/storage.js` und `src/datenschutz.jsx`: sitzungsbezogen als Standard, dauerhaft nur per Opt-in.
  - Kleine Inkonsistenz: Im Abschnitt `Qualitätschecks` nennt `README.md:31-35` lokal `npm run test`, während die CI-Sektion in `README.md:68-72` korrekt `npm run test:coverage` dokumentiert. Das ist nicht falsch, aber uneinheitlich gewichtet.

### _dev

- **Status:** weitgehend korrekt
- **Befunde:**
  - Die Dateien in `_dev/` sind klar als Auditberichte erkennbar und nicht mit Produktinhalt verwechselbar.
  - Es wurden keine sensiblen Daten, Geheimnisse oder personenbezogenen Inhalte gefunden.
  - Auf `main` liegen aktuell fünf Auditdateien:
    - `AUDIT-CONTENT-QUALITY-2026-04-29.md`
    - `AUDIT-MINI-UX-TEST-2026-04-29.md`
    - `AUDIT-P2-VISUAL-SYSTEM-2026-04-29.md`
    - `AUDIT-VISUAL-QA-2026-04-29.md`
    - `AUDIT-VISUAL-REFINEMENT-2026-04-29.md`
  - Das Struktur-Audit `AUDIT-CONTENT-STRUCTURE-REDUNDANCY-2026-04-29.md` fehlt auf `main`, weil es noch in PR `#18` hängt. Dadurch ist die Dokumentationskette nicht ganz vollständig.

### Auditdateien

- **Status:** weitgehend korrekt
- **Befunde:**
  - Es wurden keine absoluten lokalen Pfade wie `/Users/...` in `README.md` oder den aktuell gemergten `_dev`-Dateien gefunden.
  - Zwei gemergte Auditberichte enthalten noch lokale Preview-URLs als methodische Notiz:
    - `_dev/AUDIT-MINI-UX-TEST-2026-04-29.md:15`
    - `_dev/AUDIT-VISUAL-QA-2026-04-29.md:19`
  - Diese URLs sind nicht sensibel, aber repo-weit nicht portabel und deshalb ein kleiner Hygiene-Punkt.
  - Die jüngere Auditkette ist in GitHub grundsätzlich nachvollziehbar: Content-Safety, Struktur-Refactoring, Microcopy, Visual-QA, Mobile-UX, Visual-Refinement und P2-Visual-System wurden in separaten PRs dokumentiert. Die einzige erkennbare Lücke ist das noch offene Struktur-Audit aus `#17`/`#18`.

## 4. Konfigurationsprüfung

- **`package.json`:** korrekt. Die Scripts `lint`, `test`, `test:coverage` und `build` entsprechen der dokumentierten Toolchain.
- **`eslint.config.js`:** korrekt. `dist` und `coverage` werden global ignoriert (`eslint.config.js:8`), womit das frühere Lint-Problem nach `test:coverage` sauber entschärft ist.
- **`.gitignore`:** korrekt. `dist` und `coverage` sind ignoriert (`.gitignore:11-13`); zusätzlich sind typische lokale Artefakte und Netlify-/Editor-Dateien ausgeschlossen.
- **`netlify.toml`:** plausibel. Build mit `npm run build`, Publish auf `dist`, SPA-Redirect auf `index.html`, dazu sinnvolle Security-Header und Asset-Caching.
- **`index.html`:** konsistent. `lang="de-CH"`, `noindex, nofollow`, Canonical und Metadaten wirken stimmig.
- **`public/robots.txt`:** konsistent zu `index.html`. `Disallow: /` passt zur dokumentierten Nicht-Indexierung.

## 5. Checks

Hinweis: Die geforderte Check-Sequenz wurde auf sauberem Branchzustand vor dem Anlegen dieses Auditberichts ausgeführt. Da dieser PR nur die Auditdatei ergänzt, ist diese Reihenfolge für die Repo-Hygiene aussagekräftig.

- **`git status --short` vor den Checks:** leer
- **`npm run lint`:** grün
- **`npm run test:coverage`:** grün
  - 14 Testdateien, 41 Tests bestanden
  - bekannte Node-Warnungen zu `--localstorage-file` erschienen weiterhin, blockierten den Lauf aber nicht
- **`npm run lint` nach Coverage:** grün
  - `coverage/` wurde nicht von ESLint als Problemquelle behandelt
- **`npm run build`:** grün
- **`git status --short` nach den Checks:** leer

## 6. Findings nach Priorität

### P1 – vor Preview beheben

Keine echten Repo-, Dokumentations- oder Konfigurationsblocker gefunden.

### P2 – kleine Repo-/Doku-Korrekturen

#### Offenes Struktur-Audit hängt noch ausserhalb von `main`

- **Betroffen:** Issue `#17`, PR `#18`, `_dev/`
- **Beobachtung:** Der spätere Struktur-Refactoring-Strang wurde bereits gemergt, das zugehörige Struktur-Audit liegt aber noch nicht auf `main`, weil PR `#18` offen ist.
- **Warum relevant:** Die Produktentwicklung ist dadurch nicht blockiert, aber die Auditkette ist dokumentarisch unvollständig und für Aussenstehende etwas schwerer nachzuvollziehen.
- **Empfehlung:** Bewusst entscheiden, ob PR `#18` noch gemergt oder als überholt geschlossen werden soll.

#### README gewichtet lokale Checks und CI nicht ganz gleich

- **Betroffen:** `README.md:27-37`, `README.md:66-72`
- **Beobachtung:** Der lokale Qualitätscheck nennt `npm run test`, die CI nennt `npm run test:coverage`.
- **Warum relevant:** Das kann bei neuen Mitwirkenden den Eindruck erzeugen, dass die lokale Minimalprüfung und das CI-Gate identisch sind, obwohl die CI strenger ist.
- **Empfehlung:** Entweder lokale Checks und CI bewusst unterscheiden oder die Formulierung angleichen.

#### Zwei Auditberichte enthalten noch lokale Preview-URLs

- **Betroffen:** `_dev/AUDIT-MINI-UX-TEST-2026-04-29.md:15`, `_dev/AUDIT-VISUAL-QA-2026-04-29.md:19`
- **Beobachtung:** Beide Berichte nennen `http://127.0.0.1:4174/` als lokale Preview.
- **Warum relevant:** Das ist nicht sensibel, aber repo-weit nicht portabel und für spätere Leser:innen ohne Mehrwert.
- **Empfehlung:** Bei einer nächsten reinen Doku-Aufräumrunde auf generischere Formulierungen wie „lokale Vite-Preview“ umstellen.

### P3 – optional

#### Remote-Branches aus gemergten Arbeitssträngen könnten später bereinigt werden

- **Betroffen:** GitHub-Branchliste
- **Beobachtung:** Mehrere ältere `audit/`, `fix/`, `polish/` und `refactor/`-Branches sind remote noch vorhanden.
- **Warum relevant:** Kein technisches Risiko, aber etwas Branch-Rauschen im Repo.
- **Empfehlung:** Später separat bereinigen, nicht als Teil eines Produkt- oder Doku-PRs.

## 7. Empfehlung

**preview-ready**

Es gibt aktuell keine Repo-, Doku- oder Konfigurationsblocker vor einer Preview. Die technischen Checks laufen vollständig grün, die Indexierungsentscheidung ist konsistent dokumentiert, und die frühere `coverage/`-/ESLint-Kante ist beseitigt. Die verbleibenden Punkte sind kleine Nachvollziehbarkeits- und Aufräumthemen, keine Produkt- oder Sicherheitsmängel.

## 8. Konkrete nächste Schritte

1. Entscheiden, ob PR `#18` gemergt oder als überholt geschlossen werden soll, damit die Auditkette vollständig und eindeutig wird.
2. `README.md` bei Gelegenheit sprachlich angleichen, damit lokale Checks und CI-Gate klarer zueinander stehen.
3. Die zwei lokalen Preview-URLs in älteren Auditberichten bei einer späteren Doku-Aufräumrunde neutralisieren.
4. Remote-Branches aus abgeschlossenen Strängen später separat bereinigen.
5. Für die Fachpersonen-Preview keine zusätzlichen Repo-Hygiene-Fixes mehr einplanen; aus dieser Prüfung ergibt sich dafür kein Bedarf.
