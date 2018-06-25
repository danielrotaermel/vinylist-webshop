import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Credentials } from './../../models/credentials.model';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * @author Alexander Merker, Janina Wachendorfer, Daniel Rotärmel
 */
export class LoginComponent {
  email: string;
  password: string;

  @Input() popover;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, '', {
      duration: time
    });
  }

  public signin() {
    const formData = {
      email: this.email,
      password: this.password
    };

    const credentials = new Credentials().deserialize(formData);

    this.authService.login(credentials).subscribe(
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

  public signout() {
    this.authService.logout();
  }
}
