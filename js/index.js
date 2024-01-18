const inputBox = document.getElementById("inputValue");
const outputBox = document.getElementById("outputValue");
const submitButton = document.getElementById("buttonConvert");
const clearButton = document.getElementById("buttonClear");
const swapButton = document.getElementById("swapButton");

inputBox.addEventListener("focus", hideErrorMessage);
inputBox.addEventListener("input", restrictInputFormat);

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

  clearInputs();
  hideErrorMessage();
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

  const currentConversion = inputBox.name;
  const convertBinary = currentConversion === "binary";

  const convertedNumber = convertBinary
    ? convertBinaryToDecimal(inputNumber)
    : convertDecimalToBinary(+inputNumber);

  outputBox.value = convertedNumber;
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

  return decimalNumber.toLocaleString("en-US");
}

function convertDecimalToBinary(inputNumber) {
  let binaryString = "";

  while (inputNumber > 0) {
    const remainder = inputNumber % 2;
    binaryString = remainder + binaryString;
    inputNumber = Math.floor(inputNumber / 2);
  }

  return binaryString;
}

function clearInputs(e) {
  if (!!e) e.preventDefault();

  inputBox.value = "";
  outputBox.value = "";
}

function restrictInputFormat(e) {
  hideErrorMessage();
  const currentConversion = inputBox.name;

  const functionConfig = {
    binary: checkBinaryFormat,
    decimal: checkDecimalFormat,
  };

  const conversionFunction = functionConfig[currentConversion];
  conversionFunction(e);
}

function checkDecimalFormat(e) {
  const currentValue = e.target.value;
  const NUMBER_REGEX = /^-?\d*\.?\d+$/;
  const NON_NUMBER_REGEX = /[^0-9.-]/g;
  let formattedNumber = currentValue;

  if (!NUMBER_REGEX.test(currentValue)) {
    // Replace all non-numeric characters with an empty string
    formattedNumber = currentValue.replace(NON_NUMBER_REGEX, "");
    displayErrorMessage(
      "Insert a valid Decimal Number (Positive, Negative or a Decimal Number)"
    );
  }

  e.target.value = formattedNumber;
}

function checkBinaryFormat(e) {
  const currentValue = e.target.value;
  const BINARY_REGEX = /^[01]*$/;
  const NON_BINARY_REGEX = /[^01]/g;

  if (BINARY_REGEX.test(currentValue)) return;

  // Remove non-binary numbers
  e.target.value = currentValue.replace(NON_BINARY_REGEX, "");
  displayErrorMessage("Insert a valid binary number (0-1 digits)");
}
