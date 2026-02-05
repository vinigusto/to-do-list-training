import { } from './app-config';
import { Task } from '../models/task.model';

const STORAGE_KEY = '@@todo-app:tasks';

function saveTasks(tasksArray: Task[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksArray));
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
    }
}

function loadTasks(): Task[] {
    const stored = localStorage.getItem(STORAGE_KEY);
   
    if (!stored || stored === 'undefined' || stored === 'null') {
        return [];
    }
    
    try {
        const parsed: unknown = JSON.parse(stored);

        if (!Array.isArray(parsed)) {
            return [];
        }
        
        return parsed as Task[];
    } catch (error) {
        console.error('Erro ao fazer parse das tarefas:', error);
        return [];
    }
}

function clearAllTasks(): void {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Erro ao limpar tarefas:', error);
    }
}

export { saveTasks, loadTasks, clearAllTasks };