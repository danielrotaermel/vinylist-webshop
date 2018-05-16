import { NgModule } from "@angular/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { MaterialModule } from "../core/material.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserDataComponent } from "./user-data/user-data.component";
import { RouterModule } from "@angular/router";

import { TranslateModule } from "@ngx-translate/core";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { ApiService } from "../api.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{ path: "login", component: LoginComponent }, { path: "register", component: RegisterComponent}]),
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    FormsModule
  ],
  declarations: [UserDataComponent, LoginComponent, RegisterComponent],
  exports:[LoginComponent, RegisterComponent],
  providers: [
    LoginService,
    RegisterService,
    ApiService
  ],
})
export class UserModule {}
