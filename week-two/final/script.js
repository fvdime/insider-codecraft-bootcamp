document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const errorMessage = document.getElementById('errorMessage');
  const showCompleted = document.getElementById('showCompleted');
  const sortByPriority = document.getElementById('sortByPriority');

  let tasks = [];

  // Add Task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
      const title = document.getElementById('taskTitle').value.trim();
      const description = document.getElementById('taskDescription').value.trim();
      const priority = document.querySelector('input[name="priority"]:checked')?.value;

      if (!title) {
        throw new Error('Task title is required.');
      }
      if (!priority) {
        throw new Error('Priority is required.');
      }

      const task = {
        id: Date.now(),
        title,
        description,
        priority,
        completed: false,
      };

      tasks.push(task);
      renderTasks();
      taskForm.reset();
      errorMessage.textContent = '';
    } catch (error) {
      console.error("CATCH ERROR", error);
      errorMessage.textContent = error.message;
      errorMessage.style.display = 'block';
    }
  });

  // Render Tasks
  function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.className = `taskItem ${task.completed ? 'completed' : ''}`;
      taskItem.innerHTML = `
        <div>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <span>Priority: ${task.priority}</span>
        </div>
        <div class="actions">
          <button class="complete" data-id="${task.id}">${task.completed ? 'Undo' : 'Complete'}</button>
          <button class="delete" data-id="${task.id}">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }

  // Complete and Delete
  taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('complete')) {
      const taskId = parseInt(e.target.getAttribute('data-id'));
      const task = tasks.find((t) => t.id === taskId);
      task.completed = !task.completed;
      renderTasks();
    } else if (e.target.classList.contains('delete')) {
      const taskId = parseInt(e.target.getAttribute('data-id'));
      tasks = tasks.filter((t) => t.id !== taskId);
      renderTasks();
    }
  });

  // Show Only Completed Tasks
  showCompleted.addEventListener('click', () => {
    const completedTasks = tasks.filter((task) => task.completed);
    renderTasks(completedTasks);
  });

  // Priority
  sortByPriority.addEventListener('click', () => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    const sortedTasks = tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    renderTasks(sortedTasks);
  });
});