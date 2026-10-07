# Umsetzung des eingereichten Evidenzaudits · 7. Oktober 2026

Ausgangspunkt: Angehörigenratgeber, `main` nach PR #63, Commit `9c321ac1ccaf563ef7170f615254f6081ca55cd1`. Auftrag: Befunde aus dem eingereichten Evidenzaudit in Inhalte und Quellenführung integrieren. Umsetzung auf `fix/evidence-audit-2026-10-07`.

## Umfang und Entscheidungen

Das eingereichte Audit ist ein Prüfauftrag, kein Beleg für seine eigenen Quellenbehauptungen. Gesprächsinterne Zitiermarker aus dem Bericht wurden nicht als öffentlich prüfbare Nachweise übernommen. Neue Aussagen wurden gegen tatsächlich zugängliche amtliche Originaltexte abgeglichen. Das ist eine gezielte Nachprüfung, keine vollständige systematische Übersichtsarbeit oder klinische, juristische bzw. institutionelle Freigabe.

Die bisherige Recherchebasis **5. Oktober 2026** bleibt erhalten. Neue Prüfungen sind bei den jeweiligen Quellen als Einzelprüfung vom **7. Oktober 2026** ausgewiesen; Rechtsdokumente mit bereits dokumentierter Prüfung vom 6. Oktober behalten dieses Datum. Ausgabe, Bereitstellung und Abruf werden unterschieden.

Die frühere ausdrückliche Projektentscheidung, keine externe juristische Freigabe der Schweigepflichtseite einzuholen, bleibt bestehen. Der entsprechende Auditvorschlag wird **nicht als neue Releasevoraussetzung** eingeführt. Eine solche Freigabe wird auch nicht behauptet; der Quellenabgleich und dessen Grenzen bleiben sichtbar.

Der W2-Geltungsbereich bleibt erhalten: Psychoedukationsseiten und Werkzeuge bekommen keine neuen Notfallnummern oder Akutblöcke. Neue PUK-Notfallkontakte stehen auf der Notfallseite und in den dafür vorgesehenen Materialien DL-02, DL-04 und DL-05.

## Zuordnung der Befunde

