import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { AppConfig } from '../appConfig';
import { JwtService } from './jwt.service';

@Injectable()
export class MemberService {

  constructor(
      private http: Http,
      private appConfig: AppConfig,
      private jwtService: JwtService) { }

  getMembersById(id: number) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.get(this.appConfig.urlServer + '/members/' + id, { headers: headers })
        .map((res: Response) => res.json())
  }

  addMember(member: any) {
    const headers = new Headers();
    headers.append('Authorization', 'Token ' + this.jwtService.getToken());

    return this.http.post(this.appConfig.urlServer + '/members/add', member, { headers: headers })
        .map((res: Response) => res.json())
  }
}
