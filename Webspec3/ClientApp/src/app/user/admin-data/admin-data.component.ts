import 'rxjs/add/observable/of';

import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services/user.service';
import { CreateUser } from './../../models/create-user.model';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.scss']
})

/**
 * @author Alexander Merker
 */
export class AdminDataComponent {
  dataSource = new AdminDataSource(this.userService);
  displayedColumns = ['firstName', 'lastName', 'email', 'save', 'delete'];

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private i18nService: TranslateService
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, '', {
      duration: time
    });
  }

  perform_save(id, firstName, lastName, email) {
    const formData = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email
    };

    const userData: CreateUser = new CreateUser().deserialize(formData);
    this.userService.updateUser(userData, id).subscribe(
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

  perform_delete(id) {

    this.userService.deleteUser(id).subscribe(
      (data: any) => {
        this.i18nService.get('USER.PROFILE_DELETED').subscribe((res: string) => {
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

// tslint:disable-next-line:max-classes-per-file
export class AdminDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getUsers();
  }
  disconnect() {}
}
