import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from '../src/routes.js';
import { TOOLS } from '../src/site-content.js';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SHA256 = /^[a-f0-9]{64}$/;
const GOVERNANCE_FILES = new Set(['website-data-policy.json', 'website-screenreader-test.json']);
const REQUIRED_HANDOUTS = ['dl-01', 'dl-02', 'dl-04', 'dl-05', 'dl-06', 'dl-07', 'dl-08'];
const REQUIRED_SCENARIOS = [
  'skip-link-and-landmarks',
  'route-and-anchor-focus',
  'back-forward-navigation',
  'module-sequence-and-source-disclosures',
  'fictional-example-and-graph-alternatives',
  'crisis-contact-links',
  'dialog-focus-trap-escape-return',
  'crisisplan-labels-and-print',
  'communication-form-validation',
  'communication-result-edit-copy',
  'communication-copy-failure',
  'storage-notices-and-memory-only',
  'legacy-deletion-confirm-cancel',
  'legacy-deletion-failure',
  'reflection-results-and-announcements',
  'tabs-keyboard-and-selected-state',
  'breathing-live-announcements-and-stop',
  'handout-dialog-sources-print',
  'handout-return-module-focus',
  'faq-disclosures',
  'page-loading-and-recovery',
  'tool-loading-and-recovery',
  'narrow-reflow-and-text-resize',
];

function digest(value) {
  return createHash('sha256').update(value).digest('hex');
}

function isText(value, minimum = 1, maximum = 2000) {
  return typeof value === 'string' && value.trim().length >= minimum && value.length <= maximum
    && !/\b(?:TODO|TBD|PLACEHOLDER|YYYY-MM-DD|prepared-not-executed)\b/i.test(value);
}

function validDate(value, now) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
    && value <= now.toISOString().slice(0, 10);
}

function humanIdentity(record) {
  return record?.performedBy === 'human'
    && isText(record.testerRole, 3, 80)
    && /^[\p{L}\p{M} .()/-]+$/u.test(record.testerRole)
    && !/\b(?:KI|AI|bot|automated|automation|Playwright|axe|agent|synthetic)\b/i.test(record.testerRole)
    && typeof record.testerInitials === 'string' && /^[A-ZÄÖÜ]{1,4}(?:\.[A-ZÄÖÜ]{1,4})?\.?$/.test(record.testerInitials);
}

async function readJson(filename) {
  return JSON.parse(await fs.readFile(filename, 'utf8'));
}

