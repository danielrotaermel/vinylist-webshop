import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginComponent } from './login.component';

import { AuthService } from '../../services/auth.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class LoginService {
  private instances: {[key: string]: LoginComponent} = {};
  
  constructor(private authService : AuthService){

  }


  public signin(email, password) {
    var data = {
        "email":email,
        "password":password
    };
    return this.authService.login(data);
  }
}