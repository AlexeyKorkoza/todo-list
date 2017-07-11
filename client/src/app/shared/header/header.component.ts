import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isIn = false;
  currentUser: User;

  constructor(
      private authService: AuthService,
      private router: Router) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(
        userData => {
          this.currentUser = userData;
        }
    )
  }

  toggleState() {
    let bool = this.isIn;
    if (bool === false) {
      this.isIn = true;
    } else {
      this.isIn = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
