import { Component, OnInit } from '@angular/core';

import { Group } from '../shared/models/group.model';
import { GroupService } from '../shared/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groups: Group [];
  groupsLoaded: boolean;

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.getGroupsOfUser().subscribe(
        data => {
            if (data === 'Empty') {
                this.groupsLoaded = false;
            } else {
                this.groups = data;
                this.groupsLoaded = true;
            }
        }
    )
  }

  onChanged(index: number) {
    this.groups.splice(index, 1);
    if (this.groups.length === 0 ) {
        this.groupsLoaded = false;
    }
  }

  onChangedGroup(id: number) {
        console.log(id);
  }
}
