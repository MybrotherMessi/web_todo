const toDoForm = document.querySelector(".js-todoForm"),
  toDoList = document.querySelector(".js-todoList"),
  toDoInput = document.querySelector(".js-input");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
  const button = event.target;
  const li = button.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDo;
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function submitHandle(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const delBtnText = document.createTextNode("X");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  toDoList.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(span);
  delBtn.appendChild(delBtnText);
  span.innerText = text;
  delBtn.addEventListener("click", deleteToDo);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDo();
}

function loadToDo() {
  const loadedToDo = localStorage.getItem(TODOS_LS);
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", submitHandle);
}

init();
