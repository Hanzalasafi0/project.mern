let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;

  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    priority: priority,
    completed: false,
  });

  taskInput.value = "";
  saveTasks();
}

function showTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " complete" : "");

    li.innerHTML = `
      <div class="left">
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete(${index})">
        <span>${task.text} (${task.priority})</span>
      </div>
      <div class="actions">
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="complete-btn" onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Done"}</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function editTask(index) {
  const newText = prompt("Update your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    saveTasks();
  }
}

function filterTasks(filter) {
  currentFilter = filter;
  showTasks();
}

showTasks(); // initial call