export let tasks = [];

export function addTaskToArray(text) {
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    return newTask;
}

export function deleteTaskFromArray(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
    }
}

export function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
    }
}