import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Component, Inject } from '@angular/core';

/**
 * @author Alexander Merker
 */
@Injectable()
export class ApiService {

  private apiUrl: string;

  constructor(
    private http:Http, @Inject('BASE_URL') baseUrl: string) { 
        this.apiUrl = baseUrl + 'api/v1'
  }

/** -----------------------------------------------------------------
 *                   LOGIN AND REGISTER
 *------------------------------------------------------------------*/

  //POST: /api/v1/login
  public login(data: Credentials): Observable<Credentials>{
      return this.http.post(this.apiUrl + '/login', data)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
  //POST: /api/v1/user
  public register(data: User): Observable<User>{
      return this.http.post(this.apiUrl + '/users', data)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
  //GET: /api/v1/logout
  public logout(): Observable<void>{
      return this.http.get(this.apiUrl + '/logout')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  //TODO: implement isAuthenticated for all other webservices!

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}

//TODO: Rework this into UserService
interface Credentials {
  email:string;
  password:string;
}
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}