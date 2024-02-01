import { Component, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service';
import { TaskDialogService } from '../task-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddModalComponent } from '../task-add-modal/task-add-modal.component';
import { NewTaskDialogService } from '../new-task-dialog.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent {
  columns = ['Open', 'Pending', 'In progress', 'Completed'];
  newTask: { title: string; description: string; dueDate: string } = {
    title: '',
    description: '',
    dueDate: '',
  };
  tasksOpenColumn = false;
  showAddTaskForm: boolean | undefined;

  constructor(
    public taskService: TaskService,
    private taskDialogService: TaskDialogService,
    private newTaskDialogService: NewTaskDialogService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  get tasks(): any {
    const tasks = this.columns.reduce((acc, column) => {
      const columnTasks = this.taskService.getTasks(column.toLowerCase());
      acc[column.toLowerCase()] = columnTasks;
      return acc;
    }, {} as any);

    return tasks;
  }

  get isAuthenticated(): boolean {
    return !!this.authService.user$;
  }

  onDragStart(task: any) {
    this.taskService.setDraggedTask(task);
  }
  onDrop(event: CdkDragDrop<string[]>, column: string) {
    if (event.previousContainer === event.container) {
      // Handle dropping within the same column (reordering)
      const draggedTask = this.taskService.getDraggedTask();
      if (draggedTask) {
        this.taskService.moveTask(
          draggedTask.column,
          column,
          draggedTask.taskId
        );
        this.taskService.clearDraggedTask();
      }
    } else {
      // Handle dropping into a different column
      const draggedTask = this.taskService.getDraggedTask();
      if (draggedTask) {
        this.taskService.moveTask(
          draggedTask.column,
          column,
          draggedTask.taskId
        );
        this.taskService.clearDraggedTask();
      }
    }

    // Explicitly mark the component for change detection
    this.cdr.detectChanges();
  }

  onEditTask(task: any) {
    if (task.title === '' && task.description === '' && task.dueDate === '') {
      this.taskService.addTask('open', task);
    } else {
      this.taskDialogService.openEditDialog(task);
    }
  }
  toggleAddTaskForm() {
    this.newTaskDialogService.openNewDialog(
      (result: { title: string; description: string; dueDate: string }) => {
        if (result) {
          this.taskService.addTask('open', result);
        }
      }
    );
  }

  deleteTask(taskId: number) {
    // Determine the column in which the task is located
    const column = this.taskService.getColumnForTask(taskId);

    // Call the deleteTask method in the service
    this.taskService.deleteTask(column, taskId);
  }

  // Handle the addition of a new task to the "Open" column
}
