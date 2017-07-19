import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

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
  todo: Todo [];
  editorForm: any;
  selected: string;
  action: string;
  message: string;
  url: string [];

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private groupService: GroupService,
      private todoService: TodoService) {
    this.editorForm = formBuilder.group({
      'name': ['', [<any>Validators.required]],
      'group_id': ['']
    });
  }

  ngOnInit() {
    this.groupService.getGroupsAccessingToUser().subscribe(
        data => {
          this.groups = data;
        }
    );

    this.url = this.router.url.split('/');

    if (this.url.length === 2) {
      this.action = 'Create';
    } else {
      this.action = 'Edit';

      this.route.params.subscribe(params => {
        const id = +params['id'];

        this.todoService.getTodo(id).subscribe(
            data => {
              this.todo = data;
              this.todo[0].todo_id = data[0].todo_id;

              (<FormControl>this.editorForm.controls['name']).patchValue(data[0].name, { onlySelf: true });

              this.groups.forEach((item) => {
                if (item.group_id === this.todo[0].group_id) {
                  this.selected = item.name;
                }
              });
            }
        );
      });

    }
  }

  save(todo: Todo) {
    this.message = '';

    if (this.todo !== undefined) {
      todo.todo_id = this.todo[0].todo_id;
    }

    if (todo.group_id === 0) {
        todo.group_id = this.todo[0].group_id;
    }

    this.todoService.save(todo).subscribe(
        data => {
            this.message = data;
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 2000);
        },
        err => {
          this.message = 'Todo already was created';
        }
    )
  }

}
