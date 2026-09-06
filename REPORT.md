# Pin Atelier – Umsetzung vom 6. September 2026

## Umgesetzt

- Produktbezogener Einstieg mit vorhandenem PH-5-Pin, echtem ursprünglichem Amazon-Affiliate-Link und passender Vergleichsseite; kein Manifesto-Abschnitt.
- Sechs verlinkte Themenbereiche mit jeweils zwei begründeten Einstiegsideen. Alle 101 Pins bleiben als vollständige Karten im initialen HTML erhalten. Mehrere Pins können zum gleichen Produkt gehören.
- Manuelle Themenzuordnung statt fehleranfälliger Teilwort-Erkennung (z. B. Garten-Lichterkette nicht automatisch Designlicht, Nagellampe nicht Wohnraumbeleuchtung).
- Bestehende URLs und alle 101 ursprünglichen Amazon-Ziele einschließlich sämtlicher Partnerparameter unverändert. Die Bourgie-Suche wird ausdrücklich als Suche beschriftet.
- Such-/Board-/Kategorie-Filter arbeiten auf vorhandenem HTML, ohne zusätzlichen Datenabruf. Ein Netzfehler kann den Katalog nicht mehr löschen. Rücksetzen, Leerzustand und motivgenaue Anker sind vorhanden.
- Alle Pin-Motive unbeschnitten, bekannte illustrative Bilder sichtbar gekennzeichnet, ursprünglicher Pinterest-Pin pro Karte verlinkt. Keine unbelegten technischen Aussagen aus dem Import in zusätzliche Produktbeschreibungen übernommen.
- Zwei quellenbasierte Ratgeber: Sideboard-Tischleuchten und Esstisch-Pendelleuchten. Bewusste Auswahl, weil dafür konkrete Markenmodelle vorliegen. Deko bleibt vorerst eine kurze kuratierte Kategorie statt eines dünnen zusätzlichen Ratgebers.
- Redaktioneller Auswahlprozess und Betreiber auf eigener Über-uns-Seite; weiterhin klarer Affiliate-Hinweis oben. Keine erfundenen Tests, Preise, Rabatte, Verknappungen oder Bewertungen.
- Individuelle Metadaten, Social-Vorschauen, Canonicals, Breadcrumbs und zum sichtbaren Inhalt passende strukturierte Daten. Keine Product-Angebotsdaten oder fiktiven Ratings.
- 11 indexierbare Seiten in der Sitemap. Rechtliche Seiten behalten noindex, dürfen aber gecrawlt werden, damit dieses Signal gelesen werden kann. llms.txt nur ergänzend.
- Eigene 404-Seite gegen den allgemeinen Startseiten-Fallback bei unbekannten URLs. Sicherheitsheader bleiben erhalten. Hilfs-/Quellmaterial bekommt noindex-Header.
- Lokale Systemschriften statt externer Google-Font-Aufrufe. 101 Originalbilder und je zwei kleinere Bildvarianten erreichbar und vermessen. Responsive Bildauswahl, feste intrinsische Maße, verzögertes Laden unterhalb des Einstiegs, priorisiertes Hero-Bild.
- Pinterest-Einwilligung korrekt gespeichert, Ablehnung beachtet und Widerruf jederzeit möglich. Vor Zustimmung kein Marketing-Tag. Suchtext und freie URL-Parameter werden nicht in eigene Ereignisse übernommen.

## Tests

Automatisierte lokale Chrome-Prüfung bestanden:

- 101 Original-Affiliate-URLs zeichengetreu erhalten; sponsored/noopener/noreferrer im erzeugten HTML.
- 101 Karten auch ohne JavaScript zugänglich; keine Tracker ohne JavaScript.
- Suche „Flos“: 2 Treffer; Leerzustand, Zurücksetzen, Luxus-Board: 11 Treffer; Balkon/Garten: 3 Treffer.
- Suchparameter werden lokal ausgewertet; Pin-Anker machen das konkrete Motiv auch bei widersprechenden Filtern sichtbar.
- Einwilligung unbekannt/abgelehnt/erteilt/widerrufen; keine doppelten PageVisit- oder Click-Ereignisse im Browser-Test. Pinterest-Bibliothek dabei absichtlich ersetzt, damit keine künstlichen Marketingdaten entstehen.
- 14 Inhalts-/Rechtsseiten bei 1440, 390 und 320 Pixel Breite: keine horizontale Überbreite, genau eine H1, Canonicals und lesbare JSON-LD-Daten. Interne Seitenpfade geprüft. Keine JavaScript-Ausnahmen.
- Desktop- und Mobil-Screenshots visuell geprüft.
- Die 474-Pixel-Varianten benötigen zusammen ca. 5,18 MB statt 15,06 MB für alle Originalbilder (rund 66 % weniger bei Wahl dieser Variante). Tatsächliche Übertragung hängt von Bildschirm, Pixeldichte und Scrolltiefe ab; keine behauptete Lighthouse- oder Core-Web-Vitals-Verbesserung ohne Felddaten.

## Technischer Live-Bestand vor Veröffentlichung

