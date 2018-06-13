import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Component, Inject } from '@angular/core';

//Models
import { User } from '../models/user';
import { Credentials } from '../models/credentials';


/**
 * @author Alexander Merker
 */
@Injectable()
export class AuthService {

  private apiUrl: string;

  constructor(
    private http:Http, @Inject('BASE_URL') baseUrl: string) { 
        this.apiUrl = baseUrl + 'api/v1'
  }

/** -----------------------------------------------------------------
 *                      LOGIN / REGISTER
 *------------------------------------------------------------------*/

  //POST: /api/v1/login
  public login(data: Credentials): Observable<Credentials>{
      return this.http.post(this.apiUrl + '/login', data)
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

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}