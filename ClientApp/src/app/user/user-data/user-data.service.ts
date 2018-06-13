import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from "@angular/router";
import { UserDataComponent } from './user-data.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class UserDataService { 
  constructor(private apiService : ApiService){
      
  }
  
  public save(firstName, lastName, email, password, id) {
    var data;
    if(password == "" || undefined){
      data = {
        "firstName": firstName,
        "lastName": lastName,
        "email":email
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
    return this.apiService.update_user(data, id);
  }

  public delete(id) {
    return this.apiService.delete_user(id);
  }

  public fetch_userdata() {
    return this.apiService.get_current();
  }
}
