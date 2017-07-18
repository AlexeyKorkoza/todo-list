import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { MemberService } from '../shared/services/member.service';

@Component({
  selector: 'app-access',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  members: any;
  users: User [];

  constructor(
      private router: Router,
      private userService: UserService,
      private memberService: MemberService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
        data => {
          this.users = data;
        }
    );
    const url = this.router.url.split('/');

    if (url.length === 4) {
      const id = Number(url[2]);
      this.memberService.getMembersById(id).subscribe(
          data => {
            console.log(data);
            this.members = data;
          }
      )
    }

  }

}
