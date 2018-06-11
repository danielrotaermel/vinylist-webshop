import { NgModule } from "@angular/core";
import { AngularSvgIconModule } from "angular-svg-icon";
import { MaterialModule } from "../core/material.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserDataComponent } from "./user-data/user-data.component";

import { TranslateModule } from "@ngx-translate/core";

import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
/**
 * @author Alexander Merker
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{ path: "profile", component: UserDataComponent }]),
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    FormsModule
  ],
  declarations: [UserDataComponent, LoginComponent, RegisterComponent],
  exports: [UserDataComponent, LoginComponent, RegisterComponent]
})
export class UserModule {}
