import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginComponent } from './login.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private instances: { [key: string]: LoginComponent } = {};

  constructor(private apiService: ApiService) {}

  public signin(email, password) {
    var data = {
      email: email,
      password: password
    };
    return this.apiService.login(data);
  }
}
