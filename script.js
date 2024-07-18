document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    function createTaskElement(taskText) {
        const list = document.createElement('li');
        list.textContent = taskText;
        const newBtn = document.createElement('button');
        newBtn.textContent = 'Remove 🗑️';
        newBtn.classList.add('remove-btn');

        newBtn.addEventListener('click', () => {
            list.remove();
            removeTaskFromLocalStorage(taskText);
        });

        list.appendChild(newBtn);
        taskList.appendChild(list);
    }

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

    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = storedTasks.indexOf(taskText);
        if (index > -1) {
            storedTasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });
});
