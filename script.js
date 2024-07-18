document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to load
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();
      // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Function to create a task element and add it to the task list
    function createTaskElement(taskText) {
        // Create a list item element for the task
        const list = document.createElement('li');
        list.textContent = taskText;
        const newBtn = document.createElement('button');
        newBtn.textContent = 'Remove 🗑️';
        newBtn.classList.add('remove-btn');

        newBtn.addEventListener('click', () => {
            list.remove();
            removeTaskFromLocalStorage(taskText); // Remove the task from localStorage
        });

        list.appendChild(newBtn);
        taskList.appendChild(list);
    }
    // Function to add a task to the task list
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert("Please enter a task");
            return;
        }

        createTaskElement(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = '';
    }

    function saveTaskToLocalStorage(taskText) { // Save the task to localStorage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the tasks to localStorage
    }
    // Function to remove a task from localStorage
    function removeTaskFromLocalStorage(taskText) { 
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); 
        const index = storedTasks.indexOf(taskText);
        if (index > -1) {
            storedTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save the tasks to localStorage
        }
    }

    addButton.addEventListener('click', addTask); // Add a task when the button is clicked
    // Add a task when the Enter key is pressed
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });
});
