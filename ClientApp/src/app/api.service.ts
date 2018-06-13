import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Component, Inject } from '@angular/core';

/**
 * @author Alexander Merker
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string;
  private userid: UserID;

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'api/v1';
  }

  /** -----------------------------------------------------------------
   *                   LOGIN / REGISTER / USER CRUD
   *------------------------------------------------------------------*/

  // POST: /api/v1/login
  public login(data: Credentials): Observable<Credentials> {
    return this.http
      .post(this.apiUrl + '/login', data)
      .map(response => {
        // Save UserId, accessible by get_UserId()
        const a = response.json();
        this.userid = a.id;
        return response.json();
      })
      .catch(this.handleError);
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

  // PUT: /api/v1/user
  public update_user(data: User, id: UserID): Observable<User> {
    return this.http
      .put(this.apiUrl + '/users/' + id, data)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // GET: /api/v1/user
  public get_user(id: UserID): Observable<User> {
    return this.http
      .get(this.apiUrl + '/users/' + id)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  // DELETE: /api/v1/user
  public delete_user(id: UserID): Observable<string> {
    return this.http
      .delete(this.apiUrl + '/users/' + id)
      .map(response => {
        return 'Deleted successfully';
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

  // NOT AN API CALL - get id of current user
  public get_userId(): UserID {
    return this.userid;
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}

// TODO: Rework this into UserService
interface Credentials {
  email: string;
  password: string;
}
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface UserID {
  userID: string; // TODO: GUID type?
}
