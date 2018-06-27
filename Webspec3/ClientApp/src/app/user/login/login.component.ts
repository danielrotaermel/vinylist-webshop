import { WishlistService } from './../../wishlist/wishlist.service';
import { Component, DoCheck, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SessionService } from '../../services/session.service';
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
export class LoginComponent implements DoCheck {
  @Input() popover;

  email: string;
  password: string;
  loggedIn = false;

  constructor(
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private session: SessionService,
    private router: Router
  ) {}

  ngDoCheck() {
    this.loggedIn = this.session.isLoggedIn();
  }

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
        this.wishlistService.getWishlist()
      },
      (error: any) => {
        this.openSnackBar('Wrong username or password', 5000);
      }
    );
  }
}
