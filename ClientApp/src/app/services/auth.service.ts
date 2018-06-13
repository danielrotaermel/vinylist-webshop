import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * @author Alexander Merker
 */
@Injectable()
export class AuthService {
  private isLoggedIn: boolean = false;

  private apiUrl: string;
  private userid: string;

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'api/v1';
  }

  // POST: /api/v1/login
  public login(data: ICredentials): Observable<ICredentials> {
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
    return this.userid;
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
