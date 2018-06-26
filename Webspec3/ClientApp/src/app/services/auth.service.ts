import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Credentials } from './../models/credentials.model';
import { User } from './../models/user.model';
import { SessionService } from './session.service';

/**
 * @author Alexander Merker, Daniel Rotärmel
 */
@Injectable({
  providedIn: 'root' // makes this a singleton
})
export class AuthService {
  private apiUrl: string;

  constructor(
    private http: Http,
    @Inject('BASE_URL') baseUrl: string,
    private sessionService: SessionService
  ) {
    this.apiUrl = baseUrl + 'api/v1';
  }

  // POST: /api/v1/login
  public login(data: Credentials): Observable<User> {
    return this.http
      .post(this.apiUrl + '/login', data)
      .map(response => {
        // Save user in session
        const user: User = new User().deserialize(response.json());
        this.sessionService.setUser(user);
        return response.json();
      })
      .catch(this.handleError);
  }

  // GET: /api/v1/logout
  public logout(): Observable<any> {
    return this.http
      .get(this.apiUrl + '/logout')
      .map(response => {
        this.sessionService.destroy();
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
