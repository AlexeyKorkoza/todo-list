import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Todo } from '../models/todo.model';
import { AppConfig } from '../appConfig';
import { JwtService } from './jwt.service';

@Injectable()
export class TodoService {

  constructor(
      private http: Http,
      private appConfig: AppConfig,
      private jwtService: JwtService) { }

  save(todo: Todo) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    if (!todo.todo_id) {
      return this.http.post(this.appConfig.urlServer + '/todos/create', todo, {headers: headers})
          .map((res: Response) => res.json())
    } else {
      return this.http.put(this.appConfig.urlServer + '/todos/todo/' + todo.todo_id, todo, {headers: headers})
          .map((res: Response) => res.json())
    }
  }

  getTodosByGroup(id: number) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.get(this.appConfig.urlServer + '/todos/' + id, {headers: headers})
        .map((res: Response) => res.json())
  }

  getTodo(id: number) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.get(this.appConfig.urlServer + '/todos/todo/' + id, {headers: headers})
        .map((res: Response) => res.json())
  }

}
