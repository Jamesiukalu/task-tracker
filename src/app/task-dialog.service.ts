  import { Injectable } from '@angular/core';
  import { MatDialog } from '@angular/material/dialog';
  import { TaskEditModalComponent } from './task-edit-modal/task-edit-modal.component';

  @Injectable({
    providedIn: 'root',
  })
  export class TaskDialogService {
    constructor(private dialog: MatDialog) {}

    openEditDialog(task: any): void {
      this.dialog.open(TaskEditModalComponent, {
        width: '400px',
        data: { task },
      });
    }
  }
