import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: any;

  editTask() {
    // Implement the logic to edit the task (open a modal, navigate to edit page, etc.)
    console.log('Editing task:', this.task);
  }
}
