const display = document.querySelector("#display");

let currentFormula = "";
let isPowerOn = true;
let isCalculated = false;

window.addEventListener("load", () => {
  document.querySelector(".on-off").classList.add("on");
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function togglePower() {
  isPowerOn = !isPowerOn;
  const buttons = document.querySelectorAll("button:not(.on-off)");
  const onOffButton = document.querySelector(".on-off");

  if (isPowerOn) {
    display.value = "0";
    onOffButton.classList.add("on");
    buttons.forEach((button) => button.removeAttribute("disabled"));
  } else {
    display.value = "";
    onOffButton.classList.remove("on");
    buttons.forEach((button) => button.setAttribute("disabled", "true"));
    currentFormula = "";
    isCalculated = false;
  }
}

function appendNumber(number) {
  if (!isPowerOn) return;

  if (isCalculated) {
    display.value = "";
    currentFormula = "";
    isCalculated = false;
  }

  if (display.value === "0" || display.value === "Error" || display.value === "DivBy0") {
    display.value = number;
    currentFormula = number;
  } else {
    display.value += number;
    currentFormula += number;
  }
}

function appendOperator(operator) {
  if (!isPowerOn || display.value === "Error" || display.value === "DivBy0") return;

  if (isCalculated) isCalculated = false;
  if (currentFormula === "") currentFormula = "0";

  if (currentFormula.endsWith(" ")) {
    currentFormula = currentFormula.slice(0, -3);
  }

  currentFormula += ` ${operator} `;
  display.value = currentFormula;
}

function clearDisplay() {
  if (!isPowerOn) return;

  display.value = "0";
  currentFormula = "";
  isCalculated = false;
}

function calculate(formula) {
  const tokens = formula.trim().split(/\s+/);
  if (tokens.length < 3 || tokens.length % 2 === 0) return "Error";

  const intermediateTokens = [];
  let index = 0;

  while (index < tokens.length) {
    if (tokens[index] === "*" || tokens[index] === "/") {
      const left = Number(intermediateTokens.pop());
      const right = Number(tokens[index + 1]);

      if (Number.isNaN(left) || Number.isNaN(right)) return "Error";
      if (tokens[index] === "/" && right === 0) return "DivBy0";

      const result = tokens[index] === "*"
        ? multiply(left, right)
        : divide(left, right);

      intermediateTokens.push(result);
      index += 2;
    } else {
      intermediateTokens.push(tokens[index]);
      index += 1;
    }
  }

  let result = Number(intermediateTokens[0]);
  if (Number.isNaN(result)) return "Error";

  for (let i = 1; i < intermediateTokens.length; i += 2) {
    const operator = intermediateTokens[i];
    const nextValue = Number(intermediateTokens[i + 1]);
    if (Number.isNaN(nextValue)) return "Error";

    if (operator === "+") result = add(result, nextValue);
    else if (operator === "-") result = subtract(result, nextValue);
    else return "Error";
  }

  return result;
}

function performCalculate() {
  if (!isPowerOn || !currentFormula) return;

  currentFormula = currentFormula.trim();
  const result = calculate(currentFormula);
  display.value = result;
  isCalculated = true;

  if (result === "Error" || result === "DivBy0") currentFormula = "";
  else currentFormula = String(result);
}
