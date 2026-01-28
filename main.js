import { tasks, addTaskToArray, deleteTaskFromArray, toggleTaskStatus } from './js/task-service.js';
import { appConfig } from './js/app-config.js';

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');
const completedTaskList = document.getElementById('completedTaskList');

function render() {
    taskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    console.log('Estado atual das tarefas:', tasks.map(t => ({
        id: t.id,
        texto: t.text,
        concluida: t.completed
    })));

    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.className = 'task-item flex-grid';
        newTask.style.borderRadius = appConfig.branding.roundness;

        newTask.innerHTML = `
            <span class="task-text ${task.completed ? 'task-completed' : ''}">${task.text}</span>
            <div class="button-group">
                ${!task.completed ? `<button class="btn-complete task-btn" data-id="${task.id}">Completar</button>` : ''}
                <button class="btn-delete task-btn" data-id="${task.id}">Remover</button>
            </div>
        `;

        if (task.completed) {
            completedTaskList.appendChild(newTask);
        } else {
            taskList.appendChild(newTask);
        }
    });

    setupEventListeners();
}

function setupEventListeners() {
    
    // Botões de Deletar
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            deleteTaskFromArray(Number(btn.dataset.id));
            render();
        });
    });

    // Botões de Completar
    document.querySelectorAll('.btn-complete').forEach(btn => {
        btn.addEventListener('click', () => {
            if (appConfig.useExternalApi) {
                console.log('Enviando para API externa...');
            }
            toggleTaskStatus(Number(btn.dataset.id));
            render();
        });
    });
}

// Adicionar tarefa
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        addTaskToArray(text);
        taskInput.value = '';
        taskInput.focus();
        render();
    }
});

render();
