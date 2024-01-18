const errorMsg = document.getElementById("errorMessage");

function displayErrorMessage(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
}

function hideErrorMessage() {
  errorMsg.textContent = "";
  errorMsg.style.display = "none";
}

function swapProperty(item1, item2, key) {
  let temp = item1[key];
  item1[key] = item2[key];
  item2[key] = temp;
}
