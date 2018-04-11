import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'login-home',
  templateUrl: './login.component.html',
})
export class LoginComponent {

    constructor(private router:RouterModule){
      
    }
    public login = () =>{
      this.router.navigate(['home']);
    }
}
