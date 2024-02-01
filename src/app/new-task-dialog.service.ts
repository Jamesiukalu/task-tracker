import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddModalComponent } from './task-add-modal/task-add-modal.component';

@Injectable({
  providedIn: 'root',
})
export class NewTaskDialogService {
  constructor(private dialog: MatDialog) {}

  openNewDialog(task: any): void {
    this.dialog.open(TaskAddModalComponent, {
      width: '400px',
      data: { task },
    });
  }
}
