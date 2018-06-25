import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CreateUser } from '../../models/create-user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * @author Alexander Merker, Janina Wachendorfer
 */
export class RegisterComponent {
  isVisible = false;

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  @Input() popover;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, '', {
      duration: time
    });
  }

  performRegistration() {
    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
    const userData: CreateUser = new CreateUser().deserialize(formData);
    this.userService.createUser(userData).subscribe(
      (data: any) => {
        this.popover.close();
        localStorage.setItem('userToken', data.access_token);
        this.router.navigate(['/']);
        this.openSnackBar('Registered successfully', 1500);
      },
      (error: any) => {
        this.openSnackBar('Something went wrong with registration', 5000);
      }
    );
  }
}
