function saveTasks(tasksArray) {
    try {
        localStorage.setItem('@@todo-app:tasks', JSON.stringify(tasksArray));
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
    }
}

function loadTasks() {
    const stored = localStorage.getItem('@@todo-app:tasks');
   
    if (!stored || stored === 'undefined' || stored === 'null') {
        return [];
    }
    
    try {
        return JSON.parse(stored);
    } catch (error) {
        console.error('Erro ao fazer parse das tarefas:', error);
        return [];
    }
}

function clearAllTasks() {
    try {
        localStorage.removeItem('@@todo-app:tasks');
    } catch (error) {
        console.error('Erro ao limpar tarefas:', error);
    }
}

export { saveTasks, loadTasks, clearAllTasks };