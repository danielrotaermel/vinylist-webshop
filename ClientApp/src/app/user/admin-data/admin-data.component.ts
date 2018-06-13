import { Component, Input } from "@angular/core";
import { AdminDataService } from "./admin-data.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from '../../models/user';
import { getRandomString } from "selenium-webdriver/safari";

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
  displayedColumns = ['firstName', 'lastName', 'email', 'save'];

  constructor(
    private snackBar: MatSnackBar,
    private adminDataService: AdminDataService,
    private router: Router,
    private i18nService: TranslateService
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, "", {
      duration: time
    });
  }

  public perform_save(id, firstName, lastName, email){
    //Empty password, will not be updated!
    this.adminDataService.save(firstName, lastName, email, "", id).subscribe((data:any) => {
      this.router.navigate(['/admin']);
      this.i18nService.get("USER.PROFILE_SAVED").subscribe((res:string) => {
          this.openSnackBar(res, 5000);
        })
      },
      (error: any) => {
        this.i18nService.get("USER.ERRORS.ERR_SAVE").subscribe((res:string) => {
          this.openSnackBar(res, 5000);
      })
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