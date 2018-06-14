/**
 * @author Daniel Rotärmel
 */
import { Injectable } from '@angular/core';

import { User } from './../models/user.model';
import { StorageService } from './storage.service';


const SESSION_KEY = 'session.user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User;

  constructor(private storageService: StorageService) {
    // Instantiate data when service
    // is loaded
    if (this.storageService.getItem(SESSION_KEY)) {
      this.user = storageService.getItem(SESSION_KEY);
    }
  }

  /**
   * getUser()
   * get current user
   *
   * @returns {User}
   * @memberof SessionService
   */
  public getUser(): User {
    return this.user;
  }

  /**
   * setUser()
   * set session in localStorage
   *
   * @param {User} user
   * @returns SessionService
   * @memberof SessionService
   */
  public setUser(user: User) {
    // this.user = user;
    this.storageService.setItem('session.user', user);
    return this;
  }

  /**
   * destroy()
   * destroy session in localStorage
   *
   * @memberof SessionService
   */
  public destroy() {
    this.setUser(null);
  }
}
