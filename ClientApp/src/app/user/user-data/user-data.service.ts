import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from "@angular/router";
import { UserDataComponent } from './user-data.component';

import { ApiService } from '../../api.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class UserDataService implements OnInit { 
  
  private data;
  private id;
  constructor(private apiService : ApiService){
      
  }
  
  public save(firstName, lastName, email, password) {
    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "email":email,
        "password":password
    };
    return this.apiService.update_user(data, this.id);
  }

  public delete() {
    return this.apiService.delete_user(this.id);
  }

  ngOnInit(): void {
    this.data = this.apiService.get_current();
    this.id = this.data.id;
  }

}