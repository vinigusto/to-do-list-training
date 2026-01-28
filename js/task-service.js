import { saveTasks, loadTasks } from './storage-service.js';

export let tasks = loadTasks();

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
}