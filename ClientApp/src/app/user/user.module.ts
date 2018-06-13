import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MaterialModule } from '../core/material.module';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { AdminDataService } from './admin-data/admin-data.service';
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
    RouterModule.forRoot([
      { path: 'profile', component: UserDataComponent },
      { path: 'admin', component: AdminDataComponent }
    ]),
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    MatTableModule
  ],
  declarations: [
    UserDataComponent,
    LoginComponent,
    RegisterComponent,
    AdminDataComponent
  ],
  exports: [
    UserDataComponent,
    LoginComponent,
    RegisterComponent,
    AdminDataComponent
  ],
  providers: [
    LoginService,
    RegisterService,
    UserDataService,
    AdminDataService,
    AuthService,
    UserService
  ]
})
export class UserModule {}
