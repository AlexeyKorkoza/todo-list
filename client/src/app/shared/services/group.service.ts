import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../appConfig';
import { JwtService } from '../services/jwt.service';
import { Group } from '../models/group.model';

@Injectable()
export class GroupService {

  constructor(
      private http: Http,
      private appConfig: AppConfig,
      private jwtService: JwtService) {}

  save(group: Group) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    if (!group.group_id) {
      return this.http.post(this.appConfig.urlServer + '/groups/create', group, {headers: headers})
          .map((res: Response) => res.json())
    }
  }

}
