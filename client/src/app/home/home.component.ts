import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  id: number;

  onChangedGroup(id: number) {
    console.log(id);
    this.id = id;
  }

}
