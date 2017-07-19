import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { MemberService } from '../shared/services/member.service';
import { Member } from "../shared/models/member.model";

@Component({
  selector: 'app-access',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  memberForm: FormGroup;
  members: any;
  member: Member = new Member();
  users: User [];
  group_id: number;
  message: string;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private userService: UserService,
      private memberService: MemberService) {
    this.memberForm = formBuilder.group({
      'username': ['', [<any>Validators.required]]
    });
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
        data => {
          this.users = data;
        }
    );
    const url = this.router.url.split('/');

    if (url.length === 4) {
      this.group_id = Number(url[2]);
      this.memberService.getMembersById(this.group_id).subscribe(
          data => {
            this.members = data;
          }
      )
    }
  }

  save(data: any) {
    this.message = '';
    let user_id;
    this.users.forEach((item) => {
      if (item.username === data.value.username) {
        user_id = item.user_id;
      }
    });


    this.member.group_id = this.group_id;
    this.member.user_id = user_id;

    this.memberService.addMember(this.member).subscribe(
        result => {
          if (result === 'This user already was added') {
            this.message = 'This user already was added';
          } else {
            this.members[this.members.length] = {
              'member_id': result.member_id,
              'username': data.value.username
            };
            setTimeout(() => {
              this.message = 'This user was added successfully';
            }, 2500)
          }
        }
    );
  }

}
