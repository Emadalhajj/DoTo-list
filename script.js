// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const notification = document.getElementById('notification');

// Events
document.addEventListener('DOMContentLoaded', getTasksFromLocalS); //  loadTasksFromLocalStorage
taskForm.addEventListener('submit', addTask);
// taskList.addEventListener('click', deletebtn);
// taskList.addEventListener('click', editbtn);

taskList.addEventListener('click', handleTaskActions);

// Add Task
function addTask(event) {
    event.preventDefault(); //deny the defualte bev

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    createTaskElement(taskText); 
    saveTaskInLocalStorage(taskText); 

    taskInput.value = ''; // بعد الاضافة اتركه فاضي
    showNotification('Task added successfully');
}

// Create New Task Element
function createTaskElement(taskText) {
    const li = document.createElement('li');

    // Task Text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';
    li.appendChild(editBtn);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    li.appendChild(deleteBtn);

    // Checkbox
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('checkBox');
    checkBox.addEventListener('click', () => {
        const message = checkBox.checked ? 'Task is done' : 'Task is not yet done';
        showNotification(message);
    });
    li.appendChild(checkBox);

    taskList.appendChild(li); //addition
}

// Handle Task Actions (Edit/Delete)
function handleTaskActions(e) {
    const taskItem = e.target.closest('li');

    if (e.target.classList.contains('delete-btn')) {
        deleteTask(taskItem);
    } else if (e.target.classList.contains('edit-btn')) {
        enableEditMode(taskItem);
    } else if (e.target.classList.contains('save-btn')) {
        saveTask(taskItem);
    } else if (e.target.classList.contains('cancel-btn')) {
        cancelEdit(taskItem);
    }

    // console.log(taskItem);
    
}

// Enable Edit Mode
function enableEditMode(taskItem) {
    const taskSpan = taskItem.querySelector('span');
    const originalText = taskSpan.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalText;
    taskItem.insertBefore(input, taskSpan);
    taskSpan.style.display = 'none';

    toggleActionButtons(taskItem, false); //
    // console.log(originalText);
    
    const saveBtn = createButton('save-btn', 'Save');
    const cancelBtn = createButton('cancel-btn', 'Cancel');

    taskItem.append(saveBtn, cancelBtn);

}

// Save Edited Task
function saveTask(taskItem) {
    const input = taskItem.querySelector('input');
    const taskSpan = taskItem.querySelector('span');

    if (input.value.trim()) {
        const oldText = taskSpan.textContent;
        const newText = input.value.trim();

        taskSpan.textContent = newText;
        updateTaskInLocalS(oldText, newText); //updateTaskInLocalStorage
    }

    cancelEdit(taskItem); // إعادة العناصر الأساسية
}

// Cancel Edit Mode
function cancelEdit(taskItem) {
    const input = taskItem.querySelector('input');
    const taskSpan = taskItem.querySelector('span');

    taskSpan.style.display = 'inline';
    input.remove();

    toggleActionButtons(taskItem, true); // إظهار أزرار التعديل والحذف

    taskItem.querySelector('.save-btn').remove();
    taskItem.querySelector('.cancel-btn').remove();
}

// Delete Task **remove Task From LocalStorage
function deleteTask(taskItem) {
    const taskText = taskItem.querySelector('span').textContent;
    removingTaskfromLocalS(taskText);  //
    taskItem.remove();
    showNotification('Task deleted successfully');
}

// Toggle Edit/Delete Buttons
function toggleActionButtons(taskItem, show) {
    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const display = show ? 'inline' : 'none';

    editBtn.style.display = display;
    deleteBtn.style.display = display;
}

// Create Button Helper
function createButton(className, textContent) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = textContent;
    return button;
}

// Local Storage: Save Task
function saveTaskInLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Local Storage: Update Task
function updateTaskInLocalS(oldTask, newTask) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskIndex = tasks.indexOf(oldTask);

    if (taskIndex !== -1) {
        tasks[taskIndex] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Local Storage: Remove Task
function removingTaskfromLocalS(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// / function delTaskFromLocalS(taskToDelete) {
    //     let tasks = JSON.parse(localStorage.getItem('tasks'));
    
    //     tasks = tasks.filter(task => task !== taskToDelete);
    
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }


// Load Tasks from Local Storage on Page Load
function getTasksFromLocalS() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}

// Show Notification
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}
