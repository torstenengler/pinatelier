# Pin Atelier

Statische redaktionelle Wohnideen-Website mit 101 bestehenden Pinterest-Pins, sechs Themenbereichen und zwei Kaufberatungen. Alle Produktlinks führen zu Amazon; kein eigener Shop.

## Cloudflare Pages Einstellungen

- **Production branch:** `main`
- **Build command:** leer lassen
- **Build output directory:** `/`
- **Root directory:** leer lassen

Die fertigen HTML-Dateien liegen im Repository. Cloudflare veröffentlicht sie unverändert; keine zusätzliche Hosting-Einrichtung nötig.

## Inhalte bearbeiten und prüfen

`pins.json` ist der unveränderte Quellbestand. Original-Links und Partner-IDs nicht überschreiben. In `scripts/build.mjs` stehen Seitenvorlagen, Themenzuordnungen und redaktionelle Texte; neue Pins müssen dort einsortiert werden. Rechtliche Ausgangstexte stehen unter `content/legal/`. Änderungen an generiertem HTML allein würden beim nächsten Generieren überschrieben.

Mit Node.js 22 oder neuer: `node scripts/build.mjs`. Der Lauf ist deterministisch. Alle erzeugten Dateien gemeinsam veröffentlichen.

Browserprüfung: `PA_MODULES=/pfad/zu/node_modules node scripts/test.mjs`, während die Vorschau unter `http://127.0.0.1:8765` läuft. Erfordert Playwright und Chrome. Externe Pinterest-Ereignisse sind im Test abgefangen; es werden keine Testverkäufe oder Testklicks an Pinterest geschickt. Optional `PA_BASE` für eine andere Vorschau setzen.

`scripts/image-audit.mjs` prüft die vorhandenen Pinterest-Bilder und zwei kleinere Varianten mit `sharp` aus `PA_MODULES`. Nur bei neuen/geänderten Motiven ausführen; anschließend erneut generieren. Die Bilder werden nicht verändert.

`pinterest-landing-map.csv` enthält vorgeschlagene motivgenaue Website-Ziele für alle Pins. Das ist eine Zuordnung, kein automatisches Update des Pinterest-Kontos. Produkt-Pins können ihren direkten Amazon-Link behalten; für Vergleichs-Pins sind die beiden Ratgeber die sinnvolleren Ziele.

## Messung und Datenschutz

`consent.js` lädt das Pinterest-Tag nur nach Zustimmung, in einem entfernbaren Messdokument. Widerruf über den Seitenfuß. Keine E-Mail-/Suchtext-Übermittlung; keine Checkout-Ereignisse. Eigene Eventdaten sind auf feste Pfade, Produkt-IDs und definierte Kategorien beschränkt.

Wichtig: Pinterest sieht als automatische Dokument-URL das isolierte Messdokument; die wirkliche Seite wird im Eventfeld `page_path` übermittelt. Herkunft und Einstieg stehen in `source` und `landing_page`. Diese Felder sind nicht automatisch als frei auswertbares Besucherdashboard verfügbar. Ads-Manager-Empfang und Berichtsoptionen separat prüfen; nicht mit Verkäufen gleichsetzen.

Siehe `REPORT.md` für Prüfergebnisse, Grenzen und nächste Auswertung.

Repository: https://github.com/torstenengler/pinatelier
