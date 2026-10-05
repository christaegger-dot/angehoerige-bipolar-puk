/* Urteilsschicht für das Website-Systemprofil. Das konkrete Referenzprojekt,
   das diese Regeln ausgelöst hat, ist ausdrücklich kein Prüfobjekt. */

const vorkommen = (text, muster) => (String(text || '').match(muster) || []).length;

export function pruefeSeitenvertrag(source, label, { navigationRequired = false } = {}) {
  const gruende = [];
  if (!/<html[^>]+lang="[^"]+"/i.test(source)) gruende.push(`${label}: Sprachangabe fehlt`);
  if (!/<title>[^<]+<\/title>/i.test(source)) gruende.push(`${label}: eindeutiger Seitentitel fehlt`);
  if (!/<meta[^>]+name="description"[^>]+content="[^"]+"/i.test(source)) gruende.push(`${label}: Meta-Description fehlt`);
  if (!/class="[^"]*puk-web-skip[^"]*"[^>]+href="#main-content"/i.test(source)) gruende.push(`${label}: Skip-Link fehlt`);
  if (vorkommen(source, /<main\b/gi) !== 1) gruende.push(`${label}: genau ein main erwartet`);
  if (!/<main[^>]+id="main-content"/i.test(source)) gruende.push(`${label}: Skip-Ziel main-content fehlt`);
  if (vorkommen(source, /<h1\b/gi) !== 1) gruende.push(`${label}: genau eine H1 erwartet`);
  const hatNavigation = /<nav\b/i.test(source);
  if (navigationRequired && !hatNavigation) gruende.push(`${label}: Hauptnavigation fehlt`);
  if (hatNavigation && !/<nav[^>]+aria-label="[^"]+"/i.test(source)) gruende.push(`${label}: Navigation ist nicht benannt`);
  if (hatNavigation && !/(?:aria-current="page"|current="\{\{\s*true\s*\}\}")/i.test(source)) gruende.push(`${label}: aktiver Navigationszustand fehlt`);
  return gruende;
}

