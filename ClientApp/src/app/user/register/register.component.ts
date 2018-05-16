import { Component, Input } from '@angular/core';
import { LoginService } from './login.service';

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

  constructor(private loginService : LoginService) {

  }

  show(){
    //TODO: Fill with life
  }

  hide() {
    //TODO: Fill with life
  }

  //TODO: LOG ERRORS
  OnSubmit(email,password){
     this.loginService.signin(email,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     //this.router.navigate(['/home']);
   });
  }
}
