import { Component } from '@angular/core';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent {
  columns = ['Open', 'Pending', 'In Progress', 'Completed'];

  constructor(private taskService: TaskService) {}

  get tasks(): any {
    // Use the task service to fetch tasks for each column
    return this.columns.reduce((acc, column) => {
      acc[column.toLowerCase()] = this.taskService.getTasks(column);
      return acc;
    }, {} as any);
  }

  onDragStart(task: any) {
    // When a task is dragged, store its data in the task service
    this.taskService.setDraggedTask(task);
  }

  onDrop(event: CdkDragDrop<string[]>, column: string) {
    // When a task is dropped, move it to the new column
    const draggedTask = this.taskService.getDraggedTask();
    if (draggedTask) {
      this.taskService.moveTask(draggedTask.column, column, draggedTask.taskId);
      this.taskService.clearDraggedTask();
    }
  }
}
