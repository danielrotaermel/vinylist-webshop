import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './../models/user';
import { SessionService } from './session.service';
import { StorageService } from './storage.service';

/**
 * @author Alexander Merker
 */
@Injectable({
  providedIn: 'root' // makes this a singleton
})
export class AuthService {
  private apiUrl: string;

  private user: User;

  constructor(
    private http: Http,
    @Inject('BASE_URL') baseUrl: string,
    private storageService: StorageService,
    private sessionService: SessionService
  ) {
    this.apiUrl = baseUrl + 'api/v1';
    // if (this.storageService.get().getItem('isLoggedIn')) {
    //   // this.isLoggedIn = this.storageService.getItem('isLoggedIn');
    //   // console.log(localStorage.getItem('isLoggedIn'));
    // }
  }

  public isLoggedIn() {
    return this.sessionService.getUser() !== null;
  }

  // POST: /api/v1/login
  public login(data: ICredentials): Observable<ICredentials> {
    return this.http
      .post(this.apiUrl + '/login', data)
      .map(response => {
        // Save UserId, accessible by get_UserId()
        this.user = new User().deserialize(response.json());
        console.log(this.user);

        this.sessionService.setUser(this.user);
        return response.json();
      })
      .catch(this.handleError);
  }

  // GET: /api/v1/logout
  public logout(): Observable<void> {
    return this.http
      .get(this.apiUrl + '/logout')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // get id of current user
  public get_userId(): string {
    return this.user.userid;
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}

// TODO: Rework this into UserService
interface ICredentials {
  email: string;
  password: string;
}
