import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Credentials } from './../models/credentials.model';
import { User } from './../models/user.model';
import { SessionService } from './session.service';
import { StorageService } from './storage.service';

/**
 * @author Alexander Merker, Daniel Rotärmel
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
  }

  public isLoggedIn() {
    return this.sessionService.getUser() !== null;
  }

  // POST: /api/v1/login
  public login(data: Credentials): Observable<Credentials> {
    return this.http
      .post(this.apiUrl + '/login', data)
      .map(response => {
        // Save user in session
        this.user = new User().deserialize(response.json());
        this.sessionService.setUser(this.user);
        console.log(this.user);
        return response.json();
      })
      .catch(this.handleError);
  }

  // GET: /api/v1/logout
  public logout(): Observable<void> {
    return this.http
      .get(this.apiUrl + '/logout')
      .map(response => {
        this.sessionService.destroy();
        return response.json();
      })
      .catch(this.handleError);
  }

  // get id of current user
  public getUserId(): string {
    return this.user.userid;
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
