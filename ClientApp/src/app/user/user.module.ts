import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MaterialModule } from '../core/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDataComponent } from './user-data/user-data.component';
import { AdminDataComponent } from './admin-data/admin-data.component';

import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { UserDataService } from './user-data/user-data.service';
import { AdminDataService } from './admin-data/admin-data.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

/**
 * @author Alexander Merker
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{ path: 'profile', component: UserDataComponent },
                          { path: 'admin', component: AdminDataComponent}]),
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    MatTableModule
  ],
  declarations: [UserDataComponent, LoginComponent, RegisterComponent, AdminDataComponent],
  exports: [UserDataComponent, LoginComponent, RegisterComponent, AdminDataComponent],
  providers: [LoginService, RegisterService, UserDataService, AdminDataService, AuthService, UserService]
})
export class UserModule {}
