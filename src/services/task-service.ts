import { saveTasks, loadTasks } from './storage-service';
import { apiService } from './api-service';
import { AppConfig } from './app-config';
import { Task } from '../models/task.model';
import { ApiTask } from '../models/api-task.model';
import { mapApiTaskToTask } from '../mappers/task.mapper';

export const tasks: Task[] = [];

export async function initializeTasks(): Promise<void> {
    const initialTasks: Task[] = [];
    if(AppConfig.features.useExternalApi) {
        try {
            const apiTasks = await apiService.fetchTasks();
            initialTasks.push(...apiTasks);
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

export function addTaskToArray(text: string): Task | undefined {
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

export function deleteTaskFromArray(id: number): 0 | 1 {
    const index = tasks.findIndex(task => task.id === id);

    if (index > -1) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        return 1;
    }

    return 0;
}

export function toggleTaskStatus(id: number): 0 | 1 {
    const task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        return 1;
    }

    return 0;
}

export function getTasks(): Task[] {
    return tasks;
}

export function clearTasks(): void {
    tasks.length = 0;
    saveTasks(tasks);
}