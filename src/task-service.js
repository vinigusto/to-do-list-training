import { saveTasks, loadTasks } from './storage-service.js';
import { apiService } from './api-service.js';
import { appConfig } from './app-config.js';

export const tasks = [];

export async function initializeTasks() {
    const initialTasks = [];
    if(appConfig.features.useExternalApi) {
        try {
            const apiTasks = await apiService.fetchTasks();
            initialTasks.push(...apiTasks.map(task => ({
                id: task.id,
                text: task.todo ?? task.title ?? 'Tarefa sem descrição',
                completed: task.completed
            })));
        } catch (error) {
            console.error('Erro ao buscar tarefas da API externa:', error);
            const storedTasks = loadTasks();
            initialTasks.push(...storedTasks);
        }
    } else {
        const storedTasks = loadTasks();
        initialTasks.push(...storedTasks);
    }
    tasks.push(...initialTasks);
    saveTasks(tasks);
}

export function addTaskToArray(text) {
    if (!text || text.trim() === '') {
        return undefined;
    }
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);

    return newTask;
}

export function deleteTaskFromArray(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        return 1;
    }
    return 0;
}

export function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        return 1;
    }
    return 0;
}

export function getTasks() {
    return tasks;
}

export function clearTasks() {
    tasks.length = 0;
    saveTasks(tasks);
}