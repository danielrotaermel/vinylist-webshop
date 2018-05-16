import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginComponent } from './login.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class LoginService {
  private instances: {[key: string]: LoginComponent} = {};
  
  constructor(private apiService : ApiService){

  }


  public signin(email, password) {
    var data = {
        "email":email,
        "password":password
    };
    return this.apiService.login(data);
  }
  
  //

  public registerInstance(name: string, instance: LoginComponent) {  
    this.instances[name] = instance;
  }

  public removeInstance(name: string, instance: LoginComponent) {
    if (this.instances[name] === instance) {
      delete this.instances[name];
    }
 }
}