import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  @Input() todo: Todo;
  @Input() index: number;
  @Output () onChanged = new EventEmitter<number>();
  @Output () onChangedExecute = new EventEmitter<number>();

  constructor(private todoService: TodoService) { }

  remove(index: number, id: number) {
    this.onChanged.emit(index);
    this.todoService.removeTodo(id).subscribe();
  }

  remove_execute(index: number, id: number) {
    this.onChangedExecute.emit(index);
    this.todoService.removeTodo(id).subscribe();
  }

}
