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

  //POST: /api/v1/login
  public login(data: Credentials): Observable<Credentials>{
      console.log("call login");
      return this.http.post(this.apiUrl + '/login', data)
      .map(response => {
        console.log("api resp");
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

interface Credentials {
  email:string;
  password:string;
}