import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[showAuthed]'
})

export class ShowAuthedDirective implements OnInit {

  isAuthenticated: boolean;

  constructor() {}

  ngOnInit() {
  }

  @Input() set showAuthed(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

}