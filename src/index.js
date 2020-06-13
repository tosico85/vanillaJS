// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const clock = document.querySelector(".js-clock");
const nameBox = document.querySelector(".name"),
  noSaveBox = nameBox.querySelector(".name__no-save"),
  nameForm = noSaveBox.querySelector(".name__form"),
  nameInput = noSaveBox.querySelector(".js-name-input"),
  savedBox = nameBox.querySelector(".name__saved"),
  greetText = savedBox.querySelector(".js-greet");
const todoBox = document.querySelector(".todo"),
  todoForm = todoBox.querySelector(".js-form"),
  todoInput = todoForm.querySelector(".js-todo-input");
const todoUl = document.querySelector(".js-todolist");
const bgImage = document.querySelector(".background");

const NAME = "NAME";
const TASK_LIST = "TASKS";

let tasks = [];

const funcLS = {
  getLocalStorage(key) {
    return localStorage.getItem(key);
  },
  setLocalStorage(key, val) {
    localStorage.setItem(key, val);
  },
  getLocalStorageObj(key) {
    const val = localStorage.getItem(key);
    let result = [];
    if (val != null) {
      result = JSON.parse(val);
    }
    return result;
  },
  setLocalStorageObj(key, val) {
    let convVal = val;
    if (typeof val === "object") {
      convVal = JSON.stringify(val);
    }
    localStorage.setItem(key, convVal);
  },
};

function paintTasks() {
  tasks.forEach((item) => {
    paintTaskItem(item.text, item.id);
  });
}

function paintTaskItem(value, id) {
  const li = document.createElement("li");
  li.innerHTML = `<span>${value}</span> `;
  li.id = id;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", handleDeleteItem);
  li.appendChild(deleteBtn);

  todoUl.appendChild(li);
}

function handleDeleteItem(e) {
  e.preventDefault();
  const li = e.target.parentNode;
  const ul = li.parentNode;
  removeTask({ id: li.id });
  ul.removeChild(li);
}

function handleSubmit(e) {
  e.preventDefault();
  if (todoInput.value !== "") {
    const id = Date.now().toString();
    const item = { text: todoInput.value, id };
    addTask(item);
    paintTaskItem(item.text, item.id);
    todoInput.value = "";
  }
}

function addTask(addItem) {
  tasks.push(addItem);
  updateLocalStorage();
}

function removeTask(removeItem) {
  tasks = tasks.filter((item) => item.id !== removeItem.id);
  updateLocalStorage();
}

function updateLocalStorage() {
  funcLS.setLocalStorageObj(TASK_LIST, tasks);
}

function loadTasks() {
  tasks = funcLS.getLocalStorageObj(TASK_LIST);
  paintTasks();
}

function loadName() {
  const name = funcLS.getLocalStorage(NAME);
  noSaveBox.style.display = name == null ? "block" : "none";
  savedBox.style.display = name == null ? "none" : "block";
  todoBox.style.display = name == null ? "none" : "block";

  if (name !== null) {
    greetText.innerText = `Hello ${name}!`;
  }
}

function handleNameInput(e) {
  e.preventDefault();
  if (nameInput.value !== "") {
    funcLS.setLocalStorage(NAME, nameInput.value);
    loadName();
  }
}

function format2Number(number) {
  const result = number < 10 ? "0" + number : number;
  return `${result}`;
}

function loadTime() {
  const date = new Date();
  clock.innerText = `${format2Number(date.getHours())}:${format2Number(
    date.getMinutes()
  )}:${format2Number(date.getSeconds())}`;
}

function loadBackground() {
  const randImage = document.createElement("img");
  const imageName = Math.ceil(Math.random() * 5);
  randImage.src = `images/image${imageName}.jpg`;
  bgImage.appendChild(randImage);
}

function init() {
  //Time
  setInterval(loadTime, 1000);

  //Name
  loadName();
  nameForm.addEventListener("submit", handleNameInput);

  //tasks
  loadTasks();
  todoForm.addEventListener("submit", handleSubmit);

  //Bacground
  loadBackground();
}
init();
