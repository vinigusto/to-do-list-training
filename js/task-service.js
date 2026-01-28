import { saveTasks, loadTasks } from './storage-service.js';

export let tasks = loadTasks();

export function addTaskToArray(text) {
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
    }
}

export function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
    }
}