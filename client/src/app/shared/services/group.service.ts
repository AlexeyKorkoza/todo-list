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

    console.log(group);
    if (!group.group_id) {
      return this.http.post(this.appConfig.urlServer + '/groups/create', group, {headers: headers})
          .map((res: Response) => res.json())
    } else {
      return this.http.put(this.appConfig.urlServer + '/groups/group/' + group.group_id, group, {headers: headers})
          .map((res: Response) => res.json())
    }
  }

  getGroups() {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.get(this.appConfig.urlServer + '/groups', {headers: headers})
        .map((res: Response) => res.json())

  }

  getGroup(id: number) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.get(this.appConfig.urlServer + '/groups/group/' + id, {headers: headers})
        .map((res: Response) => res.json())
  }

  removeGroup(id: number) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());
    headers.append('Id', 'Id ' + id);

    return this.http.delete(this.appConfig.urlServer + '/groups/group/' + id, {headers: headers})
        .map((res: Response) => res.json())
  }

}
