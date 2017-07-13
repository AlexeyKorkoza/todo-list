import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoComponent } from './editor-todo.component';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
