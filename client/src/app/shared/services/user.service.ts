import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../appConfig';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(
      private http: Http,
      private appConfig: AppConfig) { }

  create(user: User) {
    return this.http.post(this.appConfig.urlServer + '/auth/signup', user)
        .map((res: Response) => res.json())
  }

}
