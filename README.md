# Kniffel – Würfelspiel mit JavaScript

Ein kleines, im Browser spielbares Kniffel-Projekt mit **HTML, CSS und Vanilla JavaScript**. Der Fokus liegt auf Spielregeln, Zustandsverwaltung, DOM-Interaktionen und der nachvollziehbaren Punkteberechnung – ohne Frameworks, Backend oder externe Bibliotheken.

## Vorschau

![Kniffel im Browser nach dem ersten Wurf](docs/kniffel-screenshot.png)

<!-- Optional nach eigener Aufnahme ergänzen: 
## Kurzvideo
Kurze Bildschirmaufnahme: Würfel werfen und halten, Punkte zuweisen und das Würfelprotokoll anzeigen.
[Hier die echte GitHub-Asset-Adresse nach dem Upload einfügen.]
-->

## Funktionen

- Fünf Würfel mit grafischen Würfelsymbolen (keine Bilddateien nötig).
- Bis zu drei Würfe pro Runde; nach dem ersten Wurf lassen sich einzelne Würfel halten.
- Einmalige Vergabe der 13 Wertungskategorien, **auch bei 0 Punkten**.
- Berechnung von Einsern bis Sechsern, Dreier-/Viererpasch, Full House, kleiner/großer Straße, Kniffel und Chance.
- Einmaliger Bonus von 35 Punkten ab 63 Punkten im oberen Block.
- Anzeige von Gesamtpunktzahl, Spielstatus und Würfelwerten zum Zeitpunkt jeder Eintragung.
- Erkennung des Spielendes und Neustart ohne Neuladen der Seite.
- Bedienbare Wertungsfelder auch per Tastatur (Enter/Leertaste).

## Lokal starten

1. Die Dateien `kniffel.html`, `style.css` und `script.js` in **demselben Ordner** ablegen.
2. `kniffel.html` doppelklicken und in einem aktuellen Browser öffnen.
3. Auf **Würfeln** klicken, nach Bedarf Würfel halten und eine freie Kategorie der Punktetabelle auswählen.

**Voraussetzungen:** Keine Installation, kein Server, keine Datenbank, kein Login. Die Würfel werden als Unicode-Symbole angezeigt; je nach Betriebssystem und Schriftart kann das Aussehen leicht variieren.

## Technischer Aufbau

| Datei | Inhalt |
| --- | --- |
| `kniffel.html` | Seitenstruktur, Spielsteuerung, Wertungstabelle und Würfelprotokoll |
| `style.css` | Responsive Layout, Würfeldarstellung, Halte-/Fokuszustände |
| `script.js` | Würfeln, Zustandsverwaltung, Punkteberechnung, Bonus, Historie und Neustart |

**Umgesetzte Logik:** Der Zustand wird in JavaScript verwaltet (`rolled`, `values`, `upperScore`, `gameOver`). Bereits belegte Wertungsfelder erhalten das Attribut `data-assigned`; dadurch bleibt auch eine Eintragung mit 0 Punkten endgültig vergeben. Die fünf Würfelwerte werden bei jeder Wertung vor dem Zurücksetzen protokolliert.

## Beispielablauf

1. Erster Wurf: Alle fünf Würfel erhalten Werte zwischen 1 und 6.
2. Optional: Würfel anklicken, um sie für den nächsten Wurf festzuhalten.
3. Spätestens nach dem dritten Wurf eine noch freie Wertungskategorie auswählen.
4. Punkte, Gesamtstand und Eintrag im **Würfelprotokoll** werden aktualisiert.
5. Sind alle 13 Kategorien belegt, ist das Spiel beendet. Über **Neues Spiel** kann eine neue Runde begonnen werden.

## Prüfung und bekannte Grenzen

Die wesentlichen Spielfälle wurden interaktiv im Browser geprüft (u. a. Wurflimit, festgehaltene Würfel, 0-Punkte-Feld, Wertungen, Bonus und Spielende). **Ein automatisiertes Test-Framework ist in diesem Repository derzeit nicht enthalten.**

Die aktuelle Version ist ein lokales Einzelspieler-Demo. Sie bietet keine Mehrspielerfunktion, dauerhafte Speicherung oder serverseitige Datenverarbeitung. Sonderregeln verschiedener Kniffel-Ausgaben können abweichen.

## Herkunft und eigener Beitrag

Das Projekt wurde aus einer **im Bewerbungsverfahren bereitgestellten Kniffel-Programmieraufgabe mit vorgegebenem Grundgerüst** weiterentwickelt. Der vorhandene Stand enthält Änderungen und Ergänzungen an Spielregeln, Punktezuteilung, Zustandsverwaltung, Oberfläche und Würfelprotokoll. Das ursprünglich bereitgestellte Grundgerüst ist **keine vollständig eigenständig entwickelte Neuentwicklung**.

**Hinweis zur Veröffentlichung:** Vor einem öffentlichen Upload prüfen, ob die Veröffentlichung des bereitgestellten Ausgangscodes durch den ursprünglichen Aufgabensteller erlaubt ist. Falls nicht, nur eine unabhängig neu implementierte Fassung veröffentlichen.
