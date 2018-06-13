import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MaterialModule } from '../core/material.module';
import { AuthService } from './../services/auth.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { UserDataComponent } from './user-data/user-data.component';
import { UserDataService } from './user-data/user-data.service';

/**
 * @author Alexander Merker
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{ path: 'profile', component: UserDataComponent }]),
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    FormsModule
  ],
  declarations: [UserDataComponent, LoginComponent, RegisterComponent],
  exports: [UserDataComponent, LoginComponent, RegisterComponent],
  providers: [LoginService, RegisterService, UserDataService, AuthService]
})
export class UserModule {}
