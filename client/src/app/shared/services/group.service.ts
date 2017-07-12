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

  save(group: Group, action: string) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    if (action === 'create') {
      return this.http.post(this.appConfig.urlServer + '/group/create', {headers: headers})
          .map((res: Response) => res.json())
    }
  }

}
