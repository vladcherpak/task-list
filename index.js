const list = document.querySelector(".list");
const input = document.querySelector(".input");
const btn = document.querySelector(".btn");

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const currentTask = localStorage.getItem("task");
  if (currentTask) {
    console.log(currentTask, "таски в локал сторежі");
    tasks = JSON.parse(currentTask);
    renderTodo(tasks);
  }
});

console.log(tasks);

const renderTodo = (items) => {
  const marcup = items
    .map((item) => {
      return `<li>
      <label class="label">
      <input type="checkbox" class="ckeckbox" onchange="toggleTask(${
        item.id
      })" ${item.completed ? "checked" : ""} />
      </label>
      <p class="${item.completed ? "completed" : ""}" >${item.text}</p>
      <button class="libtn" onclick="removeTodo(${item.id})">Видалити</button>
      </li>`;
    })
    .join("");
  list.innerHTML = marcup;
};
const toggleTask = (id) => {
  // const taskIndex = tasks.findIndex((item) => item.id===id)
  // tasks[taskIndex].completed = !tasks[taskIndex].completed
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTodo(tasks);
  localStorage.setItem("task", JSON.stringify(tasks));
};


const todoHandler = () => {
  if (input.value.trim() !== "") {
    const dataText = input.value;
    const rundomNumber = Math.round(Math.random() * 100000);
    const task = {
      id: rundomNumber,
      text: dataText,
      completed: false,
    };
    tasks.push(task);
    console.log(task);
    input.value = "";
    console.log(JSON.stringify(tasks));
    localStorage.setItem("task", JSON.stringify(tasks));
  }
};

console.log();

btn.addEventListener("click", (event) => {
  event.preventDefault();
  todoHandler();
  renderTodo(tasks);
  const newtask = list;
  localStorage.setItem("newtask", JSON.stringify(newtask)); //переводимо обєкт в стрічку
});

window.removeTodo = function (id) {
  const filteredTasks = tasks.filter((item) => item.id !== id);
  tasks = filteredTasks;
  renderTodo(tasks);
  localStorage.setItem("task", JSON.stringify(tasks));
};

