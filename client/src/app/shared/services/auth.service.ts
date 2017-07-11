import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../appConfig';
import { User } from '../models/user.model';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
      private http: Http,
      private appConfig: AppConfig,
      private jwtService: JwtService,
      private userService: UserService) {}

  checkAuth() {
    if (this.jwtService.getToken()) {
      this.userService.getUser().subscribe(
          data => {
            this.setAuth(data.user);
          },
          err => {
            this.logout();
          }
      )
    } else {
      this.logout();
    }
  }

  setAuth(user: any) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    this.jwtService.setToken(user.token);
  }

  login(user: any) {
    return this.http.post(this.appConfig.urlServer + '/auth/login', user)
        .map((res) => {
          const data = res.json();
          this.setAuth(data.user);
          return data;
        })
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
    this.jwtService.removeToken();
  }

}