import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isIn = false;

  constructor() { }

  ngOnInit() {
  }

  toggleState() {
    let bool = this.isIn;
    if (bool === false) {
      this.isIn = true;
    } else {
      this.isIn = false;
    }
  }

}
