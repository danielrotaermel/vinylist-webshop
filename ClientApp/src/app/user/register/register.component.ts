import { Component, Input } from '@angular/core';
import { RegisterService } from './register.service';
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})

/**
 * @author Alexander Merker
 */
export class RegisterComponent{
  @Input() name: string;
  private isVisible = false;

  constructor(private snackBar : MatSnackBar, private registerService : RegisterService, private router : Router) {

  }

  openSnackBar() {
    this.snackBar.open("Registered successfully", '', {
      duration: 1500
    });
  }

  //TODO: LOG ERRORS
  OnSubmit(firstName, lastName, email,password){
     this.registerService.signup(firstName, lastName, email,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     this.router.navigate(['/']);
     this.openSnackBar();
   });
  }
}
