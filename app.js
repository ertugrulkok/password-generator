const resultPasswort = document.getElementById("result");
const passwortLength = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateButton = document.getElementById("generate");

// funktionen, die jeweils ein Symbol, Number, Uppercase oder Lowercase zurückgeben -> Bereich wird definiert durch die ASCII Tabelle
function getSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}

function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// speichern der Funktionen in einem Objekt
const randomFunction = {
  lower: getLowercase,
  upper: getUppercase,
  number: getNumber,
  symbol: getSymbol,
};


// passwort nun mit dem aufrufen dieser Funktion generiert
function generateFinal() {
  let length = +passwortLength.value; // + macht daraus eine Number -> parseInt/parseFloat
  const isLower = lowercase.checked;
  const isUpper = uppercase.checked;
  const isNumber = numbers.checked;
  const isSymbols = symbols.checked;

  // wenn etwas nicht gechecked ist, dann wird es als false markiert und die Funktion zum generieren eines zufälligen Wertes wird nicht aufgerufen
   console.log(isLower, isUpper, isNumber, isSymbols);
  // aufrufen der Funktion generatePassword und übergeben der Parameter bzw. dem Wort der checkboxen.
  resultPasswort.innerHTML = generatePassword(
    isLower,
    isUpper,
    isNumber,
    isSymbols,
    length
  );
}
// Funktion zum generieren des Passworts mit Parameter, welche Elemente verwendet werden sollen
function generatePassword(lower, upper, number, symbol, length) {
  var generatedPasswort = "";

  // bestimmt die Reihenfolge, in der die Zeichen platziert werden sollen beispiel "kL1!"
  const order = lower + upper + number + symbol;
   console.log(order);
  // gibt einen Array zuück welcher überprüft ob die checkboxen gechecked sind.
  const orderArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    (character) => Object.values(character)[0]
  );
  console.log(orderArray);

  if (order == 0) {
    return "";
  }
  // ruft die Funktion auf , welche zur Erzeugung der einzelnen Zeichen erforderlich sit
  for (let i = 0; i < length; i += order) {
    orderArray.forEach((item, index, array) => {
      const getFunctionName = Object.keys(item)[0];

      generatedPasswort += randomFunction[getFunctionName]();
      console.log(generatedPasswort);
      console.log(getFunctionName);
    });
  }
  // bestimmt die Länge des Passworts, alle überflüssigen Zeichen werden abgeschnitten
  const finalPassword = generatedPasswort.slice(0, length);
  console.log(finalPassword);
  return finalPassword;
}

// dadurch wird das generierte Passwort in die Zwischenablage kopiert
function copyToClipboard() {
  // erstellen ein vorläufiges textarea
  const textarea = document.createElement("textarea");
  // eine variable wo unser Passwort gespeichert wird
  const copyElement = resultPasswort.innerText;
  // der inhalt vom textarea wird dem Passwort gleichgesetzt
  textarea.value = copyElement;
  // textarea wird dem browser hinzugefügt
  document.body.appendChild(textarea);
  // inhalt des textarea wird ausgewählt
  textarea.select();
  // inhalt wird kopiert
  navigator.clipboard.writeText(copyElement);
  // textarea wird entfernt vom browser
  textarea.remove();
}
