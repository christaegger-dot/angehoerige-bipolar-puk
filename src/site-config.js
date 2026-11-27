// Seitenvertrag nach dem PUK Website-Profil 2026.10.2 (Fachstelle Angehörigenarbeit).
// Absenderin, Zuständigkeitsverweis und Hinweis stehen genau hier und werden von Kopf,
// Fusszeile und Seiten übernommen. Die Wortlaute stammen unverändert aus dem Profil
// (Abschnitte «Absenderin» und «Zuständigkeit statt Krisenzugang»); sie werden nicht
// in einzelnen Seiten neu formuliert.

const SITE = {
  profile: '2026.10.2',
  sender: {
    orgUnit: 'Fachstelle Angehörigenarbeit',
    institution: 'Psychiatrische Universitätsklinik Zürich',
    email: 'angehoerigenarbeit@pukzh.ch',
  },
  disclaimer: 'Diese Website ersetzt keine individuelle Abklärung, Beratung oder Behandlung.',
  responsibility: {
    label: 'Zuständigkeit',
    text: 'Die Fachstelle Angehörigenarbeit der PUK berät Angehörige kostenlos und vertraulich: angehoerigenarbeit@pukzh.ch. Sorgen Sie sich akut um das Leben oder die Sicherheit eines Menschen, holen Sie sofort Hilfe: ärztlicher Notfalldienst oder Notfallstation, bei Gefahr die Polizei.',
    // Prüfvermerk des Profils; er erscheint nicht auf der Website.
    reviewStatus: 'geprueft',
    reviewedBy: 'Fachstelle Angehörigenarbeit PUK',
    reviewedAt: '09.10.2026',
    inline: {
      text: 'Sorgen Sie sich akut um das Leben oder die Sicherheit eines Menschen, holen Sie sofort Hilfe: ärztlicher Notfalldienst oder Notfallstation, bei Gefahr die Polizei.',
      reviewStatus: 'geprueft',
      reviewedBy: 'Fachstelle Angehörigenarbeit PUK',
      reviewedAt: '09.10.2026',
    },
  },
  // Redaktionsstatus im Format des Profils («Fachlich freigegeben am TT.MM.JJJJ»). Das Datum trägt
  // nur die Fachstelle ein, wenn sie die Inhalte fachlich freigegeben hat. Bis dahin zeigt die
  // Fusszeile den Entwurf, und die Release-Prüfung (scripts/verify-release-evidence.mjs) blockiert.
  editorial: {
    approvedOn: null,
  },
};

const SENDER_MAILTO = `mailto:${SITE.sender.email}`;

const EDITORIAL_DRAFT_LABEL = 'Entwurf, fachliche Freigabe ausstehend';

function editorialStatusLabel(site = SITE) {
  const approvedOn = site.editorial?.approvedOn;
  return approvedOn ? `Fachlich freigegeben am ${approvedOn}` : EDITORIAL_DRAFT_LABEL;
}

export { SITE, SENDER_MAILTO, EDITORIAL_DRAFT_LABEL, editorialStatusLabel };
