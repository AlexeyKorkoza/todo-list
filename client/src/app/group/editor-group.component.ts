import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Group } from '../shared/models/group.model';
import { GroupService } from '../shared/services/group.service';

@Component({
  selector: 'app-editor-group',
  templateUrl: './editor-group.component.html',
  styleUrls: ['./editor-group.component.scss']
})
export class EditorGroupComponent {

  editorForm: any;
  url: string [];
  action: string;
  message: string;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private groupService: GroupService) {
    this.editorForm = formBuilder.group({
      'name': ['', [<any>Validators.required]]
    });
    this.url = router.url.split('/');
    if (this.url.length === 4) {
      this.action = 'Edit';
    } else {
      this.action = 'Create';
    }
  }

  save(group: Group) {
    this.message = '';
    this.groupService.save(group).subscribe(
        () => {
          this.message = 'Group was created successfully';
          this.router.navigate(['/']);
        },
        err => {
          this.message = 'Group already was created';
        }
    )
  }

}
