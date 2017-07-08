import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ShowAuthedDirective } from './shared/directive/auth.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowAuthedDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
