import { NgModule } from "@angular/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { MaterialModule } from "../core/material.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserDataComponent } from "./user-data/user-data.component";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";

import { LoginService } from './login/login.service';
import { ApiService } from "../api.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{ path: "login", component: LoginComponent }]),
    AngularSvgIconModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [UserDataComponent, LoginComponent],
  exports:[LoginComponent],
  providers: [
    LoginService,
    ApiService
  ],
})
export class UserModule {}
