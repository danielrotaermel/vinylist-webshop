import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Product } from '../product/product';
import { StorageService } from '../services/storage.service';
import { Cart } from './../models/cart.model';
import { AuthService } from './../services/auth.service';
import { UserService } from './../user/user.service';

const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();

  private wishlistUrl = 'api/v1/wishlist';

  private products: Product[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    // get local wishlist
    const localstorage = this.storageService.get();
    if (localstorage.getItem(CART_KEY)) {
      this.loadFromLocalStorage();
    }

    // get remote wishlist and merge with local
    this.getWishlist().subscribe(products => {
      this.cart.mergeProducts(products);
      this.saveToLocalStorage();
    });
  }

  public getWishlist(): Observable<Product[]> {
    return this.http.get<Product[]>(this.wishlistUrl).map(res => {
      const products = res.map(item => {
        return new Product().deserialize(item);
      });
      return products;
    });
  }

  public addItem(product: Product): void {
    if (!this.cart.items.includes(product)) {
      this.cart.addProduct(product);
      this.addToWishlist(product.id);
      // TODO: notify everyone
      // this.calculateCart(cart);
      this.saveToLocalStorage();
      // this.dispatch(cart);
    }
  }

  private saveToLocalStorage() {
    this.storageService.get().setItem(CART_KEY, JSON.stringify(this.cart));
  }
  private loadFromLocalStorage() {
    this.cart.fromJson(JSON.parse(this.storageService.get().getItem(CART_KEY)));
  }

  public addToWishlist(id: string) {
    const url = this.wishlistUrl + '/' + id;
    this.http
      .post<any>(url, null)
      .subscribe(
        res => console.log(res),
        (error: any) => this.handleError(error)
      );
  }

  public removeFromWishlist(id: string) {
    const url = this.wishlistUrl + '/' + id;
    this.http
      .delete<any>(url, null)
      .subscribe(
        res => console.log(res),
        (error: any) => this.handleError(error)
      );
  }

  public deleteWishlist() {
    const url = this.wishlistUrl;
    this.http
      .delete<any>(url, null)
      .subscribe(
        res => console.log(res),
        (error: any) => this.handleError(error)
      );
  }

  // addToWishlist(product: Product): Observable<any> {
  //   console.log('posting:', product.id);
  //   const url = this.wishlistUrl + '/' + product.id;
  //   // return this.http.post<any>(url, null).pipe(
  //   //   tap(res => console.log('response', res)),
  //   //   catchError(e => this.handleError(e))
  //   // );
  //   let body = 'empty';
  //   return this.http
  //     .post(url, body) // ...using post request
  //     // .map((res: Response) => res.json())
  //     .catch((error: any) => this.handleError(error));
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
