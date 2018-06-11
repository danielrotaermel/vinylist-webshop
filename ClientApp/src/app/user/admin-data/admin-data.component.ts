import { Component, Input } from "@angular/core";
import { AdminDataService } from "./admin-data.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin-data',
  templateUrl: './admin-data.component.html',
  styleUrls: ['./admin-data.component.scss']
})

/**
 * @author Alexander Merker
 */
export class AdminDataComponent {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  dataSource = new AdminDataSource(this.adminDataService);
  displayedColumns = ['firstName', 'lastName', 'email', 'password'];

  constructor(
    private snackBar: MatSnackBar,
    private adminDataService: AdminDataService,
    private router: Router
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, "", {
      duration: time
    });
  }
}

export class AdminDataSource extends DataSource<any> {
  constructor(private adminDataService: AdminDataService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.adminDataService.all_users();
  }
  disconnect() {}
}