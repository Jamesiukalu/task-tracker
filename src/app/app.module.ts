import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatCardModule } from '@angular/material/card'
import { TaskService } from './task.service';
import { TaskEditModalComponent } from './task-edit-modal/task-edit-modal.component';
import { TaskAddModalComponent } from './task-add-modal/task-add-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanBoardComponent,
    TaskComponent,
    KanbanBoardComponent,
    TaskEditModalComponent,
    TaskAddModalComponent
  ],
  entryComponents: [TaskEditModalComponent, TaskAddModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatCardModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