// Reject symlinks instead of silently hashing files outside the project/build.
async function collectFiles(directory, prefix = '', omit = () => false) {
  const stat = await fs.lstat(directory);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error(`Kein reguläres Verzeichnis: ${directory}`);
  const files = [];
  const entries = (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name, 'en'));
  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (omit(relative)) continue;
    const filename = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Symlink im Inhaltsstand ist nicht zulässig: ${relative}`);
    if (entry.isDirectory()) files.push(...await collectFiles(filename, relative, omit));
    else if (entry.isFile()) files.push({ path: relative, bytes: await fs.readFile(filename) });
    else throw new Error(`Kein reguläres Asset: ${relative}`);
  }
  return files;
}

function manifestHash(files) {
  return digest(JSON.stringify(files.sort((a, b) => a.path.localeCompare(b.path, 'en'))
    .map((file) => ({ path: file.path, size: file.bytes.length, sha256: digest(file.bytes) }))));
}

/** Content identity, without commit IDs, dates, test results or approval metadata. */
export async function computeReleaseFingerprint({ root = PROJECT_ROOT, distDirectory = 'dist' } = {}) {
  const projectRoot = path.resolve(root);
  const buildRoot = path.resolve(projectRoot, distDirectory);
  if (buildRoot === projectRoot || buildRoot === path.join(projectRoot, 'src') || buildRoot === path.join(projectRoot, 'public')) {
    throw new Error('Das Build-Verzeichnis darf kein Quellenverzeichnis sein.');
  }
  const sourceFiles = [
    ...await collectFiles(path.join(projectRoot, 'src'), 'src', (name) => name.startsWith('src/test/') || /\.(?:test|spec)\.[cm]?[jt]sx?$/.test(name)),
    ...await collectFiles(path.join(projectRoot, 'public'), 'public', (name) => GOVERNANCE_FILES.has(name.slice('public/'.length))),
  ];
  for (const name of ['index.html', 'package-lock.json']) {
    const filename = path.join(projectRoot, name);
    const stat = await fs.lstat(filename);
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`Keine reguläre Build-Eingabe: ${name}`);
    sourceFiles.push({ path: name, bytes: await fs.readFile(filename) });
  }
  // Scripts/docs/tests do not affect shipped application content. Build and dependency inputs do.
  for (const name of ['package.json', 'vite.config.js', 'vite.config.mjs', 'vite.config.ts', 'netlify.toml']) {
    const filename = path.join(projectRoot, name);
    try {
      const stat = await fs.lstat(filename);
      if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`Keine reguläre Build-Eingabe: ${name}`);
      sourceFiles.push({ path: name, bytes: await fs.readFile(filename) });
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  const buildFiles = await collectFiles(buildRoot, '', (name) => GOVERNANCE_FILES.has(name));
  const index = buildFiles.find((file) => file.path === 'index.html');
  if (!index || !index.bytes.length || !buildFiles.some((file) => /^assets\/.+\.js$/.test(file.path))
    || !buildFiles.some((file) => /^assets\/.+\.css$/.test(file.path))) {
    throw new Error('Produktionsbuild fehlt oder ist unvollständig (index.html, JavaScript und CSS erforderlich).');
  }
  const html = index.bytes.toString('utf8');
  const references = [...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)=["']([^"']+)["'][^>]*>/gi)]
    .filter(([tag]) => /\btype=["']module["']|\brel=["']stylesheet["']/i.test(tag));
  if (!references.some(([tag]) => /\btype=["']module["']/i.test(tag))) throw new Error('Produktionsbuild hat kein Modul-Einstiegsskript.');
  for (const [, reference] of references) {
    if (/^[a-z][a-z\d+.-]*:|^\/\//i.test(reference)) throw new Error('Build-Einstieg referenziert externe Laufzeit-Assets.');
    const relative = reference.replace(/^\//, '').split(/[?#]/)[0];
    if (!buildFiles.some((file) => file.path === relative)) throw new Error(`Build-Einstiegsasset fehlt: ${reference}`);
  }
  const sourceSha256 = manifestHash(sourceFiles);
  const buildSha256 = manifestHash(buildFiles);
  return {
    version: 1,
    algorithm: 'sha256',
    sourceSha256,
    buildSha256,
    sha256: digest(`puk-release-content-v1\0${sourceSha256}\0${buildSha256}`),
  };
}

function sameFingerprint(recorded, current) {
  return recorded?.version === 1 && recorded?.algorithm === 'sha256'
    && ['sourceSha256', 'buildSha256', 'sha256'].every((key) => SHA256.test(recorded[key]) && recorded[key] === current[key]);
}

async function regularProjectFile(root, relative, prefix) {
  if (typeof relative !== 'string' || !relative || relative.includes('\\') || path.isAbsolute(relative)
    || relative.split('/').some((part) => part === '..' || part === '.' || !part)
    || (prefix && !relative.startsWith(prefix))) throw new Error(`Ungültiger Belegpfad: ${relative}`);
  const filename = path.resolve(root, relative);
  if (!filename.startsWith(`${path.resolve(root)}${path.sep}`)) throw new Error(`Beleg ausserhalb des Projekts: ${relative}`);
  let current = path.resolve(root);
  for (const segment of relative.split('/')) {
    current = path.join(current, segment);
    const stat = await fs.lstat(current);
    if (stat.isSymbolicLink()) throw new Error(`Symlink als Beleg: ${relative}`);
  }
  if (!(await fs.stat(filename)).isFile()) throw new Error(`Kein regulärer Beleg: ${relative}`);
  return fs.readFile(filename);
}

async function checkHumanArtifacts(items, root, errors, label) {
  const available = new Set();
  if (!Array.isArray(items) || !items.length) {
    errors.push(`${label}: tatsächlicher menschlicher Testbericht fehlt.`);
    return available;
  }
  for (const item of items) {
    if (!item || item.kind !== 'human-test-report' || !SHA256.test(item.sha256)) {
      errors.push(`${label}: jeder Beleg braucht kind human-test-report, lokalen Pfad und SHA256.`);
      continue;
    }
    try {
      const bytes = await regularProjectFile(root, item.path, '_dev/screenreader-evidence/');
      if (!/\.(?:md|txt|json)$/i.test(item.path) || bytes.toString('utf8').trim().length < 80
        || bytes.includes(0) || digest(bytes) !== item.sha256) throw new Error('Textbericht leer, zu kurz, ungültiges Format oder Hash stimmt nicht');
      if (available.has(item.path)) throw new Error('Beleg ist doppelt eingetragen');
      available.add(item.path);
    } catch (error) {
      errors.push(`${label}: ${item.path || '(kein Pfad)'}: ${error.message}`);
    }
  }
  return available;
}

function checkCoverage(items, expected, key, artifacts, errors, label) {
  if (!Array.isArray(items)) {
    errors.push(`${label}: vollständige Prüfliste fehlt.`);
    return;
  }
  const seen = new Set();
  for (const item of items) {
    const id = item?.[key];
    if (!expected.includes(id) || seen.has(id)) errors.push(`${label}: unbekannter oder doppelter Eintrag ${id}.`);
    seen.add(id);
    if (item?.result !== 'passed' || !isText(item?.observation, 12)
      || !Array.isArray(item?.evidence) || !item.evidence.length || !item.evidence.every((ref) => artifacts.has(ref))) {
      errors.push(`${label} ${id}: bestandenes Ergebnis, konkrete Beobachtung und verifizierter Beleg erforderlich.`);
    }
  }
  for (const id of expected) if (!seen.has(id)) errors.push(`${label}: Nachweis für ${id} fehlt.`);
}

export async function validateScreenreaderEvidence(evidence, { root = PROJECT_ROOT, fingerprint, profile, now = new Date() }) {
  const errors = [];
  if (evidence?.status !== 'passed') errors.push('Reale Screenreader-Prüfung ist noch nicht bestanden (pending bleibt ein Release-Blocker).');
  if (evidence?.releaseEvidenceVersion !== 1) errors.push('Projektbezogener Nachweisvertrag releaseEvidenceVersion 1 fehlt.');
  if (!sameFingerprint(evidence?.releaseFingerprint, fingerprint)) errors.push('Screenreader-Nachweis fehlt für den aktuellen Quellen-/Build-Inhaltsstand.');
  const runs = Array.isArray(evidence?.runs) ? evidence.runs : [];
  const minimumRuns = profile?.qualityGates?.screenreaderMinimumRuns;
  if (!Number.isInteger(minimumRuns) || minimumRuns < 2
    || profile?.qualityGates?.screenreader !== 'human-test-required-before-production') errors.push('Verbindlicher Websiteprofil-Screenreader-Vertrag fehlt.');
  if (runs.length < Math.max(minimumRuns || 2, 2)) errors.push('Mindestens zwei vollständig dokumentierte reale AT-Läufe sind erforderlich.');
  const families = new Set();
  const ids = new Set();
  for (const [index, run] of runs.entries()) {
    const label = `AT-Lauf ${index + 1}`;
    if (run?.assistiveTechnology === 'VoiceOver' && run.browser === 'Safari' && ['macOS', 'iOS'].includes(run.platform)) families.add('VoiceOver');
    else if (run?.assistiveTechnology === 'NVDA' && ['Firefox', 'Chrome'].includes(run.browser) && run.platform === 'Windows') families.add('NVDA');
    else errors.push(`${label}: erforderlich sind VoiceOver/Safari/macOS oder iOS und NVDA/Firefox oder Chrome/Windows (ein konkretes System pro Lauf).`);
    if (!isText(run?.id, 3, 80) || !/^[a-z\d-]+$/.test(run.id) || ids.has(run.id)) errors.push(`${label}: eindeutige Lauf-ID fehlt.`);
    ids.add(run?.id);
    if (run?.result !== 'passed' || !humanIdentity(run) || !validDate(run?.testedAt, now)) errors.push(`${label}: reales menschliches Ergebnis, Rolle/Initialen und gültiges Testdatum fehlen.`);
    if (!['assistiveTechnologyVersion', 'browserVersion', 'platformVersion'].every((key) => isText(run?.[key], 1, 80) && /\d/.test(run[key]))) errors.push(`${label}: konkrete AT-, Browser- und Betriebssystem-Versionen fehlen.`);
    if (run?.releaseFingerprintSha256 !== fingerprint.sha256) errors.push(`${label}: Lauf ist nicht an den aktuellen Inhaltsstand gebunden.`);
    const artifacts = await checkHumanArtifacts(run?.evidence, root, errors, label);
    checkCoverage(run?.routeChecks, ROUTES.map(({ path: route }) => route), 'route', artifacts, errors, `${label} Routen`);
    checkCoverage(run?.toolChecks, TOOLS.map(({ tool }) => tool), 'tool', artifacts, errors, `${label} Werkzeuge`);
    checkCoverage(run?.handoutChecks, REQUIRED_HANDOUTS, 'handout', artifacts, errors, `${label} Handouts`);
    checkCoverage(run?.scenarioChecks, REQUIRED_SCENARIOS, 'scenario', artifacts, errors, `${label} Zustände`);
  }
  for (const family of ['VoiceOver', 'NVDA']) if (!families.has(family)) errors.push(`Realer ${family}-Lauf fehlt; doppelte Läufe desselben Systems ersetzen ihn nicht.`);
  const approval = evidence?.manualApproval;
  if (approval?.status !== 'approved' || !humanIdentity(approval) || !validDate(approval?.reviewedAt, now)
    || approval?.releaseFingerprintSha256 !== fingerprint.sha256
    || runs.some((run) => validDate(run?.testedAt, now) && approval.reviewedAt < run.testedAt)) {
    errors.push('Menschliche Schlussprüfung mit Rolle/Initialen nach den Läufen und für diesen Inhaltsstand fehlt.');
  }
  await checkHumanArtifacts(approval?.evidence, root, errors, 'Menschliche Schlussprüfung');
  if (!Array.isArray(evidence?.issues)) errors.push('Explizite Issue-Liste (auch leer) fehlt.');
  else for (const issue of evidence.issues) {
    if (!isText(issue?.id) || issue.status !== 'fixed-retested' || !isText(issue.resolution, 12)
      || !Array.isArray(issue.retestedRuns) || !runs.length || !runs.every((run) => issue.retestedRuns.includes(run.id))) {
      errors.push(`Offener oder nicht in beiden AT-Systemen nachgeprüfter Befund: ${issue?.id || '(ohne ID)'}.`);
    }
  }
  return { passed: errors.length === 0, errors, completedRuns: runs.filter((run) => run?.result === 'passed').length };
}

export async function validatePrivacyAcceptance(policy, { root = PROJECT_ROOT, fingerprint, now = new Date() }) {
  const errors = [];
  const acceptance = policy?.technicalAcceptance;
  if (policy?.status !== 'approved' || !validDate(policy?.reviewedAt, now) || !isText(policy?.reviewerRole, 3)
    || !isText(policy?.approvalMeaning, 40)) errors.push('Begrenzte technische Datenschutzentscheidung fehlt oder ihr Umfang ist nicht erklärt.');
  if (acceptance?.schemaVersion !== 1 || acceptance?.status !== 'accepted'
    || acceptance?.authority !== 'delegated-project-decision'
    || acceptance?.scope !== 'memory-only-application-and-legacy-deletion'
    || !validDate(acceptance?.reviewedAt, now) || !isText(acceptance?.reviewerRole, 3)
    || !sameFingerprint(acceptance?.releaseFingerprint, fingerprint)) errors.push('Technische Datenschutzentscheidung ist unvollständig oder nicht an den aktuellen App-Inhaltsstand gebunden.');
  if (policy?.profileCompatibility?.privacyReview !== 'technical-application-approved'
    || policy?.profileCompatibility?.productionApproval !== 'not-claimed'
    || policy?.profileCompatibility?.institutionalApproval !== 'not-claimed') errors.push('Technische, institutionelle und Produktionsfreigabe müssen ausdrücklich getrennt sein.');
  if (policy?.transmission !== 'verified-none' || policy?.storageBehavior?.currentPersistence !== 'disabled'
    || !Array.isArray(policy?.browserStorage) || !policy.browserStorage.length
    || !policy.browserStorage.every((item) => item?.legacyOnly === true && item?.persistenceEnabled === false)
    || !['cookies', 'indexedDB', 'cacheStorage', 'serviceWorkers'].every((key) => Array.isArray(policy?.otherApplicationStorage?.[key]) && policy.otherApplicationStorage[key].length === 0)) errors.push('Die technische Entscheidung gilt nur für Memory-only und Löschung historischer Entwürfe. Neue Speicherung braucht eine neue Entscheidung.');
  if (!Array.isArray(policy?.dataCategories) || !policy.dataCategories.length || !policy.dataCategories.every((item) => isText(item)) || !isText(policy?.retention)
    || !isText(policy?.deleteMechanism)) errors.push('Datenschutzinventar, Aufbewahrung oder Löschweg fehlen.');
  if (!Array.isArray(acceptance?.excluded) || acceptance.excluded.length < 3 || !acceptance.excluded.every((item) => isText(item, 3))) errors.push('Grenzen der technischen Entscheidung müssen dokumentiert sein.');
  if (!Array.isArray(acceptance?.evidence) || acceptance.evidence.length < 3) errors.push('Unabhängige technische Belege zur Datenschutzentscheidung fehlen.');
  else for (const reference of acceptance.evidence) {
    try {
      const bytes = await regularProjectFile(root, reference);
      if (!bytes.length) throw new Error('leerer Beleg');
    } catch (error) { errors.push(`Datenschutzbeleg ${reference}: ${error.message}`); }
  }
  return { passed: errors.length === 0, errors };
}

export async function verifyReleaseEvidence({ root = PROJECT_ROOT, distDirectory = 'dist', evidenceFile = 'website-screenreader-test.json', now = new Date() } = {}) {
  const errors = [];
  let fingerprint;
  try { fingerprint = await computeReleaseFingerprint({ root, distDirectory }); }
  catch (error) { return { passed: false, errors: [`Inhaltsstand nicht bestimmbar: ${error.message}`] }; }
  let evidence, policy, profile;
  for (const [label, filename, assign] of [
    ['Screenreader-Nachweis', path.resolve(root, evidenceFile), (value) => { evidence = value; }],
    ['Datenschutzentscheidung', path.join(root, 'public/website-data-policy.json'), (value) => { policy = value; }],
    ['Websiteprofil', path.join(root, 'src/puk-design/profile.json'), (value) => { profile = value; }],
  ]) {
    try { assign(await readJson(filename)); }
    catch (error) { errors.push(`${label} nicht lesbar: ${error.message}`); }
  }
  const screenreader = await validateScreenreaderEvidence(evidence, { root, fingerprint, profile, now });
  const privacy = await validatePrivacyAcceptance(policy, { root, fingerprint, now });
  return { passed: !errors.length && screenreader.passed && privacy.passed, fingerprint, screenreader, privacy, errors };
}

export function createPendingScreenreaderTemplate(fingerprint) {
  const checklist = (key, values) => values.map((value) => ({ [key]: value, result: 'pending', observation: '', evidence: [] }));
  const run = (assistiveTechnology, browser, platform) => ({
    id: `${assistiveTechnology.toLowerCase()}-real-run`, assistiveTechnology, browser, platform,
    assistiveTechnologyVersion: '', browserVersion: '', platformVersion: '',
    testedAt: null, performedBy: 'human', testerRole: null, testerInitials: null, result: 'pending',
    releaseFingerprintSha256: fingerprint.sha256, evidence: [],
    routeChecks: checklist('route', ROUTES.map(({ path: route }) => route)),
    toolChecks: checklist('tool', TOOLS.map(({ tool }) => tool)),
    handoutChecks: checklist('handout', REQUIRED_HANDOUTS),
    scenarioChecks: checklist('scenario', REQUIRED_SCENARIOS),
  });
  return {
    status: 'prepared-not-executed', releaseEvidenceVersion: 1,
    profileTarget: 'PUK Websiteprofil 1.10.1',
    lastTechnicalPreparation: new Date().toISOString().slice(0, 10),
    scope: 'Alle 16 Routen, 9 Werkzeuge, 7 Handouts sowie Fokus-, Formular-, Lade- und Fehlerzustände; reale menschliche AT-Prüfung',
    releaseFingerprint: fingerprint, testedWith: [], manualApproval: null,
    requiredSystems: ['VoiceOver with Safari on macOS or iOS', 'NVDA with Firefox or Chrome on Windows'],
    scenarios: [
      'Skip link, main landmark and keyboard focus after navigation',
      'Module navigation, headings, source details and fictional-example labels',
      'Crisis contact links, crisis plan fields and visible storage notices',
      'Tool overlay focus trap, Escape and return focus',
      'Memory-only tool drafts, reset feedback and removal of historical drafts from both browser stores',
      'Reflection questions, mixed-symptom graph text alternative and result announcements',
      '320 and 360 px layouts and 200 percent text enlargement',
    ],
    evidence: [],
    runs: [run('VoiceOver', 'Safari', 'macOS'), run('NVDA', 'Firefox', 'Windows')], issues: [],
    schemaReference: 'scripts/puk-audit/vendor/templates/website/website-screenreader-test.example.json',
    instructionsFile: '_dev/SCREENREADER-RELEASE-TEST.md',
    note: 'Nur nach tatsächlich ausgeführten menschlichen Tests ausfüllen. Rollen und Initialen, keine Namen oder persönlichen Gesundheitsdaten. Automatische Tests ersetzen keine AT-Läufe.',
  };
}

async function main() {
  const args = process.argv.slice(2);
  const options = { root: PROJECT_ROOT, distDirectory: 'dist' };
  let mode = 'verify';
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === '--fingerprint' || arg === '--template') mode = arg.slice(2);
    else if (arg === '--root' || arg === '--dist' || arg === '--evidence') {
      if (!args[index + 1] || args[index + 1].startsWith('--')) throw new Error(`${arg} benötigt einen Wert.`);
      options[{ '--root': 'root', '--dist': 'distDirectory', '--evidence': 'evidenceFile' }[arg]] = args[++index];
    } else throw new Error(`Unbekanntes Argument: ${arg}`);
  }
  if (mode !== 'verify') {
    const fingerprint = await computeReleaseFingerprint(options);
    process.stdout.write(`${JSON.stringify(mode === 'template' ? createPendingScreenreaderTemplate(fingerprint) : fingerprint, null, 2)}\n`);
    return;
  }
  const result = await verifyReleaseEvidence(options);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.passed) process.exitCode = 1;
}

export { REQUIRED_HANDOUTS, REQUIRED_SCENARIOS };

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`Release-Nachweisprüfung fehlgeschlagen: ${error.message}\n`);
    process.exitCode = 1;
  });
}
