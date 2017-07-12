import { Component, Input } from '@angular/core';

import { Group } from "../shared/models/group.model";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  @Input() group: Group;

  constructor() { }

}
