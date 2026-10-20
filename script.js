/** Gesamtpunktzahl der bereits eingetragenen Wertungen.
 * @type {number}
 */
var score = 0;

/** Anzahl der bisherigen Würfe im aktuellen Spielzug.
 * @type {number}
 */
var rolled = 0;

/** Aktuelle Werte der fünf Würfel.
 * @type {number[]}
 */
var values = [];

/** Bisherige Punkte im oberen Block (Einser bis Sechser).
 * @type {number}
 */
var upperScore = 0;


var GAME_OVER_MESSAGE = "Spiel zu Ende!";

/** Würfelt nicht gehaltene Würfel und aktualisiert den Rundenstatus. */
function rollDices() {
	
	var dices = document.getElementsByClassName('dice');

	
	values = [];

	for (var i = 0; i < dices.length; i++) {
		// Gehaltene Würfel behalten ihren bisherigen Wert.
		if (dices[i].hasAttribute('data-hold')) {
			values.push(parseInt(dices[i].value));
			continue;
		}

		
		dices[i].value = Math.floor((Math.random() * 6) + 1);

		
		var value = parseInt(dices[i].value);
		values.push(value);
	}

	
	rolled++;
}

/** Berechnet die gewählte Wertung und trägt sie in die Tabelle ein.
 * @param {HTMLElement} field - Zelle der Wertungstabelle.
 * @param {number|string} type - Wertungskategorie.
 * @returns {void}
 */
function assignDices(field, type) {
	// Wertungen sind erst nach dem ersten Wurf möglich.
	if (rolled === 0) {
		return;
	}

	
	if (field.innerHTML !== '' && field.innerHTML !== '0') {
		return;
	}

	
	var points = 0;

	
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

	
	field.innerHTML = points;

	
	score += points;

	// Der Bonus wird einmalig ab 63 Punkten im oberen Block vergeben.
	var bonusElement = document.getElementById('bonus');
	if (upperScore >= 63 && bonusElement.innerHTML === '0') {
		bonusElement.innerHTML = 35;
		
		score += 35;
	}

	
	document.getElementById('score').innerHTML = score;

	
	resetRound();

	
	checkGameOver();
}

/** Addiert die Würfel mit dem angegebenen Augenwert.
 * @param {number} num - Augenwert von 1 bis 6.
 * @returns {number}
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

/** Ermittelt die Augensumme, falls mindestens `num` gleiche Würfel vorliegen.
 * @param {number} num - Benötigte Anzahl gleicher Würfel.
 * @returns {number}
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

/** Zählt die Häufigkeit jedes Würfelwertes.
 * @returns {Object<string, number>}
 */
function getCounts() {
	var counts = {};
	for (var i = 0; i < values.length; i++) {
		counts[values[i]] = (counts[values[i]] || 0) + 1;
	}
	return counts;
}

/** Prüft auf drei gleiche und zwei weitere gleiche Würfel (Full House).
 * @returns {number}
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

/** Prüft auf mindestens vier aufeinanderfolgende Würfelwerte.
 * @returns {number}
 */
function getKleineStrasse() {
	var sortedUnique = getSortedUnique();
	if (sortedUnique.includes('1234') || sortedUnique.includes("2345") || sortedUnique.includes("3456")) {
		return 30;
    }
	return 0;
}

/** Prüft auf fünf aufeinanderfolgende Würfelwerte.
 * @returns {number}
 */
function getGrosseStrasse() {
	var sortedUnique = getSortedUnique();
	if (sortedUnique.includes("12345") || sortedUnique.includes("23456")) {
		return 40;
	}
	return 0;
}

/** Gibt die verschiedenen Augenwerte sortiert als Zeichenkette zurück.
 * @returns {string}
 */
function getSortedUnique() {
	var uniqueValues = [...new Set(values)];
	uniqueValues.sort();
	return uniqueValues.join('');
}

/** Vergibt 50 Punkte, wenn alle fünf Würfel denselben Wert zeigen.
 * @returns {number}
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

/** Addiert die aktuellen Würfelwerte (Chance).
 * @returns {number}
 */
function getSum() {
	var sum = 0;
	for (var i = 0; i < values.length; i++) {
		sum += values[i];
	}
	return sum;
}

/** Beendet die Partie, wenn alle Wertungsfelder ausgefüllt sind.
 * @returns {void}
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

/** Setzt die Würfel und den Würfelzähler für den nächsten Spielzug zurück.
 * @returns {void}
 */
function resetRound() {
	var dices = document.getElementsByClassName('dice');

	for (var i = 0; i < dices.length; i++) {
		
		dices[i].removeAttribute('data-hold');

		
		dices[i].value = 0;
	}

	
	values = [];

	
	rolled = 0;
}

/** Wechselt zwischen gehaltenem und freiem Würfel.
 * @param {HTMLElement} dice - Angeklickter Würfel.
 * @returns {void}
 */
function toggleDice(dice) {
	// Vor dem ersten Wurf dürfen Würfel nicht gehalten werden.
	if (rolled === 0) {
		return;
	}

	if (dice.getAttribute('data-hold')) {
		
		dice.removeAttribute('data-hold');
	} else {
		
		dice.setAttribute('data-hold', 1);
	}

	
	dice.blur();
}
