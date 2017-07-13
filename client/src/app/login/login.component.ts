import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: any;
  message: string;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService) {
    this.loginForm = formBuilder.group({
      'email': ['', [<any>Validators.required]],
      'password': ['', [<any>Validators.required]]
    })
  }

  login(user: User) {
    this.message = '';
    this.authService.login(user).subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        err => {
          console.log(err);
          this.message = err._body;
        }
    )
  }

}
