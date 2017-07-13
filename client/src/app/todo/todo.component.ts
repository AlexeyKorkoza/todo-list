import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../shared/models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
