import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { MaterialModule } from '../core/material.module';
import { UserService } from '../services/user.service';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDataComponent } from './user-data/user-data.component';

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
  providers: [UserService]
})
export class UserModule {}
