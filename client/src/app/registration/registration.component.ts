import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registerForm: any;
  errorMessage: string;

  constructor(
      private userService: UserService,
      private formBuilder: FormBuilder,
      private router: Router) {
    this.registerForm = formBuilder.group({
      'username': ['', [<any>Validators.required]],
      'email': ['', [<any>Validators.required, <any>Validators.email]],
      'password': ['', [<any>Validators.required, <any>Validators.minLength(6)]]
    })
  }

  register(user: User) {
    this.userService.create(user).subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        err => {
          if (err.status === 409) {
            this.errorMessage = 'This User is already taken';
          }
        }
    );
  }

}
