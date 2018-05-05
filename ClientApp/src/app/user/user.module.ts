import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDataComponent } from "./user-data/user-data.component";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([{ path: "login", component: LoginComponent }])
  ],
  declarations: [UserDataComponent, LoginComponent]
})
export class UserModule {}
