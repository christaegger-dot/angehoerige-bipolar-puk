import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  computeReleaseFingerprint, createPendingScreenreaderTemplate,
  validatePrivacyAcceptance, validateScreenreaderEvidence, verifyReleaseEvidence,
} from '../verify-release-evidence.mjs';

const NOW = new Date('2026-10-06T12:00:00Z');
const PROFILE = { qualityGates: { screenreader: 'human-test-required-before-production', screenreaderMinimumRuns: 2 } };
const SCRIPT = fileURLToPath(new URL('../verify-release-evidence.mjs', import.meta.url));
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'puk-release-evidence-test-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const write = async (filename, content) => {
    await fs.mkdir(path.dirname(path.join(root, filename)), { recursive: true });
    await fs.writeFile(path.join(root, filename), content);
  };
  await write('src/main.jsx', 'export const message = "fixture application";\n');
  await write('src/puk-design/profile.json', JSON.stringify(PROFILE));
  await write('public/logo.svg', '<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  await write('index.html', '<div id="root"></div>');
  await write('package-lock.json', '{"lockfileVersion":3,"packages":{}}');
  await write('package.json', '{"type":"module"}');
  await write('vite.config.js', 'export default {};');
  await write('dist/index.html', '<script type="module" src="/assets/app.js"></script><link rel="stylesheet" href="/assets/app.css">');
  await write('dist/assets/app.js', 'document.body.textContent="Fixture";');
  await write('dist/assets/app.css', 'body {color:#222}');
  await write('dist/logo.svg', '<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  // Synthetic schema fixtures are local to node:test; no actual release record is generated.
  const references = [];
  for (const family of ['voiceover', 'nvda']) {
    const filename = `_dev/screenreader-evidence/${family}-test-fixture.md`;
    const text = `# Synthetic unit-test fixture for ${family}\nThis fixture checks validation logic only. It is not a human screenreader test or a production approval.\n`;
    await write(filename, text);
    references.push({ kind: 'human-test-report', path: filename, sha256: hash(text) });
  }
  await write('_dev/privacy-test-fixture.md', 'Synthetic privacy-decision fixture. Not a production approval.');
  await write('scripts/privacy-test-fixture.mjs', 'export const fixture = true;');
  await write('src/test/privacy.test.js', '/* Synthetic test reference. */');
  const fingerprint = await computeReleaseFingerprint({ root });
  const evidence = createPendingScreenreaderTemplate(fingerprint);
  evidence.status = 'passed';
  evidence.runs.forEach((run, index) => {
    Object.assign(run, {
      result: 'passed', testedAt: '2026-10-05', performedBy: 'human', testerRole: 'Accessibility Review', testerInitials: 'AB',
      assistiveTechnologyVersion: index ? '2026.1' : '16', browserVersion: index ? '145' : '26', platformVersion: index ? '11' : '26',
      evidence: [references[index]],
    });
    for (const list of ['routeChecks', 'toolChecks', 'handoutChecks', 'scenarioChecks']) {
      run[list].forEach((check) => Object.assign(check, {
        result: 'passed', observation: 'Synthetic validation fixture: labelled content and expected focus documented.', evidence: [references[index].path],
      }));
    }
  });
  evidence.manualApproval = {
    status: 'approved', performedBy: 'human', testerRole: 'Accessibility Review', testerInitials: 'CD',
    reviewedAt: '2026-10-06', releaseFingerprintSha256: fingerprint.sha256, evidence: references,
  };
  const policy = {
    status: 'approved', reviewedAt: '2026-10-06', reviewerRole: 'KI-gestützte technische Prüfung im Projektauftrag',
    approvalMeaning: 'Begrenzte technische Produktentscheidung für den Anwendungscode; keine institutionelle PUK-Freigabe.',
    technicalAcceptance: {
      schemaVersion: 1, status: 'accepted', reviewedAt: '2026-10-06', reviewerRole: 'KI-gestützte technische Prüfung im Projektauftrag',
      authority: 'delegated-project-decision', scope: 'memory-only-application-and-legacy-deletion', releaseFingerprint: fingerprint,
      evidence: ['_dev/privacy-test-fixture.md', 'scripts/privacy-test-fixture.mjs', 'src/test/privacy.test.js'],
      excluded: ['Institutionelle PUK-Freigabe', 'Hosting-Verträge', 'Betriebssystem und E-Mail'],
    },
    profileCompatibility: { privacyReview: 'technical-application-approved', productionApproval: 'not-claimed', institutionalApproval: 'not-claimed' },
    transmission: 'verified-none', storageBehavior: { currentPersistence: 'disabled' },
    browserStorage: [{ legacyOnly: true, persistenceEnabled: false }],
    otherApplicationStorage: { cookies: [], indexedDB: [], cacheStorage: [], serviceWorkers: [] },
    dataCategories: ['Freiwillige Testdaten, keine realen Gesundheitsdaten'], retention: 'Nur im flüchtigen Zustand', deleteMechanism: 'Explizite Löschung alter Entwürfe',
  };
  const persist = async () => {
    await write('website-screenreader-test.json', JSON.stringify(evidence));
    await write('public/website-data-policy.json', JSON.stringify(policy));
  };
  await persist();
  return { root, write, fingerprint, evidence, policy, persist, options: { root, fingerprint, profile: PROFILE, now: NOW } };
}

test('complete documented supported runs and scoped privacy acceptance pass together', async (t) => {
  const f = await fixture(t);
  const result = await verifyReleaseEvidence({ root: f.root, now: NOW });
  assert.equal(result.passed, true, JSON.stringify(result));
  assert.equal(result.screenreader.completedRuns, 2);
});

test('legacy pending evidence is read safely but cannot release production', async (t) => {
  const f = await fixture(t);
  const old = { status: 'prepared-not-executed', runs: [{ assistiveTechnology: 'VoiceOver', result: 'pending' }, { assistiveTechnology: 'NVDA', result: 'pending' }], manualApproval: null, issues: [] };
  const result = await validateScreenreaderEvidence(old, f.options);
  assert.equal(result.passed, false);
  assert.match(result.errors.join('\n'), /pending|Release-Blocker/);
});

test('pending template always contains the complete current scope and does not attest a pass', async (t) => {
  const f = await fixture(t);
  const pending = createPendingScreenreaderTemplate(f.fingerprint);
  assert.equal(pending.status, 'prepared-not-executed');
  assert.equal(pending.runs[0].routeChecks.length, 16);
  assert.equal(pending.runs[0].toolChecks.length, 9);
  assert.equal(pending.runs[0].handoutChecks.length, 7);
  assert.equal((await validateScreenreaderEvidence(pending, f.options)).passed, false);
});

test('missing and malformed files fail with structured errors', async (t) => {
  const f = await fixture(t);
  await fs.rm(path.join(f.root, 'website-screenreader-test.json'));
  assert.equal((await verifyReleaseEvidence({ root: f.root, now: NOW })).passed, false);
  await f.write('website-screenreader-test.json', '{invalid');
  const result = await verifyReleaseEvidence({ root: f.root, now: NOW });
  assert.match(result.errors.join('\n'), /Screenreader-Nachweis nicht lesbar/);
});

test('unsupported platforms/browsers and ambiguous system alternatives fail', async (t) => {
  const f = await fixture(t);
  for (const mutation of [
    { browser: 'Chrome', platform: 'macOS' },
    { browser: 'Safari', platform: 'Linux' },
    { browser: 'Safari', platform: 'macOS oder iOS' },
  ]) {
    const evidence = structuredClone(f.evidence);
    Object.assign(evidence.runs[0], mutation);
    assert.equal((await validateScreenreaderEvidence(evidence, f.options)).passed, false);
  }
});

test('a second VoiceOver run cannot replace NVDA', async (t) => {
  const f = await fixture(t);
  Object.assign(f.evidence.runs[1], { assistiveTechnology: 'VoiceOver', browser: 'Safari', platform: 'iOS' });
  const result = await validateScreenreaderEvidence(f.evidence, f.options);
  assert.equal(result.passed, false);
  assert.match(result.errors.join('\n'), /Realer NVDA-Lauf fehlt/);
});

test('concrete iOS/VoiceOver and Chrome/Windows/NVDA alternatives are accepted', async (t) => {
  const f = await fixture(t);
  f.evidence.runs[0].platform = 'iOS';
  f.evidence.runs[1].browser = 'Chrome';
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, true);
});

