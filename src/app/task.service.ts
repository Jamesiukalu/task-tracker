import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: { [key:string]: any[] } = {
    open: [
      { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-02-01' },
      { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-02-03' },
    ],
    pending: [
      { id: 3, title: 'Task 3', description: 'Description 3', dueDate: '2024-02-05' },
      { id: 4, title: 'Task 4', description: 'Description 4', dueDate: '2024-02-07' },
    ],
    inProgress: [
      { id: 5, title: 'Task 5', description: 'Description 5', dueDate: '2024-02-10' },
      { id: 6, title: 'Task 6', description: 'Description 6', dueDate: '2024-02-12' },
    ],
    completed: [
      { id: 7, title: 'Task 7', description: 'Description 7', dueDate: '2024-02-15' },
      { id: 8, title: 'Task 8', description: 'Description 8', dueDate: '2024-02-18' },
    ],
  };
  private draggedTask: { column: string, taskId: number } | null = null;


  getTasks(column: string): any[] {
    return this.tasks[column.toLowerCase()]; // Use lowercase since your columns are in lowercase
  }


  addTask(column: string, task: any): void {
    task.id = this.generateUniqueId();
    this.tasks[column].push(task);
  }

  editTask(column: string, taskId: number, updatedTask: any): void {
    const index = this.tasks[column].findIndex((task: any) => task.id === taskId);
    if (index !== -1) {
      this.tasks[column][index] = { ...this.tasks[column][index], ...updatedTask };
    }
  }

  deleteTask(column: string, taskId: number): void {
    this.tasks[column] = this.tasks[column].filter((task: any) => task.id !== taskId);
  }

  moveTask(sourceColumn: string, destinationColumn: string, taskId: number): void {
    const taskToMove = this.tasks[sourceColumn].find((task: any) => task.id === taskId);
    if (taskToMove) {
      this.tasks[sourceColumn] = this.tasks[sourceColumn].filter((task: any) => task.id !== taskId);
      this.tasks[destinationColumn].push(taskToMove);
    }
  }
  setDraggedTask(task: any): void {
    this.draggedTask = { column: this.getOriginalColumn(task), taskId: task.id };
  }
  getOriginalColumn(task: any): string {
    throw new Error('Method not implemented.');
  }

  getDraggedTask(): { column: string, taskId: number } | null {
    return this.draggedTask;
  }

  clearDraggedTask(): void {
    this.draggedTask = null;
  }

  private generateUniqueId(): number {
    // Generate a unique ID (you might want to use a more robust solution in a real application)
    return Math.floor(Math.random() * 1000);
  }



}
