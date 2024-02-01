import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from './task.service';
import { TaskEditModalComponent } from './task-edit-modal/task-edit-modal.component';
import { TaskAddModalComponent } from './task-add-modal/task-add-modal.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    KanbanBoardComponent,
    TaskComponent,
    KanbanBoardComponent,
    TaskEditModalComponent,
    TaskAddModalComponent,
    SignInComponent,
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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [TaskService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
