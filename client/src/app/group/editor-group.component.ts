import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { Group } from '../shared/models/group.model';
import { GroupService } from '../shared/services/group.service';

@Component({
  selector: 'app-editor-group',
  templateUrl: './editor-group.component.html',
  styleUrls: ['./editor-group.component.scss']
})
export class EditorGroupComponent implements OnInit {

  editorForm: any;
  url: string [];
  action: string;
  message: string;
  id: number;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private groupService: GroupService) {
    this.editorForm = formBuilder.group({
      'name': ['', [<any>Validators.required]]
    });
  }

  ngOnInit() {
    this.url = this.router.url.split('/');
    if (this.url.length === 3) {
      this.action = 'Edit';
      this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.groupService.getGroup(this.id).subscribe(
         data => {
           (<FormControl>this.editorForm.controls['name']).patchValue(data[0].name, { onlySelf: true });
         })
      });
    } else {
      this.action = 'Create';
    }
  }

  save(group: Group) {
    this.message = '';
    if (this.id !== 0) {
      group.group_id = this.id;
    }
    this.groupService.save(group).subscribe(
        data => {
            if (data === 'Group was updated') {
                this.message = 'Group was updated';
            } else {
                this.message = 'Group was created';
            }
            setTimeout(()=> {
                this.router.navigate(['/']);
            }, 2000);
        },
        err => {
          this.message = 'Group already exists';
        }
    )
  }

}
