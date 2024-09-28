// src/test/taskService.test.js
import { taskService } from '../taskService.js'; // Ensure the correct path

describe('taskService', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  test('should add a task', () => {
    const task = { id: 1, title: 'Test Task', completed: false };
    taskService.addTask(task);
    
    const tasks = taskService.getTasks();
    expect(tasks).toContainEqual(task);
  });

  test('should edit a task', () => {
    const task = { id: 1, title: 'Test Task', completed: false };
    taskService.addTask(task);
    
    taskService.editTask(1, { title: 'Updated Task' });
    const updatedTask = taskService.getTasks().find(t => t.id === 1);
    
    expect(updatedTask.title).toBe('Updated Task');
  });

  test('should delete a task', () => {
    const task = { id: 1, title: 'Test Task', completed: false };
    taskService.addTask(task);
    
    taskService.deleteTask(1);
    const tasks = taskService.getTasks();
    
    expect(tasks).not.toContainEqual(task);
  });
});
