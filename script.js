/**
 * Gesamtpunktzahl
 *
 * @var number
 */
var score = 0;

/**
 * Anzahl der getätigten Würfe in dieser Runde
 *
 * @var number
 */
var rolled = 0;

/**
 * Alle aktuellen Würfelwerte
 *
 * @var array
 */
var values = [];

/**
 * Punkte für das obere Feld (Einser bis Sechser) für den Bonus
 * 
 * @var number
 */
var upperScore = 0;

/**
 * Globale Nachricht bei Spielende
 * 
 * @var string
 */
var GAME_OVER_MESSAGE = "Spiel zu Ende!";

/**
 * Alle Würfel werfen
 *
 * @return void
 */
function rollDices() {
	// Alle HTML Elemente mit der CSS Klasse "dice" ermitteln
	var dices = document.getElementsByClassName('dice');

	// Die aktuellen Würfelwerte zurücksetzen
	values = [];

	for (var i = 0; i < dices.length; i++) {
		// Würfel nicht würfeln, wenn dieser gehalten wird
		if (dices[i].hasAttribute('data-hold')) {
			values.push(parseInt(dices[i].value));
			continue;
		}

		// Eine Zufallszahl zwischen 1 und 6 generieren und dem Würfel zuweisen
		dices[i].value = Math.floor((Math.random() * 6) + 1);

		// Aktuellen Würfelwert merken
		var value = parseInt(dices[i].value);
		values.push(value);
	}

	// Anzahl der getätigten Würfe erhöhen
	rolled++;
}

/**
 * Würfel einem Feld zuweisen
 *
 * @param HTMLElement field
 * @param mixed type
 * @return void
 */
function assignDices(field, type) {
	// Verhindern, dass Punkte zugewiesen werden, bevor mindestens einmal gewürfelt wurde
	if (rolled === 0) {
		return;
	}

	// Verhindern, dass ein Feld mehr als einmal belegt wird
	if (field.innerHTML !== '' && field.innerHTML !== '0') {
		return;
	}

	// Die zu vergebenden Punkte
	var points = 0;

	// Berechnung der Punkte basierend auf dem übergebenen Typ
	switch (type) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			points = getEinserBisSechser(type);
			upperScore += points;
			break;
		case 'Dreierpasch':
			points = getPasch(3);
			break;
		case 'Viererpasch':
			points = getPasch(4);
			break;
		case 'FullHouse':
			points = getFullHouse();
			break;
		case 'KleineStrasse':
			points = getKleineStrasse();
			break;
		case 'GrosseStrasse':
			points = getGrosseStrasse();
			break;
		case 'Kniffel':
			points = getKniffel();
			break;
		case 'Chance':
			points = getSum();
			break;
	}

	// Punkte zuweisen
	field.innerHTML = points;

	// Gesamtpunktzahl erhöhen und in das HTML Element mit der ID score schreiben
	score += points;

	// Bonus berechnen (mindestens 63 Punkte im oberen Bereich)
	var bonusElement = document.getElementById('bonus');
	if (upperScore >= 63 && bonusElement.innerHTML === '0') {
		bonusElement.innerHTML = 35;
		// Bonuspunkte zur Gesamtpunktzahl hinzufügen
		score += 35;
	}

	// Gesamtpunktzahl aktualisieren
	document.getElementById('score').innerHTML = score;

	// Runde zurücksetzen
	resetRound();

	// Prüfen ob das Spiel vorbei ist
	checkGameOver();
}

/**
 * Einser bis Sechser berechnen
 *
 * @param number num
 * @return number
 */
function getEinserBisSechser(num) {
	var points = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i] == num) {
			points += num;
		}
	}

	return points;
}

/**
 * Pasch berechnen
 *
 * @param number num
 * @return number
 */
function getPasch(num) {
	var points = 0;
	var counts = getCounts();
	var hasPasch = false;

	for (var key in counts) {
		if (counts[key] >= num) {
			hasPasch = true;
			break;
		}
	}

	if (hasPasch) {
		for (var i = 0; i < values.length; i++) {
			points += values[i];
		}
	}

	return points;
}

/**
 * Zählt, wie oft jeder Wert vorkommt
 * 
 * @return object
 */
function getCounts() {
	var counts = {};
	for (var i = 0; i < values.length; i++) {
		counts[values[i]] = (counts[values[i]] || 0) + 1;
	}
	return counts;
}