test('automated execution or AI reviewer identity never satisfies human AT', async (t) => {
  const f = await fixture(t);
  for (const mutation of [{ performedBy: 'automated' }, { testerRole: 'KI Agent' }, { testerInitials: 'someone@example.org' }]) {
    const evidence = structuredClone(f.evidence);
    Object.assign(evidence.runs[0], mutation);
    assert.equal((await validateScreenreaderEvidence(evidence, f.options)).passed, false);
  }
});

test('invalid/future dates and missing concrete versions fail', async (t) => {
  const f = await fixture(t);
  for (const mutation of [{ testedAt: '2026-02-30' }, { testedAt: '2026-10-07' }, { testedAt: 'YYYY-MM-DD' }, { browserVersion: '' }]) {
    const evidence = structuredClone(f.evidence);
    Object.assign(evidence.runs[0], mutation);
    assert.equal((await validateScreenreaderEvidence(evidence, f.options)).passed, false);
  }
});

test('all 16 routes are required, including legal confidentiality and accessibility', async (t) => {
  const f = await fixture(t);
  for (const route of ['/schweigepflicht', '/barrierefreiheit', '/module/7']) {
    const evidence = structuredClone(f.evidence);
    evidence.runs[0].routeChecks = evidence.runs[0].routeChecks.filter((check) => check.route !== route);
    const result = await validateScreenreaderEvidence(evidence, f.options);
    assert.equal(result.passed, false);
    assert.ok(result.errors.some((error) => error.includes(`Nachweis für ${route} fehlt`)));
  }
});

