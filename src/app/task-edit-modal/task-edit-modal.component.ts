import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.css'],
})
export class TaskEditModalComponent implements OnInit {
  editedTask: any;
  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Create a copy of the task data to prevent direct modification
    this.editedTask = { ...data.task };
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSave(): void {
    // Implement the logic to update the task
    // You may want to call a service method to update the task in your backend
    // Update the task locally
    // Close the dialog on save
    this.updateTaskLocally();
    this.dialogRef.close();
  }

  private updateTaskLocally(): void {
    this.taskService.updateTaskLocally(this.editedTask.id, this.editedTask);
  }

  onCancel(): void {
    // Close the dialog on cancel
    this.dialogRef.close();
  }
}
