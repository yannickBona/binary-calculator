const inputBox = document.getElementById("inputValue");
const outputBox = document.getElementById("outputValue");
const submitButton = document.getElementById("buttonConvert");
const clearButton = document.getElementById("buttonClear");
const swapButton = document.getElementById("swapButton");

inputBox.addEventListener("focus", hideErrorMessage);
inputBox.addEventListener("input", restrictBinaryInput);

submitButton.addEventListener("click", convertNumbers);
swapButton.addEventListener("click", swapConversion);
clearButton.addEventListener("click", clearInputs);

function swapConversion() {
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");

  swapProperty(fromInput, toInput, "value");

  const inputBoxLabel = document.querySelector('label[for="inputValue"]');
  const outputBoxLabel = document.querySelector('label[for="outputValue"]');

  swapProperty(inputBoxLabel, outputBoxLabel, "textContent");
  swapProperty(inputBox, outputBox, "name");

  inputBox.placeholder = `Enter a ${inputBoxLabel.textContent}`;
  outputBox.placeholder = outputBoxLabel.textContent;
}

/**
 * 01001
 * 2*0 = 1
 * 2*2*2 = 8
 *
 */
function convertNumbers(e) {
  e.preventDefault();
  const inputNumber = inputBox.value;

  if (!inputNumber) return displayErrorMessage("This field is mandatory");

  const convertedNumber = convertBinaryToDecimal(inputNumber);
  outputBox.value = convertedNumber.toLocaleString("en-US");
}

/**
 * Input number must be a string
 *  */
function convertBinaryToDecimal(inputNumber) {
  const numberLength = inputNumber.length - 1;
  const BINARY_BASE = 2;
  let decimalNumber = 0;

  for (let i = 0; i <= numberLength; i++) {
    const inputNumberParsed = +inputNumber[i];
    if (inputNumberParsed === 0) continue;

    const squaredNumber = Math.pow(BINARY_BASE, numberLength - i);
    decimalNumber += squaredNumber;
  }

  return decimalNumber;
}

function clearInputs(e) {
  e.preventDefault();

  inputBox.value = "";
  outputBox.value = "";
}

function restrictBinaryInput(e) {
  hideErrorMessage();
  const currentConversion = inputBox.name;
  if (currentConversion !== "binary") return;

  const currentValue = e.target.value;
  const BINARY_REGEX = /^[01]*$/;
  const NON_BINARY_REGEX = /[^01]/g;

  if (BINARY_REGEX.test(currentValue)) return;

  // Remove non-binary numbers
  e.target.value = currentValue.replace(NON_BINARY_REGEX, "");
  displayErrorMessage("Insert a valid binary number (0-1 digits)");
}
