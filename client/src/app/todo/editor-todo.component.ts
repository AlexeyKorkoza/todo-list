import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Group } from '../shared/models/group.model';
import { GroupService } from '../shared/services/group.service';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './editor-todo.component.html',
  styleUrls: ['./editor-todo.component.scss']
})
export class EditorTodoComponent implements OnInit {

  groups = [];
  editorForm: any;
  action: string;
  message: string;
  url: string [];

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private groupService: GroupService,
      private todoService: TodoService) {
    this.editorForm = formBuilder.group({
      'name': ['', [<any>Validators.required]],
      'group': ['', [<any>Validators.required]]
    });
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(
        data => {
          this.groups = data;
        }
    );

    this.url = this.router.url.split('/');
    if (this.url.length === 3) {
      this.action = 'Create';
    }
  }

  save(todo: any) {
    todo.group_id = todo.group;
    todo.group = null;
    this.todoService.save(todo).subscribe(
        data => {
          this.router.navigateByUrl('/');
        }
    )
  }

}
