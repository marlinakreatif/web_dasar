let calculator = {
  displayNumber: "0",
  operators: null,
  firstNumber: null,
  waithingSecondNumber: false,
};

function updateDisplayNumber() {
  document.querySelector("#displayNumber").innerHTML = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operators = null;
  calculator.firstNumber = null;
  calculator.waithingSecondNumber = false;
}

function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.waithingSecondNumber) {
    calculator.operators = operator;
    calculator.waithingSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    calculator.displayNumber = "0";
  } else {
    alert("operator sudah ditetapkan");
  }
}

function performeCalculation() {
  if (calculator.firstNumber === null || calculator.operators === null) {
    alert("anda belum menetapkan operator");
    return;
  }
  let result = 0;
  if (calculator.operators === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }
  const historyItem = {
    firstNumber: calculator.firstNumber,
    operators: calculator.operators,
    secondNumber: calculator.displayNumber,
    result: result,
  };

  putHistory(historyItem);
  calculator.displayNumber = result;
  renderHistory();
}
const buttons = document.querySelectorAll(".button");
for (let btn of buttons) {
  btn.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplayNumber();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplayNumber();
      return;
    }

    if (target.classList.contains("equals")) {
      performeCalculation();
      updateDisplayNumber();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      updateDisplayNumber();
      return;
    }

    inputDigit(target.innerText);
    updateDisplayNumber();
  });
}
