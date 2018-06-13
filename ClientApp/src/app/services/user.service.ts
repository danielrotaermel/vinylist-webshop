import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

/**
 * @author Alexander Merker
 */
@Injectable()
export class UserService {
  private apiUrl: string;

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'api/v1';
  }

  // POST: /api/v1/user
  public register(data: User): Observable<User> {
    return this.http
      .post(this.apiUrl + '/users', data)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // GET: /api/v1/users/current
  public getCurrentUser(): Observable<User> {
    return this.http
      .get(this.apiUrl + '/users/current')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // PUT: /api/v1/users
  public updateUser(data: User, id: string): Observable<User> {
    return this.http
      .put(this.apiUrl + '/users/' + id, data)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // GET: /api/v1/users
  public getUsers(): Observable<User[]> {
    return this.http
      .get(this.apiUrl + '/users/')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // DELETE: /api/v1/users
  public deleteUser(id: string): Observable<string> {
    return this.http
      .delete(this.apiUrl + '/users/' + id)
      .map(response => {
        return 'Deleted successfully';
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