test('duplicates cannot fill missing route or tool coverage', async (t) => {
  const f = await fixture(t);
  f.evidence.runs[0].routeChecks[15] = structuredClone(f.evidence.runs[0].routeChecks[0]);
  f.evidence.runs[1].toolChecks.pop();
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, false);
});

test('individual handouts and failure states need observed evidence', async (t) => {
  const f = await fixture(t);
  for (const mutation of [
    (run) => { run.handoutChecks.pop(); },
    (run) => { run.scenarioChecks = run.scenarioChecks.filter((check) => check.scenario !== 'legacy-deletion-failure'); },
    (run) => { run.scenarioChecks[0].observation = 'passed'; },
    (run) => { run.scenarioChecks[0].evidence = []; },
    (run) => { run.scenarioChecks[0].result = 'not-applicable'; },
  ]) {
    const evidence = structuredClone(f.evidence);
    mutation(evidence.runs[0]);
    assert.equal((await validateScreenreaderEvidence(evidence, f.options)).passed, false);
  }
});

test('missing or tampered human artifacts cannot substantiate runs', async (t) => {
  const f = await fixture(t);
  await f.write(f.evidence.runs[0].evidence[0].path, 'Changed report, without updating the recorded content digest.');
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, false);
  await fs.rm(path.join(f.root, f.evidence.runs[1].evidence[0].path));
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, false);
});

test('path traversal, external links and symlink reports are rejected', async (t) => {
  const f = await fixture(t);
  for (const unsafe of ['../outside.md', 'https://example.org/report.md', '/tmp/report.md']) {
    const evidence = structuredClone(f.evidence);
    evidence.runs[0].evidence[0].path = unsafe;
    assert.equal((await validateScreenreaderEvidence(evidence, f.options)).passed, false);
  }
  const report = f.evidence.runs[0].evidence[0].path;
  await fs.rm(path.join(f.root, report));
  await fs.symlink(path.join(f.root, '_dev/privacy-test-fixture.md'), path.join(f.root, report));
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, false);
});

test('unresolved issues, incomplete retests and missing final human approval fail', async (t) => {
  const f = await fixture(t);
  f.evidence.issues = [{ id: 'SR-01', status: 'open', resolution: 'Pending observation', retestedRuns: [] }];
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, false);
  f.evidence.issues = [{ id: 'SR-01', status: 'fixed-retested', resolution: 'Synthetic complete retest documented.', retestedRuns: f.evidence.runs.map((run) => run.id) }];
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, true);
  f.evidence.manualApproval.reviewedAt = '2026-10-04';
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, false);
});

test('content hashes survive approval edits but change with production source, public assets and build chunks', async (t) => {
  const f = await fixture(t);
  await f.write('public/website-data-policy.json', '{"approvalChanged":true}');
  await f.write('dist/website-data-policy.json', '{"approvalChanged":true}');
  await f.write('website-screenreader-test.json', '{"approvalChanged":true}');
  assert.deepEqual(await computeReleaseFingerprint({ root: f.root }), f.fingerprint);
  await f.write('src/test/privacy.test.js', '/* Test-only edits do not change shipped content. */');
  assert.deepEqual(await computeReleaseFingerprint({ root: f.root }), f.fingerprint);
  await f.write('src/main.jsx', 'export const message = "changed user-visible content";');
  const sourceChanged = await computeReleaseFingerprint({ root: f.root });
  assert.notEqual(sourceChanged.sourceSha256, f.fingerprint.sourceSha256);
  assert.equal(sourceChanged.buildSha256, f.fingerprint.buildSha256);
  await f.write('public/logo.svg', '<svg>Changed public asset</svg>');
  assert.notEqual((await computeReleaseFingerprint({ root: f.root })).sourceSha256, sourceChanged.sourceSha256);
  await f.write('dist/assets/new-lazy-page.js', 'export const page="new";');
  assert.notEqual((await computeReleaseFingerprint({ root: f.root })).buildSha256, f.fingerprint.buildSha256);
});

