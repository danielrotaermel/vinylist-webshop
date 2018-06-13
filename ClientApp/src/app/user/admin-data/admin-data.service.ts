import { Injectable } from '@angular/core';

import { UserService } from '../../services/user.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class AdminDataService {

  constructor(private userService : UserService){

  }

  public all_users(){
      return this.userService.getUsers();
  }

  public save(firstName, lastName, email, password, id) {
    let data;
    if(password === "" || undefined){
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
    return this.userService.updateUser(data, id);
  }

}
