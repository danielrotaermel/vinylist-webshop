import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})

/**
 * @author Alexander Merker, Janina Wachendorfer
 */
export class LoginComponent {
  email: string;
  password: string;

  @Input() popover;

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, '', {
      duration: time
    });
  }

  performLogin() {
    this.loginService.signin(this.email, this.password).subscribe(
      (data: any) => {
        this.popover.close();
        this.router.navigate(['/']);
        this.openSnackBar('Login successful', 1500);
      },
      (error: any) => {
        this.openSnackBar('Wrong username or password', 5000);
      }
    );
  }
}