test('a changed build or source invalidates both previous approvals', async (t) => {
  const f = await fixture(t);
  await f.write('dist/assets/app.css', 'body {color:#333}');
  const result = await verifyReleaseEvidence({ root: f.root, now: NOW });
  assert.equal(result.passed, false);
  assert.equal(result.screenreader.passed, false);
  assert.equal(result.privacy.passed, false);
});

test('dependency, build configuration and deployment configuration changes invalidate the content stand', async (t) => {
  const f = await fixture(t);
  for (const filename of ['package-lock.json', 'vite.config.js', 'netlify.toml']) {
    await f.write(filename, `Changed input: ${filename}`);
    assert.notEqual((await computeReleaseFingerprint({ root: f.root })).sha256, f.fingerprint.sha256);
  }
});

test('incomplete builds, missing entry assets and symlinked content fail instead of yielding a fingerprint', async (t) => {
  const f = await fixture(t);
  await fs.rm(path.join(f.root, 'dist/assets/app.css'));
  await assert.rejects(computeReleaseFingerprint({ root: f.root }), /unvollständig/);
  await f.write('dist/assets/app.css', 'body{}');
  await f.write('dist/index.html', '<script type="module" src="/assets/absent.js"></script>');
  await assert.rejects(computeReleaseFingerprint({ root: f.root }), /fehlt/);
  await f.write('dist/index.html', '<script type="module" src="https://example.org/app.js"></script>');
  await assert.rejects(computeReleaseFingerprint({ root: f.root }), /externe/);
  await fs.rm(path.join(f.root, 'src/main.jsx'));
  await fs.symlink(path.join(f.root, 'dist/assets/app.js'), path.join(f.root, 'src/main.jsx'));
  await assert.rejects(computeReleaseFingerprint({ root: f.root }), /Symlink/);
});

test('technical privacy acceptance cannot imply institutional approval or enable persistent storage', async (t) => {
  const f = await fixture(t);
  for (const mutation of [
    (policy) => { policy.profileCompatibility.institutionalApproval = 'approved'; },
    (policy) => { policy.profileCompatibility.productionApproval = 'approved'; },
    (policy) => { policy.storageBehavior.currentPersistence = 'enabled'; },
    (policy) => { policy.browserStorage[0].persistenceEnabled = true; },
    (policy) => { policy.technicalAcceptance.authority = 'institutional-approval'; },
    (policy) => { policy.technicalAcceptance.releaseFingerprint.sha256 = '0'.repeat(64); },
  ]) {
    const policy = structuredClone(f.policy);
    mutation(policy);
    assert.equal((await validatePrivacyAcceptance(policy, f.options)).passed, false);
  }
});

test('malformed nested records and whitespace-only reports fail safely', async (t) => {
  const f = await fixture(t);
  const evidence = structuredClone(f.evidence);
  evidence.runs = [null, {}];
  assert.equal((await validateScreenreaderEvidence(evidence, f.options)).passed, false);
  const policy = structuredClone(f.policy);
  policy.browserStorage = [null];
  assert.equal((await validatePrivacyAcceptance(policy, f.options)).passed, false);
  const whitespace = ' '.repeat(100);
  await f.write(f.evidence.runs[0].evidence[0].path, whitespace);
  f.evidence.runs[0].evidence[0].sha256 = hash(whitespace);
  assert.equal((await validateScreenreaderEvidence(f.evidence, f.options)).passed, false);
});

test('CLI returns nonzero for pending evidence and zero only for complete supported evidence', async (t) => {
  const f = await fixture(t);
  const pending = createPendingScreenreaderTemplate(f.fingerprint);
  await f.write('website-screenreader-test.json', JSON.stringify(pending));
  const blocked = spawnSync(process.execPath, [SCRIPT, '--root', f.root], { encoding: 'utf8' });
  assert.equal(blocked.status, 1, blocked.stderr);
  assert.equal(JSON.parse(blocked.stdout).passed, false);
  await f.persist();
  const accepted = spawnSync(process.execPath, [SCRIPT, '--root', f.root], { encoding: 'utf8' });
  assert.equal(accepted.status, 0, accepted.stderr);
  assert.equal(JSON.parse(accepted.stdout).passed, true);
  const fingerprint = spawnSync(process.execPath, [SCRIPT, '--root', f.root, '--fingerprint'], { encoding: 'utf8' });
  assert.equal(fingerprint.status, 0);
  assert.deepEqual(JSON.parse(fingerprint.stdout), f.fingerprint);
});