- Hauptdomain HTTPS: HTTP 200. HTTP leitet mit 301 auf HTTPS weiter.
- www.pinatelier.org und pinatelier.pages.dev liefern ebenfalls HTTP 200. Canonicals verweisen auf die Hauptdomain. Dauerhafte hostbasierte Weiterleitungen sind noch offen: Die verfügbaren Cloudflare-Connector-Aktionen bieten hierfür keine passende geprüfte Aktion. Keine DNS-/Sicherheitsregeln auf Verdacht geändert.
- Cloudflare-Zone aktiv; Bot-Fight-Mode aus; gelistete Legacy-Firewall-Regeln leer. Das ist keine vollständige Prüfung aller möglichen WAF-Regeln. Keine pauschale Änderung von KI-Training, Bot-Schutz oder Sicherheitsrichtlinien.

## Pinterest-Ziele und Produktprüfung

`pinterest-landing-map.csv` enthält für jeden Bestands-Pin eine Kategorie-URL mit direktem Produktanker und konsistenten UTM-Werten. Bestehende Pinterest-Pins wurden nicht geändert. Direkte, passende Amazon-Ziele brauchen keinen zusätzlichen Website-Zwischenschritt. Für neue Vergleichs-/Inspirations-Pins:

- `/ratgeber/designleuchten-sideboard/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=wohnideen`
- `/ratgeber/pendelleuchten-esstisch/?utm_source=pinterest&utm_medium=organic_social&utm_campaign=wohnideen`

Die Zuordnung basiert auf dem vorhandenen Import, nicht auf einem neuen vollständigen Live-Abgleich beider Boards. Die Herstellerinformationen der vier Ratgebermodelle sind belegt; aktuelle Amazon-Verfügbarkeit, Verkäufer und die exakte Variante jedes einzelnen der 101 Links sind nicht vollständig verifiziert. Es werden deshalb keine Preise oder Verfügbarkeitszusagen angezeigt. Die unklare Le-Klint-Modellbezeichnung wird nicht in eine technische Kaufberatung übernommen.

## Messung und nächste Auswertung

Vorhandenes Pinterest-Tag: 2614306645876. Ereignisse nur nach Einwilligung:

| Ereignis | Bedeutung |
| --- | --- |
| pagevisit | Ein Seitenaufruf nach Einwilligung |
| filter_change | Eine gewählte Themen-/Board-Auswahl oder Zurücksetzen, kein Suchtext |
| affiliate_click | Ein Klick auf einen Produktlink mit Produkt-ID und Seitenpfad |
| affiliate_engaged | Höchstens einmal pro geladenem Dokument: mindestens ein Produktklick |

Das getrennte Messdokument verhindert, dass beliebige eigene URL-/Suchparameter direkt als Ereignisfelder übernommen werden, und lässt sich beim Widerruf vollständig entfernen. Es verändert aber die automatische Seiten-URL im Pinterest-Tag: tatsächliche Seite und Einstieg werden als explizite Eventfelder mitgesendet. Die Custom-Events sowie Felder müssen im Ads Manager geprüft werden. Zusätzliche Eventfelder sind laut Pinterest nicht automatisch frei aufschlüsselbare Conversion-Berichte. Ein vollwertiges Besucher-/Produkt-Dashboard ist damit nicht eingerichtet.

Offene Zugriffe/Daten: keine verbundenen Google-Search-Console- oder Bing-Webmaster-Zugänge; keine belastbaren Amazon-Partner-Verkaufs-/Provisionsberichte; keine abgerufenen Pinterest-Ads-Berichte. Empfang im echten Ads Manager und Zuordnung der Custom-Events stehen aus.

Nächste Auswertung nach ausreichend echter Nutzung:

1. Indexierte Seiten, Suchimpressionen, Suchklicks und Such-CTR je Einstiegsseite aus Search Console/Bing.
2. Pinterest-Ausgangsklicks je Pin und UTM-Kampagne.
3. Produktklicks und Anteil der gemessenen Seitenaufrufe mit mindestens einem Produktklick (`affiliate_engaged / pagevisit`). Das ist eine Aufrufquote, keine Besucher- oder Kaufquote.
4. Anteil eindeutiger Besucher mit Produktklick nur mit einer geeigneten deduplizierten Berichtsdatenbasis – aktuell nicht berechenbar. Ebenso sind Kampagnen-/Landingpage-Kreuztabellen erst bei verfügbarer passender Auswertung belastbar.
5. Verkäufe, Retouren und Provisionen ausschließlich aus Amazon-Partnerdaten. Niemals aus Klicks ableiten.

Einwilligung, Blocker und unterschiedliche Attributionsfenster begrenzen die Vergleichbarkeit. Keine garantierte Indexierung, Rankings oder Nennung in KI-Antworten. Rechtliche Texte wurden an die tatsächliche technische Umsetzung angepasst, nicht anwaltlich geprüft.

## Primärquellen

- https://professional.flos.com/en/global/product/ic-lights-t1-low-f3171030/
- https://flos.com/en/is/ic-lights-t1-low-chrome-halogen/F3171057.html
- https://www.kartell.com/gb/en/ktgb/shop/product/bourgie-transparent/karb9070q8
- https://www.louispoulsen.com/api/downloadcenter/download?id=PH+5-90293.pdf&type=productpdf
- https://gubi.com/en/us/products/graeshoppa-pendant?variant=10112356
- https://help.pinterest.com/en/business/article/add-event-codes
- https://help.pinterest.com/en/business/article/pinterest-tag-parameters-and-cookies
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://www.gesetze-im-internet.de/ttdsg/__25.html
