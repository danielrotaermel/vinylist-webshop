import { Injectable } from '@angular/core';

import { AuthService } from './../../services/auth.service';

/**
 * @author Alexander Merker
 */
@Injectable()
export class UserDataService {
  private id;
  constructor(private authService: AuthService) {
    this.id = this.authService.get_userId();
  }

  public save(firstName, lastName, email, password) {
    const data = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password
    };
    return this.authService.update_user(data, this.id);
  }

  public delete() {
    return this.authService.delete_user(this.id);
  }
}
