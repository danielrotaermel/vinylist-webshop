import { Component } from '@angular/core';
import { AppModule } from '../app.module';

@Component({
  selector: 'login-home',
  templateUrl: './login.component.html',
})
export class LoginComponent {

    public login = () =>{
      
      //this.router.navigate(['home']);
    }
}