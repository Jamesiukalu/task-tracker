import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-task-add-modal',
  templateUrl: './task-add-modal.component.html',
  styleUrls: ['./task-add-modal.component.css'],
})
export class TaskAddModalComponent {
  newTask: { title: string; description: string; dueDate: string } = {
    title: '',
    description: '',
    dueDate: '',
  };

  constructor(
    public taskService: TaskService,
    public dialogRef: MatDialogRef<TaskAddModalComponent>
  ) {}

  onSave(): void {
    // Save the new task
    // You may want to call a service method to add the task
    if (
      this.newTask.title &&
      this.newTask.description &&
      this.newTask.dueDate
    ) {
      this.taskService.addTask('open', this.newTask);
      // Clear the new task fields after adding
      this.newTask = { title: '', description: '', dueDate: '' };
    }
    this.dialogRef.close(this.newTask);
  }

  onCancel(): void {
    // Cancel the operation
    this.dialogRef.close();
  }
}
