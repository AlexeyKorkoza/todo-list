import { Component, Input, Output, EventEmitter } from '@angular/core';

import { GroupService } from '../shared/services/group.service';
import { Group } from '../shared/models/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  @Input() group: Group;
  @Input() index: number;
  @Output() onChanged = new EventEmitter<number>();
  @Output() onChangedGroup = new EventEmitter<number>();

  constructor(private groupService: GroupService) { }

  remove(id: number, index: number) {
    this.groupService.removeGroup(id).subscribe(
        data => {
          this.onChanged.emit(index);
        }
    )
  }

  select(id: number) {
    this.groupService.setSelectingGroup(id);
  }

}