| Auditbefund | Umsetzung / Nachweisgrenze | Betroffene Dateien |
|---|---|---|
| P0: veraltete DSM-5-Zuschreibung und offene diagnostische Primärquelle | DSM-5-Zuschreibung entfernt. Der Überblick erklärt ausdrücklich seine begrenzte Reichweite; WHO-Informationsblatt vom 11.9.2026, vorhandene klinische Übersicht und NICE-Diagnoseprozess tragen die sichtbaren Aussagen. SAMHSA 2016 ist aus der aktiven Modul-1-Basis entfernt. **CDDR-Volltextprüfung bleibt offen**, keine vollständigen ICD-11-/DSM-5-TR-Kriterien als geprüft ausgegeben. | `src/modul1.jsx`, `src/evidence-data.js` |
| P0: Rechtsteil und juristische Freigabe | Mitteilen eigener Beobachtungen und Rückmeldung geschützter Informationen deutlicher getrennt; Einwilligung und andere gesetzliche Grundlagen im Einstieg berücksichtigt. Das tatsächliche PUK-Formular Version 2026 und die gelesene kantonale Broschüre Ausgabe 2018 sind mit individuellem Prüfumfang registriert. Keine neue externe Freigabevoraussetzung; heutige vollständige Rechtsprüfung bleibt unbestätigt. | `src/schweigepflicht.jsx`, `src/evidence-data.js` |
| P0/P1: Swissmedic-Stand | Aktuelle Informationsmaterialien direkt verknüpft. **20.5.2026 ist das Bereitstellungsdatum**; die Männerbroschüre trägt intern 09/2025. Schwangerschaft, Kinderwunsch, Verhütung, väterliche Vorsichtsmassnahmen und fachliche Überprüfung sind anhand gelesener Dokumente präzisiert. Keine neue Studie oder endgültige Risikoquantifizierung behauptet. | `src/modul1.jsx`, `src/evidence-data.js` |
| P1: körperliche und labormedizinische Kontrollen | Verständlicher Kasten zu Lithiumspiegel, Nieren-/Schilddrüsenfunktion und Calcium sowie Gewicht/Stoffwechsel unter Antipsychotika. Zuständigkeit und Intervalle bleiben beim Behandlungsteam; keine Überwachungsaufgabe für Angehörige. | `src/modul1.jsx` |
| P1: WHO-Angehörigenempfehlung 2023 | Amtlichen Empfehlungstext gelesen und als Schlüsselquelle aufgenommen: Psychoedukation, Problemlöseansätze, Selbsthilfe und gegenseitige Unterstützung erwägen. Bedingte Empfehlung, moderate Evidenzsicherheit; keine Wirksamkeitsgarantie für einzelne Angebote oder die Website. | `src/modul2.jsx`, `src/modul4.jsx`, `src/modul7.jsx`, `src/unterstuetzung.jsx`, Quellenregister |
| P1: Fahren, Ausbeutung und sexuelle Sicherheit | Gemeinsame Vorausplanung zu Fahren/gefährlichen Maschinen, ungewöhnlichen Ausgaben/riskanten Verträgen/finanzieller Ausbeutung und sexueller Selbstbestimmung ergänzt. Drei freiwillige Felder in der tatsächlichen Krisenplan-Vorlage; unabhängige Ansprechperson möglich, keine intimen Einzelheiten verlangt. Kein Kontroll- oder Entscheidungsrecht aus dem Plan abgeleitet. | `src/modul6.jsx`, `src/werkzeuge-tools.jsx` |
| P1: CHF 500 | Beispielbetrag entfernt; freiwillige, individuell passende Absprache zu Betrag oder Ausgabenarten. Ausdrücklich kein medizinischer Grenzwert. | `src/modul6.jsx` |
| P1: pauschale Psychoseformulierung | «Argumente und Beweise dringen kaum durch» ersetzt: ruhig bei eigener Wahrnehmung bleiben, Überzeugung weder bestätigen noch im Streit widerlegen; Gefühle, Sicherheit und hilfreiche nächste Schritte beachten. | `src/unterstuetzung.jsx`, DL-05 |
| P1: PUK-Kontakte nach Alter | Offizielle PUK-Seite bestätigt: Kinder/Jugendliche `058 384 66 66`, Erwachsene ab 18 `058 384 20 00`, Erwachsene ab 65 `058 384 46 82`. Alterszuordnung und funktionale Telefonlinks ergänzt; kompakte Portemonnaiekarte erweitert. Keine telefonische Erreichbarkeitsprüfung durchgeführt. | `src/notfall.jsx`, `src/unterstuetzung.jsx` |
| P1: professionelle Nachsorge | Konkrete Fragen zu Warnzeichen, hilfreichen Reaktionen, Behandlung/Terminen, erreichbaren Kontakten, Belastung von Kindern/Angehörigen und Planüberprüfung. Bei fortbestehenden Sicherheitsbedenken zeitnahe professionelle Unterstützung; britische 48-Stunden-Regel nicht als Schweizer Zusage übernommen. | `src/modul7.jsx`, `src/werkzeuge-tools.jsx` |
| P1: körperliche Differentialdiagnosen | Neue starke Verwirrung, ungewöhnliche Schläfrigkeit, körperliche Verschlechterung und andersartige Beschwerden nicht automatisch als bipolare Episode einordnen; rasche medizinische Abklärung. | `src/modul1.jsx` |
| P2: Quellen direkt am Absatz | Gemeinsame Komponente `EvidenceCitation`: direkte, lesbare Links bei relevanten Diagnose-, Arzneimittel-, Suizid-, Angehörigen-, Krisenplan-, Nachsorge- und Dokumentationsaussagen. Detaillierter Prüfumfang weiterhin in Quellenlisten. Mehrteilige Originalnachweise mit Links zu tatsächlich gelesenen Abschnitten/PDFs. | `src/module-guidance.jsx`, betroffene Module, Notfallseite, Handouts und Schweigepflichtseite |
| P2: Quellenarten | Alle 50 Quellen nach Zweck/Design typisiert, Kurzbezeichnungen ergänzt. Leitlinien, Leitlinienzusammenfassungen, Reviews, Einzelstudien, qualitative Forschung, Arzneimittelsicherheit, Rechts-/Versorgungsinformation und historische Vergleichsdarstellungen werden unterschieden. Keine universelle Rangfolge behauptet. | `src/evidence-data.js`, `src/module-guidance.jsx` |
| Weitere aktuelle Leitlinien: DGPPN 2025, DGBS, APA | Primärseiten waren nicht abrufbar. Diese Kandidaten werden nicht als gelesene Quellen in den aktiven Nachweis aufgenommen. CANMAT/ISBD bleibt ausdrücklich eine Leitlinienzusammenfassung; keine neue APA-Bipolarleitlinie behauptet. | Quellenprüfung unten |

## Tatsächlich geprüfte Primärquellen

