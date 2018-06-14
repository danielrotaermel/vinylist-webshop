import { Injectable } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

/**
 * @author Alexander Merker
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private instances: { [key: string]: LoginComponent } = {};

  constructor(private authService: AuthService) {}

  public signin(email, password) {
    const data = {
      email: email,
      password: password
    };
    return this.authService.login(data);
  }
}
