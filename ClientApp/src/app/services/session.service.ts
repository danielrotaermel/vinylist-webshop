import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User;

  constructor(private storageService: StorageService) {
    // Instantiate data when service
    // is loaded
    this.user = storageService.getItem('session.user');
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User) {
    // this.user = user;
    this.storageService.setItem('session.user', user);
    return this;
  }

  /**
   * Destroy session
   */
  public destroy() {
    this.setUser(null);
  }
}
