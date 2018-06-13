import { Component, Input, OnInit } from "@angular/core";
import { UserDataService } from "./user-data.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";

import { User } from '../../models/user';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})

/**
 * @author Alexander Merker
 */
export class UserDataComponent implements OnInit {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(
    private snackBar: MatSnackBar,
    private userDataService: UserDataService,
    private router: Router,
    private i18nService: TranslateService
  ) {}

  openSnackBar(message, time) {
    this.snackBar.open(message, "", {
      duration: time
    });
  }
  
  ngOnInit(): void {
    this.userDataService.fetch_userdata().subscribe(
      (data: any) => {
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
      },
      (error: any) => {
        this.i18nService.get("USER.ERRORS.ERR_USERDATA").subscribe((res:string) => {
          this.openSnackBar(res, 5000);
        })
      }
    );
  }
  
  performSave() {
    this.userDataService.save(this.firstName, this.lastName, this.email, this.password, this.id).subscribe(
      (data: any) => {
        this.i18nService.get("USER.PROFILE_SAVED").subscribe((res:string) => {
          this.openSnackBar(res, 5000);
        })
      },
      (error: any) => {
        this.i18nService.get("USER.ERRORS.ERR_SAVE").subscribe((res:string) => {
          this.openSnackBar(res, 5000);
        })
      }
    );
  }

  performDelete() {
    this.userDataService.delete(this.id).subscribe(
      (data: any) => {
        this.i18nService.get("USER.PROFILE_DELETED").subscribe((res:string) => {
          this.openSnackBar(res, 5000);
        })
      },
      (error: any) => {
        this.i18nService.get("USER.ERRORS.ERR_DELETE").subscribe((res:string) => {
          this.openSnackBar(res, 5000);
        })
      }
    );
  }
}