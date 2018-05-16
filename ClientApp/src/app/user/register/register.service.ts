import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from './register.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class LoginService {
  private instances: {[key: string]: LoginComponent} = {};
  
  constructor(private apiService : ApiService){

  }


  public signup(email, password) {
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

  public hide(name: string) {
    this.instances[name].hide();
  }

  public show(name: string) {
    this.instances[name].show();
  }
}