"use strict";

const numberRange = 20;

const displayMessage = (message) =>
  (document.querySelector("#message").textContent = message);

const updateSecretNumber = (range) => Math.trunc(Math.random() * range) + 1;

const updateScore = () =>
  (document.querySelector("#score").textContent = score);

const updateAttempts = () =>
  (document.querySelector("#attempts").textContent = attempts);

const updateInputState = (n, c, h, r) => {
  document.querySelector("#number").disabled = n;
  document.querySelector("#check").disabled = c;
  document.querySelector("#help").disabled = h;
  document.querySelector("#restart").disabled = r;
};

const changeStyle = (property, style) => {
  document.querySelector(property).classList.value = style;
};

let secretNumber = updateSecretNumber(numberRange);
let attempts = 20;
let score = 0;
updateInputState(false, false, false, true);

document.querySelector("#check").addEventListener("click", function () {
  const number = Number(document.querySelector("#number").value);
  updateInputState(false, false, false, true);
  if (!number) displayMessage("Inserisci un numero!");
  else if (number === secretNumber) {
    score += attempts;
    updateScore();
    updateInputState(true, true, true, false);
    displayMessage("Hai indovinato!");
    changeStyle("body", "bg-green-200");
  } else if (number !== secretNumber) {
    if (attempts > 2 && (number < 1 || number > 20)) {
      attempts -= 2;
      updateAttempts();
      displayMessage("Il numero deve essere compreso tra 1 e 20!");
    } else if (attempts < 2 && (number < 1 || number > 20)) {
      attempts--;
      updateAttempts();
      updateInputState(true, true, true, true);
      changeStyle("body", "bg-red-200");
      displayMessage("Hai perso!");
    } else if (attempts > 1) {
      attempts--;
      updateAttempts();
      displayMessage(number > secretNumber ? "Troppo alto!" : "Troppo basso!");
    } else {
      attempts--;
      updateAttempts();
      updateInputState(true, true, true, true);
      changeStyle("body", "bg-red-200");
      displayMessage("Hai perso!");
    }
  }
});

document.querySelector("#help").addEventListener("click", function () {
  if (attempts > 3) {
    displayMessage(`Prova con ${secretNumber}!`);
    attempts -= 2;
    updateAttempts();
    updateInputState(false, false, true, true);
  } else {
    displayMessage(`Tentativi insufficienti!`);
  }
});

document.querySelector("#restart").addEventListener("click", function () {
  secretNumber = updateSecretNumber(numberRange);
  updateInputState(false);
  document.querySelector("#restart").disabled = true;
  displayMessage("Contiuna a giocare...");
  changeStyle("body", "bg-gray-200");
});
