import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { CreateUser } from './../../models/create-user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})

/**
 * @author Alexander Merker, Daniel Rotärmel
 */
export class UserDataComponent implements OnInit {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private i18nService: TranslateService,
    private userService: UserService
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, '', {
      duration: time
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (data: any) => {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
      },
      (error: any) => {
        this.i18nService
          .get('USER.ERRORS.ERR_USERDATA')
          .subscribe((res: string) => {
            this.openSnackBar(res, 5000);
          });
      }
    );
  }

  performSave() {
    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    const userData: CreateUser = new CreateUser().deserialize(formData);
    this.userService.updateUser(userData, this.id).subscribe(
      (data: any) => {
        this.i18nService.get('USER.PROFILE_SAVED').subscribe((res: string) => {
          this.openSnackBar(res, 5000);
        });
      },
      (error: any) => {
        this.i18nService
          .get('USER.ERRORS.ERR_SAVE')
          .subscribe((res: string) => {
            this.openSnackBar(res, 5000);
          });
      }
    );
  }

  performDelete() {
    this.userService.deleteUser(this.id).subscribe(
      (data: any) => {
        this.i18nService
          .get('USER.PROFILE_DELETED')
          .subscribe((res: string) => {
            this.openSnackBar(res, 5000);
          });
      },
      (error: any) => {
        this.i18nService
          .get('USER.ERRORS.ERR_DELETE')
          .subscribe((res: string) => {
            this.openSnackBar(res, 5000);
          });
      }
    );
  }
}
