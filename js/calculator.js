const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let formula = "";
let isPowerOn = true;

function showFormula() {
  display.value = formula || "0";
}

function addValue(value) {
  if (!isPowerOn) return;

  formula += value;
  showFormula();
}

function clearDisplay() {
  formula = "";
  showFormula();
}

function calculate() {
  if (!isPowerOn || formula === "") return;

  try {
    // JavaScript가 *, /를 먼저 계산해 사칙연산 우선순위를 적용합니다.
    formula = String(eval(formula));
    showFormula();
  } catch (error) {
    display.value = "Error";
    formula = "";
  }
}

function togglePower() {
  isPowerOn = !isPowerOn;

  if (isPowerOn) {
    clearDisplay();
  } else {
    formula = "";
    display.value = "";
  }

  buttons.forEach((button) => {
    if (!button.classList.contains("on-off")) {
      button.disabled = !isPowerOn;
    }
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("on-off")) {
      togglePower();
    } else if (button.classList.contains("clear")) {
      clearDisplay();
    } else if (button.classList.contains("enter")) {
      calculate();
    } else {
      addValue(button.dataset.value);
    }
  });
});
