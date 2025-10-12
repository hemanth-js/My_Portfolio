const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTask');
const tasksContainer = document.getElementById('tasks');
const completedList = document.getElementById('completedList');
const clock = document.getElementById('clock');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentSort = 'date-asc';

function renderTasks() {
  tasksContainer.innerHTML = '';
  completedList.innerHTML = '';

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  let filteredTasks;
  if (currentFilter === 'completed') {
    filteredTasks = completedTasks.slice();
  } else {
    if (currentFilter === 'high') {
      filteredTasks = activeTasks.filter(t => t.priority === 'high');
    } else if (currentFilter === 'today') {
      const today = new Date().toDateString();
      filteredTasks = activeTasks.filter(t => t.dueDate && new Date(t.dueDate).toDateString() === today);
    } else {
      filteredTasks = activeTasks.slice();
    }
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 };
  if (currentSort === 'date-asc') {
    filteredTasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  } else if (currentSort === 'date-desc') {
    filteredTasks.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return -1;
      if (!b.dueDate) return 1;
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
  } else if (currentSort === 'priority') {
    filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  const priorityGroups = {};
  if (currentFilter !== 'completed') {
    priorityGroups.high = document.createElement('div');
    priorityGroups.medium = document.createElement('div');
    priorityGroups.low = document.createElement('div');

    Object.keys(priorityGroups).forEach(priority => {
      priorityGroups[priority].className = `priority-${priority}`;
      priorityGroups[priority].innerHTML = `<h3>${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</h3>`;
      tasksContainer.appendChild(priorityGroups[priority]);
    });
  }

  filteredTasks.forEach((task) => {
    const originalIndex = tasks.indexOf(task);
    const div = document.createElement('div');
    div.className = `task priority-${task.priority} ${task.completed ? 'completed' : ''}`;
    div.dataset.index = originalIndex;
    div.innerHTML = `
      <p>${task.text}</p>
      <p>${task.dueDate ? new Date(task.dueDate).toLocaleString() : ''}</p>
      <label><input type="checkbox" ${task.completed ? 'checked' : ''}> Done</label>
      ${task.completed ? '<button class="delete-btn">Delete</button>' : ''}
    `;
    const index = parseInt(div.dataset.index);
    div.querySelector('input').addEventListener('change', () => toggleComplete(index));
    if (task.completed) {
      div.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
      completedList.appendChild(div);
    } else {
      priorityGroups[task.priority].appendChild(div);
    }
  });

  // Always show all completed tasks in the completed section, except when filter is 'completed' (already shown above)
  if (currentFilter !== 'completed') {
    completedTasks.forEach((task) => {
      const originalIndex = tasks.indexOf(task);
      const div = document.createElement('div');
      div.className = `task priority-${task.priority} completed`;
      div.dataset.index = originalIndex;
      div.innerHTML = `
        <p>${task.text}</p>
        <p>${task.dueDate ? new Date(task.dueDate).toLocaleString() : ''}</p>
        <label><input type="checkbox" checked> Done</label>
        <button class="delete-btn">Delete</button>
      `;
      const index = parseInt(div.dataset.index);
      div.querySelector('input').addEventListener('change', () => toggleComplete(index));
      div.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
      completedList.appendChild(div);
    });
  }

  // Update active filter button
  document.querySelectorAll('.filters button').forEach(btn => {
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  if (!input.value.trim()) {
    return;
  }
  const task = {
    text: input.value,
    dueDate: document.getElementById('dueDate').value || null,
    priority: document.querySelector('input[name="priority"]:checked').value,
    completed: false
  };
  tasks.push(task);
  input.value = '';
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}

addBtn.addEventListener('click', addTask);

document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

document.getElementById('sort').addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderTasks();
});

setInterval(updateClock, 1000);
renderTasks();
updateClock();
