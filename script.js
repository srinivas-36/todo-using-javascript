let tasks = [];
let editIndex;


function addTask() {
  const taskInput = document.getElementById('taskInput');
  const task = taskInput.value.trim();
  if (task !== '') {
    tasks.push({ name: task, completed: false });
    renderTasks();
    taskInput.value = '';
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  editIndex = index;
//   const editTaskHeading = document.getElementById('editTaskHeading');
//   editTaskHeading.textContent = tasks[index].name;
  document.getElementById('editedTaskInput').value = tasks[index].name;
  document.getElementById('editPopup').style.display = 'block';
}

function updateTask() {
  const editedTaskInput = document.getElementById('editedTaskInput').value.trim();
  if (editedTaskInput !== '') {
    tasks[editIndex].name = editedTaskInput;
    renderTasks();
    closeEditPopup();
  }
}

function closeEditPopup() {
  document.getElementById('editPopup').style.display = 'none';
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }
  
  function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');
    const noTasksMessage = document.getElementById('noTasksMessage');
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
  
    if (tasks.length === 0) {
      noTasksMessage.textContent = 'No todos are available';
      noTasksMessage.style.display = 'block';
      return;
    } else {
      noTasksMessage.style.display = 'none';
    }
  
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleTask(index));
  
      const taskName = document.createElement('span');
      taskName.textContent = task.name;
      taskName.addEventListener('dblclick', () => editTask(index));
      if (task.completed) {
        taskName.classList.add('completed');
      }
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'edit'; // Add the class "edit"
      editButton.addEventListener('click', () => editTask(index));
  
      const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.className = 'delete'; // Add the class "delete"
deleteButton.addEventListener('click', () => deleteTask(index));

  
      li.appendChild(checkbox);
      li.appendChild(taskName);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
  
      if (task.completed) {
        completedTasksList.appendChild(li);
      } else {
        pendingTasksList.appendChild(li);
      }
    });
  }
  
  renderTasks();
  