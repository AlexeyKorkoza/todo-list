import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";

@Directive({
  selector: '[showAuthed]'
})

export class ShowAuthedDirective implements OnInit {

  isAuthenticated: boolean;

  constructor(
      private templateRef: TemplateRef<any>,
      private authService: AuthService,
      private viewContainer: ViewContainerRef) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(
        (isAuthenticated) => {
          if (!isAuthenticated && !this.isAuthenticated || isAuthenticated && this.isAuthenticated) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        }
    );
  }

  @Input() set showAuthed(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

}