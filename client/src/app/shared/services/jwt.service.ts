import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  constructor() { }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: any) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

}