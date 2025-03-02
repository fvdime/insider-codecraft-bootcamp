document.addEventListener('DOMContentLoaded', () => {
  console.log("Javascript is running");
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');
  const errorMessage = document.getElementById('errorMessage');
  const showCompleted = document.getElementById('showCompleted');
  const sortByPriority = document.getElementById('sortByPriority');

  console.log('error:', errorMessage);

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
    }
  });

  // Render Tasks
  function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';

    filteredTasks.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.className = `taskItem ${task.completed ? 'completed' : ''}`;

      // Task elements
      const taskContent = document.createElement('div');
      const taskTitle = document.createElement('h3');
      taskTitle.textContent = task.title;
      const taskDescription = document.createElement('p');
      taskDescription.textContent = task.description;
      const taskPriority = document.createElement('span');
      taskPriority.textContent = `Priority: ${task.priority}`;

      taskContent.appendChild(taskTitle);
      taskContent.appendChild(taskDescription);
      taskContent.appendChild(taskPriority);

      const taskActions = document.createElement('div');
      taskActions.className = 'actions';

      const completeButton = document.createElement('button');
      completeButton.className = 'complete';
      completeButton.textContent = task.completed ? 'Undo' : 'Complete';
      completeButton.setAttribute('data-id', task.id);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('data-id', task.id);

      taskActions.appendChild(completeButton);
      taskActions.appendChild(deleteButton);

      taskItem.appendChild(taskContent);
      taskItem.appendChild(taskActions);

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

  // Sort by Priority
  sortByPriority.addEventListener('click', () => {
    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    const sortedTasks = tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    renderTasks(sortedTasks);
  });
});