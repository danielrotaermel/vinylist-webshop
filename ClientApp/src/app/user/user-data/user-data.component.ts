import { Component, Input } from "@angular/core";
import { UserDataService } from "./user-data.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { User } from '../../models/user';

@Component({
  selector: 'app-user-data',
  template: '',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})

/**
 * @author Alexander Merker
 */
export class UserDataComponent {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(
    private snackBar: MatSnackBar,
    private userDataService: UserDataService,
    private router: Router
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, "", {
      duration: time
    });
  }

  performSave() {
    this.userDataService.save(this.firstName, this.lastName, this.email, this.password).subscribe(
      (data: any) => {
        //TODO: i18n
        this.openSnackBar("Profile saved", 1500);
      },
      (error: any) => {
        this.openSnackBar("Saving gone wrong", 1500);
      }
    );
  }
  performDelete() {
    this.userDataService.delete().subscribe(
      (data: any) => {
        //TODO: i18n
        this.openSnackBar("Profile saved", 1500);
      },
      (error: any) => {
        this.openSnackBar("Deletion gone wrong", 1500);
      }
    );
  }
}