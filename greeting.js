const greetingForm = document.querySelector(".js-greetingForm"),
  greetingInput = document.querySelector(".js-greetingInput"),
  greetingText = document.querySelector(".js-greeting"),
  nameQuestion = document.querySelector(".nameQuestion");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function submitHandle(event) {
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintName(currentValue);
  saveName(currentValue);
}

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
  nameQuestion.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", submitHandle);
}

function paintName(text) {
  nameQuestion.classList.remove(SHOWING_CN);
  greetingForm.classList.remove(SHOWING_CN);
  greetingText.classList.add(SHOWING_CN);
  greetingText.innerText = `Hello, ${text}`;
  greetingText.classList.add("greetingText");
}

function loadName() {
  const loadedName = localStorage.getItem(USER_LS);
  if (loadedName === null) {
    askForName();
  } else {
    paintName(loadedName);
  }
}

function init() {
  loadName();
}

init();
