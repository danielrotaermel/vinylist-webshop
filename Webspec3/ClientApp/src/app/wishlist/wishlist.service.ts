/**
 * @author Daniel Rotärmel
 */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';

import { Product } from '../product/product';
import { StorageService } from '../services/storage.service';
import { SessionService } from './../services/session.service';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistUrl = 'api/v1/wishlist';
  public wishlist: Observable<Product[]>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private sessionService: SessionService,
    private storageService: StorageService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  public init() {
    // get wishlist
    // if (this.sessionService.isLoggedIn()) {
    this.wishlist = this.getWishlist();
    // }
  }

  public addItem(product: Product) {
    console.log('adding');

    const url = this.wishlistUrl + '/' + product.id;
    this.http
      .post<any>(url, null)
      .subscribe(
        res => this.getWishlist().subscribe(res => (this.wishlist = Observable.of(res))),
        (error: any) => this.handleError(error)
      );
  }

  public updateWishlist() {
    this.getWishlist().subscribe(res => (this.wishlist = Observable.of(res)));
  }

  public getWishlist(): Observable<Product[]> {
    return this.http.get<Product[]>(this.wishlistUrl).map(res => {
      const products = res.map(item => {
        const p = new Product().deserialize(item);
        console.log('get', p);
        return p;
      });
      return products;
    });
  }

  public removeItem(product: Product) {
    const url = this.wishlistUrl + '/' + product.id;
    this.http
      .delete<any>(url)
      .subscribe(
        res => this.getWishlist().subscribe(res => (this.wishlist = Observable.of(res))),
        (error: any) => this.handleError(error)
      );
  }

  public deleteWishlist() {
    const url = this.wishlistUrl;
    this.http
      .delete<any>(url)
      .subscribe(
        res => res => this.getWishlist().subscribe(res => (this.wishlist = Observable.of(res))),
        (error: any) => this.handleError(error)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