/**
 * Full House berechnen
 * Ein Full House besteht aus einem Drilling und einem Paar (z.B. 3, 3, 3, 5, 5).
 * 
 * @return number
 */
function getFullHouse() {
	var counts = getCounts();
	var hasTwo = false;
	var hasThree = false;
	for (var key in counts) {
		if (counts[key] == 2) {
			hasTwo = true;
		} else if (counts[key] == 3) {
			hasThree = true;
		}
	}
	return (hasTwo && hasThree) ? 25 : 0;
}

/**
 * Kleine Straße berechnen.
 * Eine kleine Straße besteht aus vier aufeinanderfolgenden Werten (z.B. 1, 2, 3, 4).
 *
 * @return number
 */
function getKleineStrasse() {
	var sortedUnique = getSortedUnique();
	if (sortedUnique.includes('1234') || sortedUnique.includes("2345") || sortedUnique.includes("3456")) {
		return 30;
    }
	return 0;
}

/**
 * Große Straße berechnen.
 * Eine große Straße besteht aus fünf aufeinanderfolgenden Werten (z.B. 1, 2, 3, 4, 5).
 *
 * @return number
 */
function getGrosseStrasse() {
	var sortedUnique = getSortedUnique();
	if (sortedUnique.includes("12345") || sortedUnique.includes("23456")) {
		return 40;
	}
	return 0;
}

/**
 * Erzeugt einen sortierten String aller eindeutigen Würfelwerte.
 * Beispiel: [3, 1, 3, 5, 2] -> "1235"
 *
 * @return string
 */
function getSortedUnique() {
	var uniqueValues = [...new Set(values)];
	uniqueValues.sort();
	return uniqueValues.join('');
}

/**
 * Kniffel berechnen.
 * Ein Kniffel liegt vor, wenn alle fünf Würfel denselben Wert zeigen.
 *
 * @return number
 */
function getKniffel() {
	var counts = getCounts();
	for (var key in counts) {
		if (counts[key] === 5) {
			return 50;
		}
	}
	return 0;
}

/**
 * Summe aller aktuellen Würfelwerte berechnen.
 * Wird für die Chance verwendet.
 *
 * @return number
 */
function getSum() {
	var sum = 0;
	for (var i = 0; i < values.length; i++) {
		sum += values[i];
	}
	return sum;
}

/**
 * Prüft, ob alle Punktefelder ausgefüllt sind, und beendet das Spiel,
 * wenn keine weiteren Einträge mehr möglich sind.
 * Der Würfel-Button wird deaktiviert und ein Hinweis wird angezeigt.
 *
 * @return void
 */
function checkGameOver() {
	var cells = document.querySelectorAll('td[onclick]');
	var isAllCellsFilled = true;
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].innerHTML === '') {
			isAllCellsFilled = false;
			break;
		}
	}
	if (isAllCellsFilled) {
		var rollButton = document.getElementById('roll');
		rollButton.disabled = true;
		rollButton.innerHTML = GAME_OVER_MESSAGE;
		alert(GAME_OVER_MESSAGE);
	}
}

/**
 * Diese Runde zurücksetzen
 *
 * @return void
 */
function resetRound() {
	var dices = document.getElementsByClassName('dice');

	for (var i = 0; i < dices.length; i++) {
		// Alle Würfel loslassen
		dices[i].removeAttribute('data-hold');

		// Alle Würfelwerte zurücksetzen
		dices[i].value = 0;
	}

	// Alle gemerkten Würfelwerte zurücksetzen
	values = [];

	// Anzahl der getätigten Würfe zurücksetzen
	rolled = 0;
}

/**
 * Würfel halten oder loslassen
 *
 * @param HTMLElement dice
 * @return void
 */
function toggleDice(dice) {
	// Verhindern, dass die Würfel gehalten oder gelassen werden, bevor mindestens einmal gewürfelt wurde
	if (rolled === 0) {
		return;
	}

	if (dice.getAttribute('data-hold')) {
		// Das HTML Attribut "data-hold" existiert bereits und wird entfernt
		dice.removeAttribute('data-hold');
	} else {
		// Das HTML Attribut "data-hold" existiert noch nicht und wird gesetzt
		dice.setAttribute('data-hold', 1);
	}

	// Fokus auf diesen Würfel entfernen
	dice.blur();
}
