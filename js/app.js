const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const completeTaskList = document.getElementById('completedTaskList');

function addTask() {
    const taskText = taskInput.value.trim();
    
    if(taskText !== '') {
        const newTask = document.createElement('li');
        newTask.className = 'task-item';
        newTask.classList.add('flex-grid');

        const taskTextSpan = document.createElement('span');
        taskTextSpan.innerText = taskText;
        taskTextSpan.className = 'task-text';

        const btnContainer = document.createElement('div');
        btnContainer.className = 'button-group';

        const deleteBtn = createDeleteButton();
        const completeBtn = createCompleteButton();

        btnContainer.appendChild(deleteBtn);
        btnContainer.appendChild(completeBtn);
        
        newTask.appendChild(taskTextSpan);
        newTask.appendChild(btnContainer);
        taskList.appendChild(newTask);

        taskInput.value = '';
        taskInput.focus();
    }
}

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-delete');
    deleteButton.classList.add('btn-task');
    deleteButton.innerText = 'Remover';

    deleteButton.addEventListener('click', () => {
        const li = deleteButton.closest('li');
        const list = li?.parentElement;
        if(!li || !list) return;
        list.removeChild(li);
    });

    return deleteButton;
}

function createCompleteButton() {
    const completeButton = document.createElement('button');
    completeButton.classList.add('btn-complete');
    completeButton.classList.add('btn-task');
    completeButton.innerText = 'Completar';

    completeButton.addEventListener('click', () => {
        const li = completeButton.closest('li');
        if (!li || !completeTaskList) return;

        completeTaskList.appendChild(li);
        completeButton.remove();
    });

    return completeButton;
}

addTaskBtn.addEventListener('click', () => {
    addTask();
});