function farbliterale(source) {
  const ohneFragmentziele = String(source || '').replace(/\b(?:href|xlink:href)=["']#[^"']+["']/gi, '');
  return [...ohneFragmentziele.matchAll(/#[0-9a-f]{3,8}\b/gi)].map((match) => match[0]);
}

function hatFavicon(source) {
  return /<link\b(?=[^>]*\brel=["'][^"']*\bicon\b[^"']*["'])(?=[^>]*\bhref=["'][^"']+["'])[^>]*>/i.test(source || '');
}

function externeLaufzeitquellen(source) {
  const treffer = [];
  for (const match of String(source || '').matchAll(/<script\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>/gi)) treffer.push(match[1]);
  for (const match of String(source || '').matchAll(/<link\b(?=[^>]*\brel=["'][^"']*(?:stylesheet|preload|modulepreload|icon)[^"']*["'])[^>]*\bhref=["'](https?:\/\/[^"']+)["'][^>]*>/gi)) treffer.push(match[1]);
  return treffer;
}

export function bewerteProjektQuellen({
  pages = [], authoredFiles = pages, paths = [], profil, dataPolicy = null, screenreaderEvidence = null, production = false,
}) {
  const gruende = [];
  if (!pages.length) return { passed: false, gruende: ['Keine Website-Seiten gefunden'] };
  const titles = new Map();
  const storagePages = [];

  for (const page of pages) {
    gruende.push(...pruefeSeitenvertrag(page.source, page.path, { navigationRequired: true }));
    if (!/data-web-profile=["']website["']/i.test(page.source)) gruende.push(`${page.path}: Website-Profilmarker fehlt`);
    if (!hatFavicon(page.source)) gruende.push(`${page.path}: Favicon-Verweis fehlt`);
    const title = page.source.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
    if (title) titles.set(title, [...(titles.get(title) || []), page.path]);
  }

  for (const file of authoredFiles) {
    const istTokenDefinition = /(?:^|\/)[^/]*tokens?[^/]*\.css$/i.test(file.path || '');
    const farben = istTokenDefinition ? [] : farbliterale(file.source);
    if (farben.length) gruende.push(`${file.path}: ${farben.length} Farbliteral(e) statt Tokens`);
    const extern = externeLaufzeitquellen(file.source);
    if (extern.length) gruende.push(`${file.path}: externe Laufzeitquelle ${extern.join(', ')}`);
    if (/\b(?:localStorage|sessionStorage|indexedDB)\b/.test(file.source)) storagePages.push(file.path);
  }

  if (storagePages.length) {
    const pageSources = pages.map((page) => page.source).join('\n');
    if (!/data-storage-notice(?:=["'][^"']*["'])?/i.test(pageSources)) gruende.push('Sichtbarer Speicherhinweis ist nicht mit data-storage-notice markiert');
    if (!/data-storage-delete(?:=["'][^"']*["'])?/i.test(pageSources)) gruende.push('Löschfunktion ist nicht mit data-storage-delete markiert');
  }

  for (const [title, owners] of titles) if (owners.length > 1) gruende.push(`Seitentitel nicht eindeutig: ${title} (${owners.join(', ')})`);

  if (storagePages.length) {
    const policyOk = dataPolicy?.status === 'approved'
      && typeof dataPolicy?.reviewedAt === 'string'
      && typeof dataPolicy?.reviewerRole === 'string'
      && Array.isArray(dataPolicy?.dataCategories) && dataPolicy.dataCategories.length > 0
      && typeof dataPolicy?.retention === 'string'
      && typeof dataPolicy?.deleteMechanism === 'string'
      && dataPolicy?.transmission === 'verified-none';
    if (!policyOk) gruende.push(`Browser-Speicherung in ${storagePages.join(', ')} ohne vollständige website-data-policy.json`);
  }

  if (production) {
    const minimumRuns = profil?.qualityGates?.screenreaderMinimumRuns || 2;
    const runs = screenreaderEvidence?.runs || [];
    const evidenceOk = screenreaderEvidence?.status === 'passed'
      && runs.length >= minimumRuns
      && runs.every((run) => run.result === 'passed'
        && run.assistiveTechnology && run.browser && run.platform && run.testedAt && run.testerRole);
    if (!evidenceOk) gruende.push(`Realer Screenreader-Nachweis fehlt oder hat weniger als ${minimumRuns} bestandene Läufe`);
  }

  gruende.push(...bewerteReleaseHygiene(paths, profil).gruende);
  return { passed: gruende.length === 0, gruende };
}

export function bewerteProjektMessung(messung, profil) {
  const gruende = [];
  const label = `${messung.path} @ ${messung.viewportWidth}px`;
  if ((messung.errors || []).length) gruende.push(`${label}: ${messung.errors.length} Browserfehler`);
  if ((messung.failedLocalRequests || []).length) gruende.push(`${label}: ${messung.failedLocalRequests.length} fehlende lokale Ressource(n)`);
  if ((messung.externalRequests || []).length) gruende.push(`${label}: ${messung.externalRequests.length} externe Laufzeitanfrage(n)`);
  if (messung.horizontalOverflowPx > 1) gruende.push(`${label}: ${messung.horizontalOverflowPx}px horizontaler Überlauf`);
  if (messung.mainCount !== 1 || messung.h1Count !== 1) gruende.push(`${label}: main/H1 ${messung.mainCount}/${messung.h1Count} statt 1/1`);
  if (!messung.lang || !messung.title || !messung.metaDescription) gruende.push(`${label}: Sprach- oder Seitenmetadaten fehlen`);
  if (!messung.skip?.targetExists || !messung.skip?.visibleWhenFocused) gruende.push(`${label}: Skip-Link oder Fokusziel funktioniert nicht`);
  if (messung.activeNavigation?.count !== 1 || messung.activeNavigation?.textDecoration === 'none') {
    gruende.push(`${label}: genau ein semantisch und sichtbar aktiver Navigationsort erwartet`);
  }
  if ((messung.navigationTargets || []).some((height) => height + 0.5 < profil.navigation.minimumTargetPx)) {
    gruende.push(`${label}: Navigationsziel kleiner als ${profil.navigation.minimumTargetPx}px`);
  }
  if ((messung.inlineLinks || []).some((entry) => entry.display !== 'inline' || entry.minimumHeightPx > 0.5)) {
    gruende.push(`${label}: markierter Inline-Link verändert die natürliche Zeilenhöhe`);
  }
  if ((messung.actionLinkHeights || []).some((height) => height + 0.5 < profil.navigation.minimumTargetPx)) {
    gruende.push(`${label}: eigenständiger Aktionslink kleiner als ${profil.navigation.minimumTargetPx}px`);
  }
  if ((messung.brokenFragments || []).length) gruende.push(`${label}: ${messung.brokenFragments.length} ungültige Sprungmarke(n)`);
  if (!messung.favicon?.declared || !messung.favicon?.loaded) gruende.push(`${label}: Favicon fehlt oder ist nicht ladbar`);
  if (messung.viewportWidth === profil.viewports.wide.widthPx
    && messung.maximumReadingMeasureCh > profil.typography.bodyMeasureMaximumCh) {
    gruende.push(`${label}: längster Lesetext ${messung.maximumReadingMeasureCh} ch statt höchstens ${profil.typography.bodyMeasureMaximumCh} ch`);
  }
  return { passed: gruende.length === 0, gruende };
}

export function bewerteProfil({ profil, paketVersion, tokens, template, prompt, startingPoints = [] }) {
  const gruende = [];
  if (!profil) return { passed: false, gruende: ['profile.json fehlt'] };
  if (profil.systemVersion !== paketVersion) gruende.push(`profile.json steht auf ${profil.systemVersion}, Paket auf ${paketVersion}`);
  if (profil.id !== 'website' || profil.name !== 'Website') gruende.push('Profilname oder ID ist nicht Website');
  if (profil.status !== 'system-defined-web-profile') gruende.push('Status als eigenständiges digitales Systemprofil fehlt');
  if (profil.authority?.type !== 'measured-and-system-defined'
    || profil.authority?.normativeSource !== 'templates/website/profile.json'
    || profil.authority?.officialOfficeMediaClaim !== false) {
    gruende.push('profile.json ist nicht eindeutig als digitale Sollquelle ausgewiesen');
  }
  if (!/verbindliche Sollquelle/i.test(profil.sourceBoundary || '') || !/keine officeatwork/i.test(profil.sourceBoundary || '')) {
    gruende.push('Sollquelle oder Grenze zur Büromedien-Vorlage fehlt');
  }

  const widths = Object.values(profil.viewports || {}).map((v) => v.widthPx);
  if (JSON.stringify(widths) !== JSON.stringify([360, 768, 1440])) gruende.push('Prüfansichten sind nicht 360, 768 und 1440 px');
  if (profil.layout?.containerMaximumPx !== 1200 || profil.layout?.contentMeasureCh !== 68
    || profil.layout?.minimumInlineGutterPx !== 20 || profil.layout?.maximumInlineGutterPx !== 48
    || profil.layout?.horizontalOverflowAllowed !== false || profil.layout?.wideContainerCentered !== true) {
    gruende.push('Responsive Geometrie ist nicht vollständig definiert');
  }
  if (profil.typography?.family !== 'Rubik' || profil.typography?.fluidHeadingsRequired !== true
    || profil.typography?.bodyMeasureMinimumCh !== 45 || profil.typography?.bodyMeasureMaximumCh !== 75) {
    gruende.push('Webtypografie oder Satzbreite ist nicht vollständig definiert');
  }
  const semantik = profil.semantics || {};
  for (const feld of ['languageRequired', 'uniqueTitleRequired', 'metaDescriptionRequired', 'skipLinkRequired', 'exactlyOneMainRequired', 'navigationLabelRequired', 'activeNavigationUsesAriaCurrent', 'exactlyOneH1Required']) {
    if (semantik[feld] !== true) gruende.push(`Semantikregel ${feld} fehlt`);
  }
  if (profil.navigation?.minimumTargetPx !== 44
    || JSON.stringify(profil.navigation?.minimumTargetScope || []) !== JSON.stringify(['buttons', 'navigation links', 'standalone action links'])
    || profil.navigation?.inlineTextLinks?.layout !== 'inline-with-natural-line-height'
    || profil.navigation?.inlineTextLinks?.minimumHeightRequired !== false
    || profil.navigation?.colorAloneForActiveStateAllowed !== false) {
    gruende.push('Navigationsziel oder aktiver Zustand ist nicht verbindlich geregelt');
  }
  if (profil.formsAndData?.sensitiveInputPersistenceDefault !== 'off'
    || profil.formsAndData?.storagePolicyFile !== 'website-data-policy.json'
    || profil.formsAndData?.storageNoticeMarker !== 'data-storage-notice'
    || profil.formsAndData?.storageDeleteMarker !== 'data-storage-delete'
    || (profil.formsAndData?.browserStorageRequires || []).length < 5) {
    gruende.push('Sicherer Standard für sensible Browser-Daten fehlt');
  }
  if (profil.content?.faviconRequiredOnEveryPage !== true || profil.content?.tokensInsteadOfColorLiterals !== true) {
    gruende.push('Favicon- oder Tokenpflicht fehlt');
  }
  if (profil.content?.longformPattern?.registry !== 'templates/website/longform-pattern.json'
    || profil.content?.longformPattern?.styles !== 'tokens/web-longform.css'
    || profil.content?.longformPattern?.referenceDirectory !== 'templates/website/longform') {
    gruende.push('Langform- und Psychoedukationsmuster ist nicht vollständig registriert');
  }
  if (profil.safetyAccess?.status !== 'decision-template-requires-clinical-and-communications-approval'
    || !profil.safetyAccess?.variants?.direct || !profil.safetyAccess?.variants?.['persistent-subdued']) {
    gruende.push('Risikobasierte Sicherheitsvarianten oder Freigabegrenze fehlen');
  }
  if (profil.qualityGates?.allPagesProjectGateRequired !== true
    || profil.qualityGates?.allLocalResourcesMustResolve !== true
    || profil.qualityGates?.runtimeDependenciesMustBeLocal !== true
    || profil.qualityGates?.reflowWidthPx !== 320
    || profil.qualityGates?.textResizePercent !== 200
    || profil.qualityGates?.focusNotObscured !== true
    || profil.qualityGates?.screenreaderEvidenceFile !== 'website-screenreader-test.json'
    || profil.qualityGates?.screenreaderMinimumRuns !== 2) {
    gruende.push('Produktionsgate für konkrete Websites ist unvollständig');
  }
  if (profil.qualityGates?.applicationPatternsGateRequired !== true
    || profil.applicationPatterns?.registry !== 'templates/website/application-patterns.json'
    || profil.applicationPatterns?.referenceDirectory !== 'templates/website/applications'
    || (profil.applicationPatterns?.requiredIds || []).length !== 4) {
    gruende.push('Anwendungsmuster sind nicht vollständig registriert oder gegatet');
  }
  if (profil.releaseHygiene?.rawClaudeProjectExportIsReleaseArtifact !== false
    || JSON.stringify(profil.releaseHygiene?.canonicalReleaseCommands || [])
      !== JSON.stringify(['npm run release', 'npm run release:build -- <new-target-directory>'])) {
    gruende.push('Kanonischer Release ist nicht vom rohen Claude-Export abgegrenzt');
  }

  const tokenRegeln = [
    [/--web-size-h1-fluid:\s*clamp\(/i, 'fluide H1-Stufe fehlt'],
    [/--web-container-max:\s*1200px/i, '1200-px-Container fehlt'],
    [/--web-content-measure:\s*68ch/i, '68-ch-Satzbreite fehlt'],
    [/--web-touch-target:\s*44px/i, '44-px-Zielgrösse fehlt'],
    [/\.puk-web-skip:focus/i, 'sichtbarer Skip-Link-Fokus fehlt'],
    [/\.puk-web-nav__link\[aria-current="page"\]/i, 'sichtbarer aktiver Navigationszustand fehlt'],
    [/@media\s*\(max-width:\s*760px\)/i, 'schmale Navigationsansicht fehlt'],
  ];
  for (const [muster, grund] of tokenRegeln) if (!muster.test(tokens || '')) gruende.push(grund);

  if (!/@template[^>]*name="Website"/i.test(template || '')) gruende.push('Template ist nicht als Website registriert');
  if (!/data-web-profile="website"/i.test(template || '')) gruende.push('Website-Profilmarker fehlt im Template');
  if (!hatFavicon(template || '')) gruende.push('Website-Template enthält kein Favicon');
  gruende.push(...pruefeSeitenvertrag(template || '', 'Website', { navigationRequired: true }));
  if (/#[0-9a-f]{3,8}\b/i.test(template || '')) gruende.push('Website-Template enthält einen Farbliteral statt Token');
  if (!/<ul[^>]+puk-web-card-list/i.test(template || '')) gruende.push('Kartenraster ist nicht als Liste ausgezeichnet');

  for (const entry of startingPoints) {
    gruende.push(...pruefeSeitenvertrag(entry.source, entry.label));
    if (!hatFavicon(entry.source)) gruende.push(`${entry.label}: Favicon-Verweis fehlt`);
  }
  if (!/profile\.json/i.test(prompt || '') || !/320, 360, 768 und 1440/i.test(prompt || '') || !/nicht im Browser speichern/i.test(prompt || '')
    || !/application-patterns\.json/i.test(prompt || '')
    || !/longform-pattern\.json/i.test(prompt || '')
    || !/audit:website-project/i.test(prompt || '') || !/website-screenreader-test\.json/i.test(prompt || '')) {
    gruende.push('Usage Notes nennen Sollquelle, Prüfansichten oder sicheren Datenstandard nicht vollständig');
  }
  return { passed: gruende.length === 0, gruende };
}

export function bewerteLongformRegister({ profil, pattern, paketVersion, pages = [] }) {
  const gruende = [];
  if (pattern?.systemVersion !== paketVersion || pattern?.id !== 'longform-psychoeducation'
    || pattern?.status !== 'validated-system-pattern') {
    gruende.push('Langform-Register hat falsche Version, ID oder Status');
  }
  if (pattern?.authority?.officialPukCorporateDesignRule !== false
    || pattern?.authority?.humanComprehensionTested !== false) {
    gruende.push('Herkunft oder reale Prüfgrenze des Langform-Musters ist nicht transparent');
  }
  const contractIds = (pattern?.contracts || []).map((entry) => entry.id);
  for (const id of ['roadmap', 'term-guide', 'explanation', 'figure', 'reflection', 'transition', 'sources']) {
    if (!contractIds.includes(id)) gruende.push(`Langform-Vertrag ${id} fehlt`);
  }
  const figure = (pattern?.contracts || []).find((entry) => entry.id === 'figure');
  if (figure?.requirement !== 'SOLL'
    || !/Metapher|Erleben/i.test(figure?.useWhen || '')
    || !(figure?.must || []).some((entry) => /Illustration/i.test(entry))) {
    gruende.push('Erklärende Visualisierungen sind nicht ausdrücklich als erwünschte Langformoption verankert');
  }
  const formats = (pattern?.formatDecisionGuide || []).map((entry) => entry.format);
  for (const format of ['Fliesstext', 'Karte', 'Diagramm oder Infografik', 'Illustration', 'Akkordeon', 'eigener Abschnitt oder eigene Seite']) {
    if (!formats.includes(format)) gruende.push(`Entscheidungshilfe für ${format} fehlt`);
  }
  const expected = pattern?.references || [];
  if (expected.length !== 3 || pages.length !== 3
    || pages.some((entry) => !expected.includes(entry.path))) {
    gruende.push('Zwei Referenzfälle und der Transferfall sind nicht vollständig registriert');
  }
  if (profil?.content?.longformPattern?.registry !== 'templates/website/longform-pattern.json') {
    gruende.push('Website-Profil verweist nicht auf das Langform-Register');
  }
  for (const page of pages) {
    if (!/data-longform-pattern=["']longform-psychoeducation["']/i.test(page.source || '')) gruende.push(`${page.path}: Langform-Marker fehlt`);
    if (vorkommen(page.source, /<main\b/gi) !== 1 || vorkommen(page.source, /<h1\b/gi) !== 1) gruende.push(`${page.path}: genau ein main und eine H1 erwartet`);
    if (vorkommen(page.source, /aria-current=["']page["']/gi) !== 1) gruende.push(`${page.path}: genau ein aktiver Navigationsort erwartet`);
    if (!/class=["'][^"']*puk-link--inline/i.test(page.source || '') || !/class=["'][^"']*puk-link--action/i.test(page.source || '')) {
      gruende.push(`${page.path}: Inline- und Aktionslink werden nicht gemeinsam demonstriert`);
    }
  }
  return { passed: gruende.length === 0, gruende };
}

export function bewerteLongformMessung(messung, profil) {
  const gruende = [];
  const label = `${messung.path} @ ${messung.viewportWidth}px`;
  if (messung.pattern !== 'longform-psychoeducation') gruende.push(`${label}: Langform-Marker fehlt`);
  if ((messung.errors || []).length) gruende.push(`${label}: ${messung.errors.length} Browserfehler`);
  if ((messung.externalRequests || []).length) gruende.push(`${label}: ${messung.externalRequests.length} externe Laufzeitanfrage(n)`);
  if (messung.horizontalOverflowPx > 1) gruende.push(`${label}: ${messung.horizontalOverflowPx}px horizontaler Überlauf`);
  if (messung.mainCount !== 1 || messung.h1Count !== 1) gruende.push(`${label}: main/H1 ${messung.mainCount}/${messung.h1Count} statt 1/1`);
  if (messung.activeNavigationCount !== 1) gruende.push(`${label}: genau ein aktiver Navigationsort erwartet`);
  if ((messung.navigationTargets || []).some((height) => height + 0.5 < profil.navigation.minimumTargetPx)) {
    gruende.push(`${label}: Navigationsziel kleiner als ${profil.navigation.minimumTargetPx}px`);
  }
  if (!(messung.inlineLinks || []).length
    || (messung.inlineLinks || []).some((entry) => entry.display !== 'inline' || entry.minimumHeightPx > 0.5)) {
    gruende.push(`${label}: Inline-Link ist nicht mit natürlicher Zeilenhöhe umgesetzt`);
  }
  if (!(messung.actionLinkHeights || []).length
    || messung.actionLinkHeights.some((height) => height + 0.5 < profil.navigation.minimumTargetPx)) {
    gruende.push(`${label}: eigenständiger Aktionslink unterschreitet ${profil.navigation.minimumTargetPx}px`);
  }
  if ((messung.brokenFragments || []).length) gruende.push(`${label}: ${messung.brokenFragments.length} ungültige Sprungmarke(n)`);
  if (messung.headingOverflow) gruende.push(`${label}: lange Überschrift läuft horizontal über`);
  if (messung.viewportWidth >= profil.viewports.wide.widthPx
    && messung.maximumReadingMeasureCh > profil.typography.bodyMeasureMaximumCh) {
    gruende.push(`${label}: Lesetext ${messung.maximumReadingMeasureCh} ch statt höchstens ${profil.typography.bodyMeasureMaximumCh} ch`);
  }
  return { passed: gruende.length === 0, gruende };
}

export function bewerteMessung(messung, profil) {
  const gruende = [];
  if (!messung) return { passed: false, gruende: ['Messung fehlt'] };
  if ((messung.errors || []).length) gruende.push(`${messung.errors.length} Browserfehler`);
  if ((messung.externalRequests || []).length) gruende.push(`${messung.externalRequests.length} externe Anfragen`);
  if (messung.horizontalOverflowPx > 1) gruende.push(`${messung.viewportWidth}px: ${messung.horizontalOverflowPx}px horizontaler Überlauf`);
  if (messung.mainCount !== 1 || messung.h1Count !== 1) gruende.push(`${messung.viewportWidth}px: main/H1 ${messung.mainCount}/${messung.h1Count} statt 1/1`);
  if (!messung.lang || !messung.title || !messung.metaDescription) gruende.push(`${messung.viewportWidth}px: Sprach- oder Seitenmetadaten fehlen`);
  if (!messung.skip?.targetExists || !messung.skip?.visibleWhenFocused) gruende.push(`${messung.viewportWidth}px: Skip-Link oder Fokusziel funktioniert nicht`);
  if ((messung.navigationTargets || []).some((height) => height + 0.5 < profil.navigation.minimumTargetPx)) {
    gruende.push(`${messung.viewportWidth}px: Navigationsziel kleiner als ${profil.navigation.minimumTargetPx}px`);
  }
  if (!messung.activeNavigation?.ariaCurrent || messung.activeNavigation?.textDecoration === 'none') {
    gruende.push(`${messung.viewportWidth}px: aktiver Navigationszustand ist nicht semantisch und sichtbar`);
  }
  if (messung.containerWidthPx > profil.layout.containerMaximumPx + 1) gruende.push(`${messung.viewportWidth}px: Container breiter als 1200px`);
  if (messung.viewportWidth === profil.viewports.wide.widthPx && messung.containerBalancePx > 2) {
    gruende.push(`${messung.viewportWidth}px: Container nicht zentriert (${messung.containerBalancePx}px Differenz)`);
  }
  if (messung.h1Overflow) gruende.push(`${messung.viewportWidth}px: H1 läuft horizontal über`);
  if (messung.viewportWidth === profil.viewports.narrow.widthPx && messung.cardColumns !== 1) gruende.push('360px: Kartenraster ist nicht einspaltig');
  if (messung.viewportWidth === profil.viewports.wide.widthPx && messung.cardColumns < 3) gruende.push('1440px: Kartenraster nutzt weniger als drei Spalten');
  if (messung.viewportWidth === profil.viewports.wide.widthPx
    && (messung.copyMeasureCh < profil.typography.bodyMeasureMinimumCh || messung.copyMeasureCh > profil.typography.bodyMeasureMaximumCh)) {
    gruende.push(`1440px: Satzbreite ${messung.copyMeasureCh} ch ausserhalb 45–75 ch`);
  }
  return { passed: gruende.length === 0, gruende };
}

export function bewerteReleaseHygiene(paths, profil) {
  const gruende = [];
  for (const pfad of paths || []) {
    for (const muster of profil?.releaseHygiene?.forbiddenPathPatterns || []) {
      if (String(pfad).toLocaleLowerCase('de-CH').includes(String(muster).toLocaleLowerCase('de-CH'))) gruende.push(`${pfad} trifft ${muster}`);
    }
  }
  return { passed: gruende.length === 0, gruende };
}

export function gesamtstatus(teile) {
  const werte = Object.values(teile);
  return werte.length > 0 && werte.every((teil) => teil.passed) ? 'passed' : 'failed';
}
