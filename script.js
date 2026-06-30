// ── Variables to remember state ──────────────────────────────────

let currentNumber = '0';      // The number shown on screen right now
let firstNumber = null;       // The first number (saved before operator)
let operator = null;          // The chosen operator: +, -, ×, ÷
let waitingForSecond = false; // Are we waiting for the 2nd number?


// ── Helper: update what's shown on screen ────────────────────────

function updateDisplay() {
  document.getElementById('result').textContent = currentNumber;
}

function updateExpression(text) {
  document.getElementById('expression').textContent = text;
}


// ── When a number button is pressed ──────────────────────────────

function pressNumber(num) {
  // If we just pressed an operator, start fresh for the second number
  if (waitingForSecond) {
    currentNumber = num;
    waitingForSecond = false;
  } else {
    // Don't allow more than one leading zero
    if (currentNumber === '0') {
      currentNumber = num;
    } else {
      currentNumber = currentNumber + num;
    }
  }
  updateDisplay();
}


// ── Decimal point ─────────────────────────────────────────────────

function pressDecimal() {
  // If waiting for second number, start with "0."
  if (waitingForSecond) {
    currentNumber = '0.';
    waitingForSecond = false;
    updateDisplay();
    return;
  }

  // Only add a dot if there isn't one already
  if (!currentNumber.includes('.')) {
    currentNumber = currentNumber + '.';
    updateDisplay();
  }
}


// ── Operator button pressed (+, -, ×, ÷) ─────────────────────────

function chooseOperator(op) {
  // Save the current number as the first number
  firstNumber = parseFloat(currentNumber);
  operator = op;
  waitingForSecond = true;

  // Show something like "5 +" in the small expression area
  updateExpression(firstNumber + ' ' + op);
}


// ── Equals button ─────────────────────────────────────────────────

function calculate() {
  // We need both numbers and an operator to calculate
  if (operator === null || waitingForSecond) return;

  let secondNumber = parseFloat(currentNumber);
  let answer;

  // Do the math based on which operator was chosen
  if (operator === '+') {
    answer = firstNumber + secondNumber;
  } else if (operator === '-') {
    answer = firstNumber - secondNumber;
  } else if (operator === '×') {
    answer = firstNumber * secondNumber;
  } else if (operator === '÷') {
    if (secondNumber === 0) {
      // Can't divide by zero!
      currentNumber = 'Error';
      updateDisplay();
      updateExpression('');
      operator = null;
      return;
    }
    answer = firstNumber / secondNumber;
  }

  // Show the full expression in the small area e.g. "5 + 3 ="
  updateExpression(firstNumber + ' ' + operator + ' ' + secondNumber + ' =');

  // Round to avoid floating point issues like 0.1 + 0.2 = 0.30000000004
  answer = parseFloat(answer.toFixed(10));

  currentNumber = String(answer);
  operator = null;
  firstNumber = null;
  waitingForSecond = false;

  updateDisplay();
}


// ── AC: clear everything ──────────────────────────────────────────

function clearAll() {
  currentNumber = '0';
  firstNumber = null;
  operator = null;
  waitingForSecond = false;
  updateDisplay();
  updateExpression('');
}


// ── +/- : flip positive / negative ───────────────────────────────

function toggleSign() {
  if (currentNumber !== '0' && currentNumber !== 'Error') {
    if (currentNumber.startsWith('-')) {
      currentNumber = currentNumber.slice(1);   // remove the minus
    } else {
      currentNumber = '-' + currentNumber;      // add a minus
    }
    updateDisplay();
  }
}


// ── % : convert to percentage ─────────────────────────────────────

function percentage() {
  if (currentNumber !== 'Error') {
    currentNumber = String(parseFloat(currentNumber) / 100);
    updateDisplay();
  }
}