- [WHO: Angehörigeninterventionen (2023)](https://www.who.int/teams/mental-health-and-substance-use/treatment-care/mental-health-gap-action-programme/evidence-centre/psychosis-and-bipolar-disorders/psychosocial-interventions-for-carers-of-persons-with-psychosis-or-bipolar-disorder): amtlicher Empfehlungstext gelesen; das verlinkte Evidenzprofil-PDF nicht erhalten.
- [WHO: Bipolar disorder, 11. September 2026](https://www.who.int/news-room/fact-sheets/detail/bipolar-disorder): amtlicher Webtext gelesen; vereinfachte Gesundheitsinformation, kein vollständiges Diagnostikmanual.
- [WHO mhGAP: Manie (2023)](https://www.who.int/teams/mental-health-and-substance-use/treatment-care/mental-health-gap-action-programme/evidence-centre/psychosis-and-bipolar-disorders/antipsychotics-and-mood-stabilizers-in-individuals-with-bipolar-mania): tatsächliche aktualisierte/bestätigte Webempfehlungen gelesen, einschliesslich klinischer und labormedizinischer Voraussetzungen für Lithium. Webempfehlung zur Erhaltungstherapie zusätzlich gelesen; kein vollständiger mhGAP-Leitlinienband geprüft.
- [NICE CG185](https://www.nice.org.uk/guidance/cg185/chapter/recommendations): insbesondere 1.3.2–1.3.5, 1.4.1, 1.7.1, 1.10.5/1.10.8 und 1.10.14–1.10.24. Die konkrete Risikoliste steht in **1.3.5**.
- [NICE NG225](https://www.nice.org.uk/guidance/ng225/chapter/recommendations): insbesondere 1.10.1–1.10.2 und 1.11.7 zu Nachsorge und gemeinsamer Sicherheitsplanung. Schweizer Versorgungswege werden dadurch nicht garantiert.
- [Swissmedic: Valproat](https://www.swissmedic.ch/swissmedic/de/home/humanarzneimittel/marktueberwachung/health-professional-communication--hpc-/dhpc-valproat-2.html): aktuelle Webseite, vollständige Männerbroschüre, relevante Abschnitte der Frauenbroschüre und des Fachleitfadens gelesen. Registerstatus `sections` für das Gesamtpaket.
- [PUK: Notfallkontakte](https://www.pukzh.ch/ueber-uns/kontakt/notfall/): veröffentlichte Nummern und Altersgruppen gelesen; zusätzlich verlinkte Alterspsychiatrie-/Erwachsenen-/Kinderangebote geprüft.
- PUK-Formular Version 2026 und kantonale Patientenrechtsbroschüre Ausgabe November 2018: bereits tatsächlich gelesene Originale, Prüfumfang und SHA256 im [Quellen-/Formularabgleich vom 6. Oktober](SCHWEIGEPFLICHT-QUELLENABGLEICH-2026-10-06.md). Ein aktueller Formularstand bestätigt keine institutionelle oder juristische Freigabe.

Abrufprotokoll mit URLs, Ergebnissen und verfügbaren Originalprüfsummen: [Quellen-Abrufe.json](evidenzaudit-2026-10-07/Quellen-Abrufe.json). Originale und Extraktionen wurden als lokale Prüfartefakte ausserhalb des auszuliefernden Repos gehalten; zusätzliche Behörden-PDFs werden nicht mit der Website ausgeliefert.

## Offene Nachweisgrenzen

Die [WHO-CDDR-Publikationsseite](https://www.who.int/publications/i/item/9789240077263) war zugänglich, ihr PDF auf `iris.who.int` jedoch durch die Netzwerkpolicy gesperrt (Proxy-Tunnel 403). Die Bedienoberfläche des ICD-Browsers war lesbar; die tatsächlichen Kriterieninhalte über `id.who.int` waren ebenfalls gesperrt. Ein zugänglicher offizieller NCBI-Books-Spiegel wurde nicht gefunden. **Diese Einschränkung wird nicht als abgeschlossene Kriterienprüfung ausgegeben.**

Dasselbe gilt für den vollständigen mhGAP-Band auf `iris.who.int` und das WHO-Angehörigen-Evidenzprofil auf `cdn.who.int`. Die separat zugänglichen amtlichen Webempfehlungen sind davon getrennt geprüft.

Die regulären Abrufe von `www.dgppn.de`, `dgbs.de` und `www.psychiatry.org` scheiterten mit Proxy-Tunnel 403. Die im eingereichten Audit genannten Fassungen und der heutige APA-Leitlinienbestand sind damit in dieser Nachprüfung nicht primär bestätigt. Keine Suche über einen anderen Host als Umgehung der gesperrten Originalserver durchgeführt.

BAG, ältere Zürcher Rechtsquellen, Vorsorgeauftrag und SECO bleiben im Register auf `open`. Das PUK-Formular und die ältere Broschüre ersetzen keine vollständige Prüfung der heute geltenden Rechtslage oder eines Einzelfalls. Die abgesagte externe juristische Freigabe wird nicht als ausstehender Arbeitsauftrag wieder eingeführt.

## Datenfluss und Release-Nachweise

Die drei zusätzlichen Krisenplan-Felder sind freiwillig, bleiben ausschliesslich im bestehenden flüchtigen React-Zustand und werden weder gespeichert noch versendet. Löschen, Schliessen, Neuladen und nutzerveranlasster Druck behalten ihre bisherige Logik. Der aktuelle Datenkatalog wird um die neuen Felder ergänzt; das historische Browser-Speicherinventar bleibt historisch und enthält diese neuen Felder nicht.

Die technische Datenschutzentscheidung wird nach Funktionsprüfung an den aktuellen App-/Build-Inhalt gebunden. Reale VoiceOver-/NVDA-Läufe bleiben **pending**; keine menschliche Prüfung, Freigabe oder Produktionsbereitschaft wird erfunden.

## Technische Verifikation

Prüfstand: 7. Oktober 2026. Lint und Produktionsbuild sind erfolgreich. Die vollständige Vitest-Prüfung besteht mit **183 Tests in 27 Dateien**; Zeilenabdeckung 93,59 %, Branch-Abdeckung 86,86 %. Die Release-Nachweislogik besteht mit **22 Tests**. Nach den letzten Änderungen an Quellenart und Notfalllink bestehen zusätzlich die fünf gezielten Notfall-/Quellendatumstests.

Der abschliessende Website-Audit besteht mit **697 Prüfungen, ohne Fehler**, bei 320, 360, 768 und 1440 px sowie 100/200 % Textvergrösserung. Der Werkzeug-Audit besteht mit **225 Prüfungen, ohne Fehler**, für alle neun Werkzeuge. Die Druckprüfung besteht mit **72 Prüfungen, ohne Fehler**, anhand von 13 tatsächlichen Chromium-PDF-Exporten: DL-02 bleibt eine A4-Seite, die Faltkarte hält ihre vorgesehenen Masse und der lange Krisenplan enthält auch die drei neuen Felder. Eine physische Druckprüfung wurde nicht durchgeführt.

Beim ersten Website-Lauf fiel der neue Link zu den altersbezogenen Notfallkontakten durch unzureichenden Kontrast auf. Eine erste Variablenänderung erfasste seine tatsächliche CSS-Regel nicht. Der Link besitzt nun eine gezielte Regel mit dem vorhandenen dunkleren Blau aus dem Designsystem. Die direkte Browserprüfung bei 320/1440 px bestätigt ausreichenden Kontrast, Tastaturbedienung und Fokus am richtigen Sprungziel; der anschliessende vollständige Website-Lauf ist fehlerfrei. Die früheren fehlgeschlagenen Berichte bleiben in den lokalen Prüfartefakten erhalten.

Werkzeug- und Druckaudits prüfen den bereits aktualisierten Krisenplan und die neuen Handouts. Sie liefen vor der abschliessenden, ausschliesslich die Notfallseite betreffenden Farbkorrektur. Der finale Website-Audit prüft den letzten Build. Automatische Accessibility-Prüfungen ersetzen keine menschlichen Screenreader-Läufe.

Die technische Datenschutzprüfung besteht für den aktuellen Inhalt. Der tatsächliche Release-Nachweisprüfer meldet weiterhin **nicht bestanden**, weil beide menschlichen VoiceOver-/NVDA-Prüfungen ausstehen. Das ist der vorhandene Nachweisstatus; es wurde weder ein bestandener AT-Test noch eine allgemeine Produktionsfreigabe eingetragen.

Aktueller App-/Build-Fingerprint: `054703088c2c0a00b846287623a846aac59d782d05c193a9833493c587145d34`. Datenschutzentscheidung und vorbereitete Screenreader-Matrix sind daran gebunden. Prüfzahlen, Prüfumfang, Einschränkungen und Artefaktprüfsummen: [Technische-Pruefung.json](evidenzaudit-2026-10-07/Technische-Pruefung.json). Die vollständigen Browserberichte und PDF-Exporte liegen lokal ausserhalb des auszuliefernden Repos unter `/workspace/cloud-setup/evidence-audit-2026-10-07/`.
