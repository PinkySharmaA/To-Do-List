document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskTime = document.getElementById('taskTime');
    const taskList = document.getElementById('taskList');
    const clearBtn = document.getElementById('clearBtn');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.className = 'task-item' + (task.completed ? ' completed' : '');
            li.innerHTML = `
                <span>${task.title}</span>
                <span>${task.time}</span>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add new task
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = taskInput.value.trim();
        const time = taskTime.value.trim();
        if (title !== '') {
            tasks.push({ title, time, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
            taskTime.value = '';
        }
    });

    // Toggle task completion
    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'SPAN') {
            const index = event.target.parentElement.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }
    });

    // Delete task
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    // Clear completed tasks
    clearBtn.addEventListener('click', function() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    });

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
