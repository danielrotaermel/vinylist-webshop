import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from "@angular/router";
import { AdminDataComponent } from './admin-data.component';

import { UserService } from '../../services/user.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class AdminDataService {

  constructor(private userService : UserService){
      
  }
  
  public all_users(){
      return this.userService.get_users();
  }

  public save(firstName, lastName, email, password, id) {
    var data;
    if(password == "" || undefined){
      data = {
        "firstName": firstName,
        "lastName": lastName,
        "email":email,
      };
    }
    else{
      data = {
        "firstName": firstName,
        "lastName": lastName,
        "email":email,
        "password":password
      };
    }
    return this.userService.update_user(data, id);
  }

}