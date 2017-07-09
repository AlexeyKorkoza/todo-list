import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ShowAuthedDirective } from './shared/directive/auth.directive';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component'

import { UserService } from './shared/services/user.service';

import { AppConfig } from './shared/appConfig';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowAuthedDirective,
    RegistrationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
