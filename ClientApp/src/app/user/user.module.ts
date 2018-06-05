import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialModule } from '../core/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataComponent } from './user-data/user-data.component';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { UserDataService } from './user-data/user-data.service';
import { ApiService } from '../api.service';

/**
 * @author Alexander Merker
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: UserDataComponent }
    ]),
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    FormsModule
  ],
  declarations: [UserDataComponent, LoginComponent, RegisterComponent],
  exports: [UserDataComponent, LoginComponent, RegisterComponent],
  providers: [LoginService, RegisterService, UserDataService, ApiService]
})
export class UserModule {}
