import { Component, OnInit } from '@angular/core';

import { Group } from '../shared/models/group.model';
import { GroupService } from  '../shared/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit{

  groups: Group [];
  groupsLoaded = false;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.getGroups().subscribe(
        data => {
          this.groups = data;
          this.groupsLoaded = true;
        }
    )
  }

}
