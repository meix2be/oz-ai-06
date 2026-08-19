const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector('[data-action="clear"]');
const powerButton = document.querySelector('[data-action="power"]');
const calculateButton = document.querySelector('[data-action="calculate"]');
const calculatorButtons = document.querySelectorAll(".button:not([data-action='power'])");

let expression = "";
let isPowerOn = true;
let isCalculated = false;

function updateDisplay(value = expression || "0") {
  display.value = value;
}

function appendNumber(number) {
  if (!isPowerOn) return;

  if (isCalculated) {
    expression = "";
    isCalculated = false;
  }

  const lastNumber = expression.split(/[+\-*/]/).pop();
  if (number === "." && lastNumber.includes(".")) return;

  expression += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (!isPowerOn || expression === "") return;

  if (/[+\-*/]$/.test(expression)) {
    expression = expression.slice(0, -1) + operator;
  } else {
    expression += operator;
  }

  isCalculated = false;
  updateDisplay();
}

function calculateExpression(value) {
  const tokens = value.match(/(?:\d*\.\d+|\d+\.?\d*|[+\-*/])/g);
  if (!tokens || tokens.join("") !== value || tokens.length < 3 || tokens.length % 2 === 0) {
    return "Error";
  }

  const multiplied = [];
  let index = 0;

  while (index < tokens.length) {
    const token = tokens[index];

    if (token === "*" || token === "/") {
      const left = Number(multiplied.pop());
      const right = Number(tokens[index + 1]);
      if (!Number.isFinite(left) || !Number.isFinite(right)) return "Error";
      if (token === "/" && right === 0) return "0으로 나눌 수 없습니다.";
      multiplied.push(token === "*" ? left * right : left / right);
      index += 2;
    } else {
      multiplied.push(token);
      index += 1;
    }
  }

  let result = Number(multiplied[0]);
  if (!Number.isFinite(result)) return "Error";

  for (let i = 1; i < multiplied.length; i += 2) {
    const operator = multiplied[i];
    const next = Number(multiplied[i + 1]);
    if (!Number.isFinite(next)) return "Error";
    result = operator === "+" ? result + next : result - next;
  }

  return result;
}

function calculate() {
  if (!isPowerOn || expression === "") return;

  const result = calculateExpression(expression);
  updateDisplay(String(result));
  expression = typeof result === "number" ? String(result) : "";
  isCalculated = true;
}

function clearCalculator() {
  expression = "";
  isCalculated = false;
  updateDisplay();
}

function togglePower() {
  isPowerOn = !isPowerOn;
  calculatorButtons.forEach((button) => {
    button.disabled = !isPowerOn;
  });

  if (isPowerOn) {
    clearCalculator();
    powerButton.classList.add("is-on");
  } else {
    expression = "";
    isCalculated = false;
    updateDisplay("");
    powerButton.classList.remove("is-on");
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.dataset.number));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => appendOperator(button.dataset.operator));
});

clearButton.addEventListener("click", clearCalculator);
powerButton.addEventListener("click", togglePower);
calculateButton.addEventListener("click", calculate);

document.addEventListener("keydown", (event) => {
  if (/\d|\./.test(event.key)) appendNumber(event.key);
  if (["+", "-", "*", "/"].includes(event.key)) appendOperator(event.key);
  if (event.key === "Enter") calculate();
  if (event.key === "Escape") clearCalculator();
});
