import { Injectable } from '@angular/core';

import { User } from './../models/user.model';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

/**
 * @author Daniel Rotärmel
 */
const SESSION_KEY = 'session.user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user: User;

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  private init() {
    // Instantiate data when service
    // is loaded
    if (this.storageService.getItem(SESSION_KEY)) {
      this.user = this.getUser();
    }
    // call backend and ensure login state is consistent
    this.userService.getCurrentUser().subscribe(user => {
      if (this.user === null) {
        // destroy session if getuser is null
        this.destroy();
      } else {
        this.setUser(user);
      }
    });
  }

  /**
   * isLoggedIn()
   * checks if user is available in session
   * only use for local state
   * e.g. only show login view if !isLoggedIn()
   *
   * @returns
   * @memberof SessionService
   */
  public isLoggedIn() {
    return this.getUser() !== null;
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
