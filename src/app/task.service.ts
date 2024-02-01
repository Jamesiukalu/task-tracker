import { Injectable } from '@angular/core';
import { tasksDummyData } from './dummyData/tasks-dummy-data';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: { [key: string]: any[] } = tasksDummyData;
  private draggedTask: { column: string; taskId: number } | null = null;
  private columns: string[] = ['open', 'pending', 'inprogress', 'completed'];

  getTasks(column: string): any[] {
    return this.tasks[column.toLowerCase()] || []; // Use lowercase since your columns are in lowercase
  }

  addTask(column: string, task: any): void {
    task.id = this.generateUniqueId();
    this.tasks[column].push(task);
  }

  editTask(column: string, taskId: number, updatedTask: any): void {
    const index = this.tasks[column].findIndex(
      (task: any) => task.id === taskId
    );
    if (index !== -1) {
      this.tasks[column][index] = {
        ...this.tasks[column][index],
        ...updatedTask,
      };
    }
  }

  updateTaskLocally(taskId: number, updatedTask: any): void {
    const column = this.getColumnForTask(taskId);
    const taskIndex = this.tasks[column].findIndex(
      (task: any) => task.id === taskId
    );

    if (taskIndex !== -1) {
      // Update the task in-memory
      this.tasks[column][taskIndex] = {
        ...this.tasks[column][taskIndex],
        ...updatedTask,
      };
    }
  }

  getColumnForTask(taskId: number): string {
    if (!this.tasks) {
      return '';
    }

    const column = Object.keys(this.tasks).find((key) => {
      const tasksForKey = this.tasks[key];
      return (
        tasksForKey &&
        tasksForKey.findIndex((task: any) => task.id === taskId) !== -1
      );
    });

    return column || '';
  }

  deleteTask(column: string, taskId: number): void {
    this.tasks[column] = this.tasks[column].filter(
      (task: any) => task.id !== taskId
    );
  }

  moveTask(sourceColumn: string, destinationColumn: string, taskId: number) {
    // Convert column names to lowercase
    sourceColumn = sourceColumn.toLowerCase();
    destinationColumn = destinationColumn.toLowerCase();

    const sourceTasks = this.tasks[sourceColumn];
    let destinationTasks = this.tasks[destinationColumn];

    if (!sourceTasks || !destinationTasks) {
      return;
    }

    const taskIndex = sourceTasks.findIndex((task: any) => task.id === taskId);

    if (taskIndex !== -1) {
      const [movedTask] = sourceTasks.splice(taskIndex, 1);

      // Ensure destinationTasks is initialized
      if (!destinationTasks) {
        // If destinationTasks is not defined, create an empty array
        destinationTasks = [];
        this.tasks[destinationColumn] = destinationTasks;
      }

      destinationTasks.push(movedTask);
    }
  }

  setDraggedTask(task: any): void {
    this.draggedTask = {
      column: this.getOriginalColumn(task),
      taskId: task.id,
    };
  }
  getOriginalColumn(task: any): string {
    return this.getColumnForTask(task.id);
  }

  getDraggedTask(): { column: string; taskId: number } | null {
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
