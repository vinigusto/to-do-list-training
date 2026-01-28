import { tasks, addTaskToArray, deleteTaskFromArray, toggleTaskStatus } from './js/task-service.js';
import { appConfig } from './js/app-config.js';
import { createHelpButton, createAdvancedEditSection } from './js/ui-service.js';

// ===== ELEMENTOS DOM ======
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
const headerActions = document.getElementById('header-actions');
const advancedSection = document.getElementById('advanced-section');

// ===== INICIALIZAR FEATURES ======
function initializeFeatures() {
    if (appConfig.features.helpButton) {
        createHelpButton(headerActions);
    }

    if (appConfig.features.advancedEdit) {
        createAdvancedEditSection(advancedSection);
    }

    console.log('Features ativadas:', appConfig.features);
}

// ===== RENDERIZAÇÃO / LÓGICA DE TAREFAS ======

function renderTasks() {
    taskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.className = 'task-item flex-grid';
        newTask.style.borderRadius = appConfig.branding.roundness;

        newTask.innerHTML = `
            <span class="task-text ${task.completed ? 'task-completed' : ''}">${task.text}</span>
            <div class="button-group">
                ${!task.completed ? `<button class="btn btn-complete task-btn" data-id="${task.id}">Completar</button>` : ''}
                <button class="btn btn-delete task-btn" data-id="${task.id}">Remover</button>
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
            renderTasks();
        });
    });

    // Botões de Completar
    document.querySelectorAll('.btn-complete').forEach(btn => {
        btn.addEventListener('click', () => {
            if (appConfig.useExternalApi) {
                console.log('Enviando para API externa...');
            }
            toggleTaskStatus(Number(btn.dataset.id));
            renderTasks();
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
        renderTasks();
    }
});

// ===== INICIALIZAÇÃO ======
initializeFeatures();
renderTasks();
