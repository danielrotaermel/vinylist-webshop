import { Component, Input } from "@angular/core";
import { LoginService } from "./login.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [LoginService]
})

/**
 * @author Alexander Merker, Janina Wachendorfer
 */
export class LoginComponent {
  email: string;
  password: string;

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, "", {
      duration: time
    });
  }

  performLogin() {
    this.loginService.signin(this.email, this.password).subscribe(
      (data: any) => {
        localStorage.setItem("userToken", data.access_token);
        this.router.navigate(["/"]);
        this.openSnackBar("Login successfully", 1500);
      },
      (error: any) => {
        this.openSnackBar(error, 5000);
      }
    );
  }
}
