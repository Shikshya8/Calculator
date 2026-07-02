// grab the display input box from the HTML so we can read/change it
const display = document.getElementById('display');

// this function runs when user clicks a number or an operator (+, -, *, /, .)
// it just adds ("appends") whatever was clicked to the end of the display
function appendValue(value) {
  display.value += value;
}

// this function runs when user clicks "C" (Clear)
// it empties the display completely
function clearDisplay() {
  display.value = '';
}

// this function runs when user clicks "DEL"
// it removes only the last character (like backspace)
function deleteLast() {
  display.value = display.value.slice(0, -1);
  // slice(0, -1) means "give me everything except the last character"
}

// this function runs when user clicks "="
// it takes whatever is typed (like "5+3") and calculates the answer
function calculateResult() {
  try {
    // eval() reads the text as a math expression and solves it
    // (eval is not great for big real-world apps, but perfect for learning)
    display.value = eval(display.value);
  } catch (error) {
    // if the user typed something invalid, like "5++", show an error
    display.value = 'Error';
  }
}