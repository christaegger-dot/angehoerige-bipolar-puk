# Prüfung und Bereinigung der Abhängigkeitsbefunde

Stand: 5. Oktober 2026. Bezug: Issue #50. Geprüfte Umgebung: Node.js `24.19.0`, npm `11.9.0`, Registry `https://registry.npmjs.org/`.

Der aktuelle Ausgangscheck meldete 23 betroffene Pakete (9 hoch, 13 mittel, 1 niedrig); die Zahl im älteren Issue beschreibt einen früheren Stand der Advisory-Datenbank. Sämtliche betroffenen Pakete gehören zur Entwicklungs-/Build-/Test-Werkzeugkette. Der neue vollständige Audit und der separate Produktionsaudit melden jeweils **0 Befunde**.

Die Pakete wurden nach Prüfung der aktuellen Registry-Manifeste, veröffentlichten Versionen, Node-Anforderungen, betroffenen Versionsbereiche und Eltern-Abhängigkeiten innerhalb der vorhandenen Semver-Bereiche aktualisiert. Es gibt keine Major-Aktualisierung direkter Projektabhängigkeiten, keine Overrides, keine gelöschten Abhängigkeiten zum Verbergen von Meldungen und keine ignorierten Advisories. Die überprüften direkten Werkzeugversionen sind als Mindestversionen in `package.json` hinterlegt; `package-lock.json` enthält die tatsächlich geprüfte vollständige Auflösung.

TLS- und Tarball-Integritätsprüfung blieben beim npm-Installieren aktiv. Ein zusätzlich versuchter Signatur-/Provenance-Audit (`npm audit signatures`) konnte seine Sigstore-Vertrauensmetadaten nicht laden: Der Cloud-Netzwerkproxy lehnt die HTTPS-Verbindung zu `tuf-repo-cdn.sigstore.dev` mit HTTP 403 ab. Die Zusatzprüfung ist deshalb **nicht bestanden/noch offen**, nicht als erfolgreich ausgewiesen. Es wurde keine Prüfung deaktiviert. Für diese Zusatzprüfung wird der Zugriff auf diesen offiziellen Sigstore-Endpunkt benötigt.

## Alle ursprünglich betroffenen Pakete

Die Schweregrade entsprechen der Ausgangsausgabe von npm. npm propagiert Befunde auch auf abhängige Pakete; eine Tabellenzeile ist daher nicht zwingend ein eigener Advisory.

| Paket | Schweregrad vorher | Installiert vorher | Installiert danach | Ergebnis |
| --- | --- | --- | --- | --- |
| `@babel/core` | high | `7.29.0` | `7.29.7` | Eigene und geerbte Befunde behoben |
| `@babel/helper-compilation-targets` | high | `7.28.6` | `7.29.7` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `@babel/helper-module-transforms` | low | `7.28.6` | `7.29.7` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `@eslint-community/eslint-utils` | moderate | `4.9.1` | `4.10.1` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `@eslint/config-array` | moderate | `0.23.5` | `0.23.5` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `@eslint/js` | moderate | `10.0.1` | `10.0.1` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `@vitejs/plugin-react` | moderate | `6.0.1` | `6.1.1` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `@vitest/coverage-v8` | moderate | `4.1.5` | `4.1.11` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `@vitest/mocker` | moderate | `4.1.5` | `4.1.11` | Eigene und geerbte Befunde behoben |
| `baseline-browser-mapping` | moderate | `2.10.22` | `2.11.27` | Eigene Befunde behoben |
| `brace-expansion` | high | `5.0.5` | `5.0.12` | Eigene Befunde behoben |
| `browserslist` | high | `4.28.2` | `4.29.3` | Eigene und geerbte Befunde behoben |
| `eslint` | moderate | `10.2.1` | `10.12.0` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `eslint-plugin-react-hooks` | moderate | `7.1.1` | `7.1.1` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `eslint-plugin-react-refresh` | moderate | `0.5.2` | `0.5.7` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `jsdom` | moderate | `29.0.2` | `29.1.1` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `minimatch` | moderate | `10.2.5` | `10.2.6` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `nanoid` | high | `3.3.11` | `3.3.20` | Eigene Befunde behoben |
| `postcss` | high | `8.5.10` | `8.5.29` | Eigene und geerbte Befunde behoben |
| `undici` | high | `7.25.0` | `7.30.0` | Eigene Befunde behoben |
| `update-browserslist-db` | high | `1.2.3` | `1.3.3` | Geerbte Befunde durch aktualisierte Unterabhängigkeiten behoben |
| `vite` | high | `8.0.10` | `8.3.2` | Eigene und geerbte Befunde behoben |
| `vitest` | moderate | `4.1.5` | `4.1.11` | Eigene und geerbte Befunde behoben |

