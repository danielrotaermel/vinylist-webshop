import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from "@angular/router";
import { RegisterComponent } from './register.component';

import { UserService } from '../../services/user.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class RegisterService {
  private instances: {[key: string]: RegisterComponent} = {};
  
  constructor(private userService : UserService){

  }


  public signup(firstName, lastName, email, password) {
    var data = {
        "firstName":firstName,
        "lastName":lastName,
        "email":email,
        "password":password
    };
    return this.userService.register(data);
  }
  
  //

  public registerInstance(name: string, instance: RegisterComponent) {  
    this.instances[name] = instance;
  }

  public removeInstance(name: string, instance: RegisterComponent) {
    if (this.instances[name] === instance) {
      delete this.instances[name];
    }
 }
}