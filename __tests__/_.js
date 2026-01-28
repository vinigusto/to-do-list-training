// MOCK do serviço de armazenamento
jest.mock('../js/storage-service.js', () => ({
  saveTasks: jest.fn(),
  loadTasks: jest.fn(() => [])
}));

import { saveTasks, loadTasks } from '../js/storage-service.js';
import {
  addTaskToArray,
  deleteTaskFromArray,
  toggleTaskStatus,
  getTasks,
  clearTasks
} from '../js/task-service.js';

// TESTES UNITÁRIOS
describe('task-service', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    clearTasks();
  });

  describe('addTaskToArray', () => {
    test('Quando adiciono uma tarefa com texto "Estudar Jest"', () => {
      const taskText = "Estudar Jest";
      const newTask = addTaskToArray(taskText);

      expect(newTask).toEqual({
        id: expect.any(Number),
        text: taskText,
        completed: false
      });

      expect(saveTasks).toHaveBeenCalledTimes(1);

      // Verifica o array que foi passado para saveTasks
      const savedArray = saveTasks.mock.calls[0][0];
      expect(savedArray.length).toBe(1);
      expect(savedArray[0]).toEqual(newTask);
    }),

      test('Quando adiciono uma tarefa com texto vazio', () => {
        const taskText = "";
        const newTask = addTaskToArray(taskText);
        const tasks = getTasks();

        expect(tasks.length).toBe(0);
        expect(newTask).toBeUndefined();
        expect(saveTasks).not.toHaveBeenCalled();
      }),

      test('Quando adiciono texto só com espaços', () => {
        const newTask = addTaskToArray("   ");
        expect(newTask).toBeUndefined();
        expect(saveTasks).not.toHaveBeenCalled();
      });
  });

  describe('deleteTaskFromArray', () => {
    test('Quando deleto uma tarefa existente', () => {
      const taskText = "Tarefa para deletar";
      const newTask = addTaskToArray(taskText);
      const deleteResult = deleteTaskFromArray(newTask.id);
      const tasks = getTasks();

      expect(deleteResult).toBe(1);
      expect(tasks.length).toBe(0);
      expect(saveTasks).toHaveBeenCalledTimes(2);
    }),

      test('Quando tento deletar uma tarefa com ID inexistente', () => {
        const taskText = "Tarefa existente";
        const newTask = addTaskToArray(taskText);
        const deleteResult = deleteTaskFromArray(999999);
        const tasks = getTasks();

        expect(deleteResult).toBe(0);
        expect(tasks.length).toBe(1);
        expect(saveTasks).toHaveBeenCalledTimes(1);
      }),

      test('Quando tento deletar de um array vazio', () => {
        const tasks = getTasks();
        expect(tasks.length).toBe(0);

        const deleteResult = deleteTaskFromArray(123456);
        expect(deleteResult).toBe(0);
        expect(saveTasks).not.toHaveBeenCalled();
      });
  });

  describe('toggleTaskStatus', () => {

    let taskId;
      
    beforeEach(() => {
      const task = addTaskToArray("Task");
      taskId = task.id;
      jest.clearAllMocks(); // limpa contadores após setup
    });    

    test('Quando altero o status de uma tarefa existente para completa', () => {
      toggleTaskStatus(taskId);
      expect(getTasks()[0].completed).toBe(true);
    }),

      test('Quando tento alternar status de uma tarefa inexistente', () => {
        const toggleResult = toggleTaskStatus(999);
        expect(toggleResult).toBe(0);
        expect(saveTasks).not.toHaveBeenCalled();
      }),

      test('Quando desmarco uma tarefa completa', () => {
        const newTask = addTaskToArray("Tarefa");
        toggleTaskStatus(newTask.id);
        const toggleResult = toggleTaskStatus(newTask.id);
        const tasks = getTasks();

        expect(toggleResult).toBe(1);
        expect(tasks[0].completed).toBe(false);
        expect(saveTasks).toHaveBeenCalledTimes(3);
      });
  });

  describe('getTasks', () => {
    test('Quando busco tarefas em um array vazio', () => {
      const tasks = getTasks();
      expect(tasks.length).toBe(0);
    }),

      test('Quando busco tarefas com itens no array', () => {
        const newTask1 = addTaskToArray("Tarefa 1");
        const newTask2 = addTaskToArray("Tarefa 2");
        const newTask3 = addTaskToArray("Tarefa 3");

        const tasks = getTasks();

        expect(tasks.length).toBe(3);
        expect(tasks).toEqual([newTask1, newTask2, newTask3]);
        expect(saveTasks).toHaveBeenCalledTimes(3);

      });
  });

  describe('clearTasks', () => {
    test('Quando limpo um array com tarefas', () => {
      const newTask1 = addTaskToArray("Tarefa 1");
      const newTask2 = addTaskToArray("Tarefa 2");
      const newTask3 = addTaskToArray("Tarefa 3");

      const tasks = getTasks();
      expect(tasks.length).toBe(3);
      clearTasks();

      expect(saveTasks).toHaveBeenCalledTimes(3);
      expect(tasks.length).toBe(0);
    }),

      test('Quando limpo um array já vazio', () => {
        const tasks = getTasks();
        expect(tasks.length).toBe(0);
        clearTasks();
        expect(saveTasks).not.toHaveBeenCalled();
      });
  });

});