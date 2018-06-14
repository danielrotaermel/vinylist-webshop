import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private cookieService: CookieService) {
    // this.cookieService.set('some_cookie', 'some_cookie');
    console.log(this.cookieService.getAll());
  }
}
