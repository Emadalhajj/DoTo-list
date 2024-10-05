
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const notification = document.getElementById('notification');

// Events
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
document.addEventListener('DOMContentLoaded', getTasksFromLocalS); //



// Add Task
function addTask(event) {
    event.preventDefault(); //for denay default behaviar
    
    // Get input value
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    // Create new task element
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    // Create checkBox
    const checkBox = document.createElement('input')
    checkBox.type='checkbox'
  
    checkBox.classList.add('checkBox')
    // dd notification for done task
    checkBox.addEventListener('click', () => {
        if(checkBox.checked){
            showNotification('Task is done');
        } else{
            showNotification ('Task is not yet done')
        }
        
    });
    li.appendChild(checkBox)
    
    // Add task to the list
    taskList.appendChild(li);

    // Save to localStorage
    saveTaskinLocalS(taskText); //saveTaskToLocalStorage

    // Clear input
    taskInput.value = '';

    // Show notification
    showNotification('Task added successfully');
}

// Delete Task
function deleteTask(e) {
    if (e.target.classList.contains('delete-btn')) {
        const task = e.target.parentElement;

        // Remove task from localStorage // 
        delTaskFromLocalS(task.textContent.replace('Delete', '').trim());

        // Remove task from DOM
        task.remove();

        // Show notification
        showNotification('Task deleted successfully');
    }
}

// Save task to localStorage
function saveTaskinLocalS(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function getTasksFromLocalS() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        const checkBox = document.createElement('input')
        checkBox.type='checkbox'
        checkBox.classList.add('checkBox')
        li.appendChild(checkBox)
    
        taskList.appendChild(li);
    });
}

// Remove task from localStorage
function delTaskFromLocalS(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks = tasks.filter(task => task !== taskToDelete);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
//hidden the message after 2 minits
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}
