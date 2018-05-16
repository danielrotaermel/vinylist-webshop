import { Component, Input } from '@angular/core';
import { LoginService } from './login.service';
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})

/**
 * @author Alexander Merker
 */
export class LoginComponent{
  @Input() name: string;
  private isVisible = false;

  constructor(private snackBar : MatSnackBar, private loginService : LoginService, private router : Router) {

  }

  openSnackBar() {
    this.snackBar.open("Logged in successfully");
    // this.snackBar.open("Logged in successfully", '', {
    //   duration: 1500
    // });
  }

  //TODO: LOG ERRORS
  OnSubmit(email,password){
     this.loginService.signin(email,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     this.router.navigate(['/']);
     this.openSnackBar();
   });
  }
}
