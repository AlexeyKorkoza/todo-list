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
import { EditorGroupComponent } from './group/editor-group.component';

import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { JwtService } from './shared/services/jwt.service';
import { GroupService } from './shared/services/group.service';

import { AppConfig } from './shared/appConfig';

import { ShowAuthedDirective } from './shared/directive/auth.directive';
import { GroupListComponent } from './group/group-list.component';
import { GroupComponent } from './group/group.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create_group', component: EditorGroupComponent },
  { path: 'edit/:id', component: EditorGroupComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShowAuthedDirective,
    RegistrationComponent,
    HomeComponent,
    LoginComponent,
    EditorGroupComponent,
    GroupListComponent,
    GroupComponent
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
    GroupService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
