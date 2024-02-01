import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: any;
  @Output() editTaskClick = new EventEmitter<any>();
  @Output() deleteTaskClick = new EventEmitter<number>();

  isAddTaskFormVisible = false;
  newTask: any = { title: '', description: '', dueDate: '' };

  editTask() {
    // Emit an event to inform the parent component (KanbanBoardComponent) about the edit action
    this.editTaskClick.emit(this.task);
  }
  deleteTask(taskId: number) {
    this.deleteTaskClick.emit(this.task.id);
  }
  toggleAddTaskForm() {
    this.isAddTaskFormVisible = !this.isAddTaskFormVisible;
  }
}
