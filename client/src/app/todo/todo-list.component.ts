import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';

import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import {GroupService} from '../shared/services/group.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnChanges, OnInit {

  todos: Todo [];
  @Input() id: number;
  message: string;

  constructor(
      private groupService: GroupService,
      private todoService: TodoService) {}

  ngOnChanges(changes: SimpleChanges) {
      this.groupService.getSelectingGroup().subscribe(
          id => {
            const current_id = id;
            this.todoService.getTodosByGroup(current_id).subscribe(
              data => {
                if (data === 'Todos are not created') {
                  this.todos.splice(0, this.todos.length);
                  this.message = data;

                } else {
                  this.todos = data;
                  this.message = '';
                }
              })
          }
      )
  }

  ngOnInit() {
      let firstIdGroup;
      this.groupService.getFirstGroup().subscribe(
          data => {
            firstIdGroup = data[0].group_id;
            this.todoService.getTodosByGroup(firstIdGroup).subscribe(
                todos => {
                  this.todos = todos;
                }
            );
          }
      );
  }

}
