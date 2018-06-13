import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from "@angular/router";
import { AdminDataComponent } from './admin-data.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class AdminDataService {

  constructor(private apiService : ApiService){
      
  }
  
  public all_users(){
      return this.apiService.get_users();
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
    return this.apiService.update_user(data, id);
  }

}