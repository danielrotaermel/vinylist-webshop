import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private instances: { [key: string]: RegisterComponent } = {};

  constructor(private apiService: ApiService) {}

  public signup(firstName, lastName, email, password) {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    return this.apiService.register(data);
  }

  public registerInstance(name: string, instance: RegisterComponent) {
    this.instances[name] = instance;
  }

  public removeInstance(name: string, instance: RegisterComponent) {
    if (this.instances[name] === instance) {
      delete this.instances[name];
    }
  }
}
