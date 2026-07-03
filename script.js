const display = document.getElementById('display');
let isOn = true;

function appendValue(value) {
  if (!isOn) return;
  display.value += value;
}

function clearDisplay() {
  if (!isOn) return;
  display.value = '';
}

function deleteLast() {
  if (!isOn) return;
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  if (!isOn) return;
  try {

    let expression = display.value;
    expression = expression.replaceAll('sin(', 'sinDeg(');
    expression = expression.replaceAll('cos(', 'cosDeg(');
    expression = expression.replaceAll('tan(', 'tanDeg(');

    display.value = eval(expression);
  } catch (error) {
    display.value = 'Error';
  }
}

function convertToBinary() {
  if (!isOn) return;
  const currentNumber = parseInt(display.value);
  if (isNaN(currentNumber)) {
    display.value = 'Error';
    return;
  }
  display.value = currentNumber.toString(2);
}

function calculatePower() {
  if (!isOn) return;
  const base = parseFloat(display.value);
  const exponent = parseFloat(prompt("Enter the exponent (the power to raise it to):"));
  if (isNaN(base) || isNaN(exponent)) {
    display.value = 'Error';
    return;
  }
  display.value = Math.pow(base, exponent);
}

function calculateRoot() {
  if (!isOn) return;
  const number = parseFloat(display.value);
  if (isNaN(number) || number < 0) {
    display.value = 'Error';
    return;
  }
  display.value = Math.sqrt(number);
}


function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}


function sinDeg(degrees) {
  return Math.sin(degreesToRadians(degrees));
}

function cosDeg(degrees) {
  return Math.cos(degreesToRadians(degrees));
}

function tanDeg(degrees) {
  return Math.tan(degreesToRadians(degrees));
}

function togglePower() {
  if (isOn) {
    display.value = '';
    display.style.opacity = '0.2';
    isOn = false;
  } else {
    display.style.opacity = '1';
    isOn = true;
  }
}

document.addEventListener('keydown', function(event) {
  if (!isOn) return;
  const key = event.key;

  if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')') {
    appendValue(key);
  }
  if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculateResult();
  }
  if (key === 'Backspace') {
    deleteLast();
  }
  if (key === 'Escape') {
    clearDisplay();
  }
});