import { tasks, initializeTasks, addTaskToArray, deleteTaskFromArray, toggleTaskStatus } from './services/task-service';
import { AppConfig } from './services/app-config';
import { createHelpButton, createAdvancedEditSection } from './services/ui-service';
import { applyBrandingToCSS } from './services/branding-service';
import { Task } from './models/task.model';


// ===== ELEMENTOS DOM ======
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;
const completedTaskList = document.getElementById('completedTaskList') as HTMLUListElement;
const headerActions = document.getElementById('header-actions') as HTMLElement;
const advancedSection = document.getElementById('advanced-section') as HTMLElement;

// ===== INICIALIZAR FEATURES ======
function initializeFeatures(): void {
    if (AppConfig.features.helpButton) {
        createHelpButton(headerActions);
    }

    if (AppConfig.features.advancedEdit) {
        createAdvancedEditSection(advancedSection);
    }

    console.log('Features ativadas:', AppConfig.features);
}

// ===== RENDERIZAÇÃO / LÓGICA DE TAREFAS ======
function renderTasks(): void {
    taskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    tasks.forEach(task => {
        const newTask = document.createElement('li');
        newTask.className = 'task-item flex-grid';
        newTask.style.borderRadius = AppConfig.branding.roundness;

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

function setupEventListeners(): void {
    
    // Botões de Deletar
    document.querySelectorAll<HTMLButtonElement>('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            deleteTaskFromArray(Number(btn.dataset.id));
            renderTasks();
        });
    });

    // Botões de Completar
    document.querySelectorAll<HTMLButtonElement>('.btn-complete').forEach(btn => {
        btn.addEventListener('click', () => {
            if (AppConfig.features.useExternalApi) {
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
async function initializeApp(){
    console.log(`Iniciando To-Do List v${AppConfig.app.version}`);
    await initializeTasks();
    applyBrandingToCSS();
    initializeFeatures();
    renderTasks();
}

initializeApp();