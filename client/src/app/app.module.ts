import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component';

import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { JwtService } from './shared/services/jwt.service';

import { AppConfig } from './shared/appConfig';

import { ShowAuthedDirective } from './shared/directive/auth.directive';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowAuthedDirective,
    RegistrationComponent,
    HomeComponent,
    LoginComponent
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
    AuthService,
    JwtService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
