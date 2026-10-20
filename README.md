# Kniffel – JavaScript-Übungsprojekt

Ein browserbasiertes Würfelspiel mit **HTML, CSS und JavaScript (ohne Framework)**. Im Mittelpunkt stehen DOM-Ereignisse, die Verwaltung der aktuellen Würfelwerte und die Punkteberechnung nach Kniffel-Regeln.

## Vorschau

Das Spiel besteht aus fünf Würfeln und einer Wertungstabelle mit 13 Kategorien. Nach dem Würfeln können einzelne Würfel durch Anklicken festgehalten und die erzielten Punkte einer Kategorie zugeordnet werden.

<!-- Optional: Nach dem Hochladen einer echten Aufnahme hier ergänzen:
## Kurze Videodemo
Die Bildschirmaufnahme zeigt das Würfeln, das Festhalten einzelner Würfel sowie die Zuordnung und Berechnung der Punkte.
[Video auf GitHub ansehen](HIER_DEN_ECHTEN_VIDEO_LINK_EINFÜGEN)
-->

## Kurze Videodemo
Die Bildschirmaufnahme zeigt das Würfeln, das Festhalten einzelner Würfel sowie die Zuordnung und Berechnung der Punkte.

https://github.com/user-attachments/assets/ea406472-7968-4fc1-a44f-3675eb7e4f7f

## Funktionen

- Fünf Würfel mit Bildern aus dem lokalen `img/`-Ordner (`1.png` bis `6.png`).
- Zufällige Würfelwerte und Festhalten bzw. Freigeben einzelner Würfel nach dem ersten Wurf.
- Wertung für Einser bis Sechser, Dreier- und Viererpasch, Full House, kleine und große Straße, Kniffel sowie Chance.
- 35 Bonuspunkte, sobald der obere Tabellenbereich mindestens 63 Punkte erreicht.
- Anzeige der Gesamtpunktzahl.
- Spielende-Meldung und Deaktivierung des Würfelbuttons, wenn alle Wertungsfelder belegt sind.

## Lokal starten

1. Das Repository herunterladen oder klonen.
2. `kniffel.html` in einem Browser öffnen. Ein Webserver, ein Login oder eine Installation sind nicht erforderlich.
3. Auf **Würfeln** klicken, bei Bedarf Würfel durch Anklicken halten und eine Kategorie in der Punktetabelle wählen.

**Wichtig:** Die Dateien `kniffel.html`, `script.js` und `style.css` müssen zusammen mit dem Ordner `img/` vorliegen, da die Würfel über Bilddateien dargestellt werden.

## Projektstruktur

```text
Kniffel-JavaScript/
├── kniffel.html
├── script.js
├── style.css
├── img/
│   ├── 1.png
│   ├── 2.png
│   ├── 3.png
│   ├── 4.png
│   ├── 5.png
│   └── 6.png
└── README.md
```

## Technische Umsetzung

- **HTML:** Fünf Würfelbuttons, Würfelsteuerung und Wertungstabelle.
- **CSS:** Würfelbilder, Kennzeichnung gehaltener Würfel und Layout der Tabelle.
- **JavaScript:** Ereignisbehandlung, Spielzustand (`rolled`, `values`, `upperScore`), Häufigkeitszählung und Punkteberechnung.
- **Interaktion:** Die Wertungen werden per DOM-Aktion aktualisiert; dazu gehören auch die Berechnung des Bonus und die Prüfung des Spielendes.

## Aktuelle Einschränkungen

Die hochgeladene Version bildet die unten genannten Regeln noch **nicht vollständig** ab:

- Die Zahl der Würfe je Spielzug wird gezählt, aber nicht auf maximal drei begrenzt.
- Eine bereits mit **0 Punkten** belegte Kategorie kann erneut ausgewählt werden.
- Die fünf Würfelwerte werden beim Eintragen einer Kategorie nicht dauerhaft protokolliert.

Es handelt sich um ein lokales Einzelspieler-Übungsprojekt ohne automatische Tests, dauerhafte Speicherung oder Mehrspielerfunktion. Eine neue Partie kann durch erneutes Laden der Seite gestartet werden.
