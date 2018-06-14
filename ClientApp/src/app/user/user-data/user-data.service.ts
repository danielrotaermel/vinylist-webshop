import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { UserDataComponent } from './user-data.component';

import { UserService } from '../../services/user.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class UserDataService {
  constructor(private userService: UserService) {}

  public save(firstName, lastName, email, password, id) {
    var data;
    if (password == '' || undefined) {
      data = {
        firstName: firstName,
        lastName: lastName,
        email: email
      };
    } else {
      data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
    }
    return this.userService.update_user(data, id);
  }

  public delete(id) {
    return this.userService.delete_user(id);
  }

  public fetch_userdata() {
    return this.userService.get_current();
  }
}