## Einzelprüfung der ursprünglichen Advisories

Jede ursprüngliche direkte Advisory-Meldung wurde mit einer veröffentlichten kompatiblen Version oberhalb ihres betroffenen Bereichs abgeglichen. Die Tabelle führt alle 41 unterschiedlichen Advisories auf; der Vitest-/Mocker-Befund erschien für zwei Pakete. Die erfolgreich erneut ausgeführte npm-Prüfung bestätigt, dass keine dieser Meldungen in der aktualisierten Auflösung verbleibt.

| Paket | Advisory und Originaltitel | Betroffener Bereich laut Ausgangsaudit | Geprüfte Version |
| --- | --- | --- | --- |
| `@babel/core` | [GHSA-4x5r-pxfx-6jf8](https://github.com/advisories/GHSA-4x5r-pxfx-6jf8) — @babel/core: Arbitrary File Read via sourceMappingURL Comment | `<=7.29.0` | `7.29.7` |
| `@vitest/mocker`, `vitest` | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) — Vitest: Path Traversal / Arbitrary File Read via @vitest/mocker Redirect Mock | `>=2.1.0 <4.1.11` | `4.1.11`, `4.1.11` |
| `baseline-browser-mapping` | [GHSA-w5vr-8v7q-w6rv](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv) — baseline-browser-mapping process termination on invalid input causes denial of service | `>=2.0.0 <2.11.0` | `2.11.27` |
| `brace-expansion` | [GHSA-jxxr-4gwj-5jf2](https://github.com/advisories/GHSA-jxxr-4gwj-5jf2) — brace-expansion: Large numeric range defeats documented `max` DoS protection | `>=5.0.0 <5.0.6` | `5.0.12` |
| `brace-expansion` | [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp) — brace-expansion: DoS via exponential-time expansion of consecutive non-expanding {} groups | `>=3.0.0 <5.0.7` | `5.0.12` |
| `brace-expansion` | [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg) — brace-expansion: DoS via unbounded expansion length causing an out-of-memory process crash | `>=4.0.0 <5.0.8` | `5.0.12` |
| `brace-expansion` | [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895) — brace-expansion: DoS via unbounded intermediate arrays, bypassing the CVE-2026-14257 mitigation | `>=4.0.0 <5.0.9` | `5.0.12` |
| `brace-expansion` | [GHSA-q2hr-2g5m-vwhr](https://github.com/advisories/GHSA-q2hr-2g5m-vwhr) — brace-expansion: Quadratic-time expansion of the `{a},b}` rewrite causes CPU denial of service | `>=4.0.0 <5.0.12` | `5.0.12` |
| `brace-expansion` | [GHSA-qhr7-859c-m2p7](https://github.com/advisories/GHSA-qhr7-859c-m2p7) — brace-expansion: DoS via uncontrolled recursion on nested brace groups causing stack exhaustion | `>=4.0.0 <5.0.11` | `5.0.12` |
| `brace-expansion` | [GHSA-6j4f-fj2g-mc7p](https://github.com/advisories/GHSA-6j4f-fj2g-mc7p) — brace-expansion: DoS via uncontrolled recursion in parseCommaParts causing stack exhaustion | `>=4.0.0 <5.0.10` | `5.0.12` |
| `browserslist` | [GHSA-c83g-rgw3-j3cx](https://github.com/advisories/GHSA-c83g-rgw3-j3cx) — Browserslist: Unbounded memory growth (no cache eviction) via distinct query results, leading to eventual OOM | `<=4.28.6` | `4.29.3` |
| `browserslist` | [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g) — Browserslist: Uncaught crash / prototype write via untrusted browserslist-stats.json custom stats (normalizeStats) | `<=4.28.6` | `4.29.3` |
| `nanoid` | [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv) — nanoid: non-secure generators can loop indefinitely with negative size | `<3.3.16` | `3.3.20` |
| `nanoid` | [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) — nanoid: custom generators can loop indefinitely when size is zero | `<3.3.18` | `3.3.20` |
| `nanoid` | [GHSA-xwg4-73v4-xw9w](https://github.com/advisories/GHSA-xwg4-73v4-xw9w) — nanoid: Integer Overflow or Wraparound | `<3.3.12` | `3.3.20` |
| `postcss` | [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q) — PostCSS: Arbitrary file read and information disclosure via attacker-controlled sourceMappingURL in CSS comments | `<=8.5.11` | `8.5.29` |
| `postcss` | [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) — PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset | `<=8.5.22` | `8.5.29` |
| `postcss` | [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) — PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure | `<=8.5.17` | `8.5.29` |
| `undici` | [GHSA-vmh5-mc38-953g](https://github.com/advisories/GHSA-vmh5-mc38-953g) — undici vulnerable to TLS certificate validation bypass via dropped requestTls in SOCKS5 ProxyAgent | `>=7.23.0 <7.28.0` | `7.30.0` |
| `undici` | [GHSA-p88m-4jfj-68fv](https://github.com/advisories/GHSA-p88m-4jfj-68fv) — undici vulnerable to HTTP header injection via Set-Cookie percent-decoding | `>=7.0.0 <7.28.0` | `7.30.0` |
| `undici` | [GHSA-vxpw-j846-p89q](https://github.com/advisories/GHSA-vxpw-j846-p89q) — undici WebSocket client vulnerable to denial of service via fragment count bypass | `>=7.0.0 <7.28.0` | `7.30.0` |
| `undici` | [GHSA-hm92-r4w5-c3mj](https://github.com/advisories/GHSA-hm92-r4w5-c3mj) — undici vulnerable to cross-origin request routing via SOCKS5 proxy pool reuse | `>=7.23.0 <7.28.0` | `7.30.0` |
| `undici` | [GHSA-g8m3-5g58-fq7m](https://github.com/advisories/GHSA-g8m3-5g58-fq7m) — undici vulnerable to Set-Cookie SameSite attribute downgrade via permissive substring matching | `>=7.0.0 <7.28.0` | `7.30.0` |
| `undici` | [GHSA-pr7r-676h-xcf6](https://github.com/advisories/GHSA-pr7r-676h-xcf6) — undici vulnerable to cross-user information disclosure via shared cache whitespace bypass | `>=7.0.0 <7.28.0` | `7.30.0` |
| `undici` | [GHSA-8xcm-r25x-g524](https://github.com/advisories/GHSA-8xcm-r25x-g524) — undici vulnerable to downstream response desynchronization via retry interceptor | `>=7.0.0 <7.29.0` | `7.30.0` |
| `undici` | [GHSA-4cwx-7wf7-3272](https://github.com/advisories/GHSA-4cwx-7wf7-3272) — undici vulnerable to cross-user information disclosure and parse-time crash via degenerate private cache directives | `>=7.0.0 <7.29.0` | `7.30.0` |
| `undici` | [GHSA-m8rv-5g2x-5cg5](https://github.com/advisories/GHSA-m8rv-5g2x-5cg5) — undici vulnerable to CRLF Injection via blob-like body 'type' property | `>=7.0.0 <7.29.0` | `7.30.0` |
| `undici` | [GHSA-jr45-8vmc-qm54](https://github.com/advisories/GHSA-jr45-8vmc-qm54) — undici vulnerable to cross-user information disclosure via whitespace around equals in Cache-Control directives | `>=7.0.0 <7.29.0` | `7.30.0` |
| `undici` | [GHSA-v3r7-h72x-cjcm](https://github.com/advisories/GHSA-v3r7-h72x-cjcm) — undici vulnerable to cookie attribute injection via unsanitized domain and unparsed setCookie fields | `>=7.0.0 <7.29.0` | `7.30.0` |
| `undici` | [GHSA-35p6-xmwp-9g52](https://github.com/advisories/GHSA-35p6-xmwp-9g52) — undici vulnerable to HTTP response queue poisoning via keep-alive socket reuse | `>=7.0.0 <7.28.0` | `7.30.0` |
| `undici` | [GHSA-pmjh-fq2x-6v4x](https://github.com/advisories/GHSA-pmjh-fq2x-6v4x) — undici vulnerable to Denial of Service via orphaned RetryHandler response body | `>=7.11.0 <7.29.1` | `7.30.0` |
| `undici` | [GHSA-r53p-7pc4-xj5r](https://github.com/advisories/GHSA-r53p-7pc4-xj5r) — undici vulnerable to downstream response splitting via retry interceptor | `>=7.0.0 <7.29.1` | `7.30.0` |
| `undici` | [GHSA-rfgv-xxqx-mfg5](https://github.com/advisories/GHSA-rfgv-xxqx-mfg5) — undici vulnerable to Denial of Service via unrequested WebSocket subprotocol | `>=7.0.0 <7.29.1` | `7.30.0` |
| `undici` | [GHSA-3xpg-4rpp-hhhm](https://github.com/advisories/GHSA-3xpg-4rpp-hhhm) — undici vulnerable to Denial of Service via unbounded decompression of compressed responses | `>=7.15.0 <7.29.1` | `7.30.0` |
| `undici` | [GHSA-2jfj-6hjv-fm6j](https://github.com/advisories/GHSA-2jfj-6hjv-fm6j) — undici vulnerable to cross-user cookie disclosure via Set-Cookie caching in shared caches | `>=7.0.0 <7.29.1` | `7.30.0` |
| `undici` | [GHSA-2gqq-gqf2-x968](https://github.com/advisories/GHSA-2gqq-gqf2-x968) — undici vulnerable to response truncation via oversized chunked responses in the dump interceptor | `>=7.1.0 <7.29.1` | `7.30.0` |
| `undici` | [GHSA-w293-vg96-wgc3](https://github.com/advisories/GHSA-w293-vg96-wgc3) — undici vulnerable to TLS certificate validation bypass via dropped connect options in BalancedPool | `>=7.24.1 <7.29.1` | `7.30.0` |
| `undici` | [GHSA-8436-99hf-9mmv](https://github.com/advisories/GHSA-8436-99hf-9mmv) — undici vulnerable to caching and replay of unsafe HTTP method responses | `>=7.0.0 <7.29.1` | `7.30.0` |
| `undici` | [GHSA-rx4f-c7p8-82vq](https://github.com/advisories/GHSA-rx4f-c7p8-82vq) — undici vulnerable to Denial of Service via WebSocketStream unclean close | `>=7.0.0 <7.29.1` | `7.30.0` |
| `vite` | [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) — launch-editor: NTLMv2 hash disclosure via UNC path handling on Windows | `>=8.0.0 <=8.0.15` | `8.3.2` |
| `vite` | [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) — vite: `server.fs.deny` bypass on Windows alternate paths | `>=8.0.0 <=8.0.15` | `8.3.2` |

## Kompatibilität und ergänzte Audit-Werkzeuge

- Die interne ESLint-Cache-Kette wechselt mit der geprüften Minor-Aktualisierung von ESLint `10.2.1` auf `10.12.0` ihre Majors: `file-entry-cache` `8.0.0` → `11.1.5`, `flat-cache` `4.0.1` → `6.1.23`, `keyv` `4.5.4` → `5.6.0`. ESLint `10.12.0` deklariert ausdrücklich `file-entry-cache` `11.1.5 || >11.1.6 <12`; dieses Paket verlangt `flat-cache@^6.1.23`, dessen Cache-Unterabhängigkeiten auf keyv 5.x auflösen. Das sind interne, vom aktualisierten Elternpaket unterstützte Entwicklungsabhängigkeiten; das Projekt importiert diese Cache-APIs nicht. Ihre Auflösung ist im Nullbefund-Audit und Frozen-Lockfile-Install erfasst.
- Babel bleibt auf 7.x; `eslint-plugin-react-hooks@7.1.1` erlaubt Babel `^7.24.4`. Der aktualisierte Babel-Zweig beseitigt den Source-Map-Befund und aktualisiert die Browserslist-Kette.
- `minimatch@10.2.6` erlaubt `brace-expansion@^5.0.8`; die aufgelöste Version `5.0.12` behebt auch die zuletzt gemeldeten CPU-/Speicher-/Rekursionsbefunde. Beide liegen innerhalb der vorhandenen Elternbereiche.
- Vite bleibt auf 8.x. Vite `8.3.2` verwendet PostCSS `^8.5.28`; PostCSS `8.5.29` verwendet nanoid `^3.3.19`. Die aufgelösten Versionen `8.5.29` und `3.3.20` beheben sämtliche gemeldeten Source-Map- und Generator-Befunde.
- Vitest und Coverage bleiben zusammen auf `4.1.11`; die internen Vitest-Pakete werden auf dieselbe Version aufgelöst. Der Redirect-Mock-Pfadbefund gilt für Versionen kleiner `4.1.11`.
- jsdom bleibt auf `29.1.1` und erlaubt undici `^7.25.0`. undici `7.30.0` liegt oberhalb sämtlicher betroffener Bereiche, deren höchste Fixgrenze `7.29.1` ist.
- Die drei bisher verwendeten Fontsource-Pakete (`inter-tight`, `jetbrains-mono`, `source-serif-4`) wurden entfernt, nachdem die Anwendung auf die lokal ausgelieferten Rubik-Dateien aus dem bereitgestellten PUK-Design-System umgestellt wurde. Diese Entfernung gehört zur dokumentierten Webtypografie-Umstellung und verdeckt keine npm-Advisory-Meldung.
- Für einen wiederholbaren Audit der gebauten/servierten SPA wurden `playwright@1.63.0` und `@axe-core/playwright@4.13.0` als reine Entwicklungsabhängigkeiten ergänzt. Beide sind vom vollständigen Nullbefund-Audit erfasst. Der Einstieg `npm run audit:website` ruft `scripts/audit-website.mjs` auf; Browser und Resultate sind im zugehörigen Website-Audit beschrieben.

## Nachweis und wiederholbare Befehle

```sh
npm ci
npm audit
npm audit --omit=dev
npm ls --depth=0
npm run lint
npm run test:coverage
npm run build
npm run audit:website
```

- `npm ci` mit ausschliesslich den beiden Manifest-/Lockdateien in einem isolierten Verzeichnis: Exit 0; 246 Pakete installiert, Audit 0. Die aktive Arbeitskopie wurde für diesen Nachweis nicht verändert.
- `npm update`: innerhalb der ursprünglichen Semver-Bereiche der direkten Abhängigkeiten; erfolgreich.
- `npm install` für die beiden zusätzlichen Audit-Werkzeuge: erfolgreich.
- `npm audit --json`: Exit 0; 0 info / 0 low / 0 moderate / 0 high / 0 critical.
- `npm audit --omit=dev --json`: Exit 0; 0 info / 0 low / 0 moderate / 0 high / 0 critical.
- `npm ls --depth=0`: Exit 0; keine ungültigen oder fehlenden direkten Abhängigkeiten.
- `npm audit signatures`: zusätzlicher Nachweis offen, weil der Netzwerkproxy den Sigstore-TUF-Endpunkt mit HTTP 403 sperrt.

Lint, Coverage, Build und Website-Audit werden nach Integration der parallel bearbeiteten Änderungen erneut geprüft; ihre Ergebnisse stehen im übergreifenden Auditbericht/PR. Ein Nullbefund im npm-Audit ist eine Momentaufnahme der Registry-Advisories und ersetzt weder die Funktionsprüfung noch eine umfassende Sicherheitsprüfung.
