import { Component, Input } from "@angular/core";
import { RegisterService } from "./register.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [RegisterService]
})

/**
 * @author Alexander Merker, Janina Wachendorfer
 */
export class RegisterComponent {
  private isVisible = false;
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;

  constructor(
    private snackBar: MatSnackBar,
    private registerService: RegisterService,
    private router: Router
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, "", {
      duration: time
    });
  }

  performRegistration() {
    this.registerService
      .signup(this.firstName, this.lastName, this.email, this.password)
      .subscribe(
        (data: any) => {
          localStorage.setItem("userToken", data.access_token);
          this.router.navigate(["/"]);
          this.openSnackBar("Registered successfully", 1500);
        },
        (error: any) => {
          this.openSnackBar(error, 5000);
        }
      );
  }
}
