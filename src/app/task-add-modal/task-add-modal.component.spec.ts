import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddModalComponent } from './task-add-modal.component';

describe('TaskAddModalComponent', () => {
  let component: TaskAddModalComponent;
  let fixture: ComponentFixture<TaskAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAddModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
