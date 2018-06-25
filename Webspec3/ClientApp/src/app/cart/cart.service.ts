import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { Product } from '../product/product';
import { StorageService } from '../services/storage.service';
import { Cart } from './../models/cart.model';
import { SessionService } from './../services/session.service';
import { UserService } from './../services/user.service';

const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: Cart = new Cart();
  public orderableCart = {};

  // private wishlistUrl = 'api/v1/wishlist';
  private orderUrl = '/api/v1/orders';

  private products: Product[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private sessionService: SessionService,
    private storageService: StorageService
  ) {}

  public saveToLocalStorage() {
    this.storageService.setItem(CART_KEY, this.cart);
    this.storageService.setItem('orderableCart', this.orderableCart);
  }
  public getFromLocalStorage() {
    this.cart = new Cart().deserialize(this.storageService.getItem(CART_KEY));
    this.orderableCart = this.storageService.getItem('orderableCart');
  }

  // public getProductCount(productid): number {
  //   return this.orderableCart[productid];
  // }

  /**
   * initWishlist()
   * reads wishlist from localStorage if there is one
   */
  public init() {
    // get local wishlist
    if (this.storageService.getItem(CART_KEY)) {
      this.getFromLocalStorage();
    }
  }

  public setProductCount(product, count) {
    if (this.cart.items.includes(product)) {
      this.orderableCart[product.id] += 1;
      this.saveToLocalStorage();
    }
  }

  public getProductCount(product) {
    if (this.cart.items.includes(product)) {
      return this.orderableCart[product.id];
    }
  }

  // public mergeRemoteWishlist() {
  //   // if loggedin get remote wishlist and merge with localstorage
  //   this.getWishlist().subscribe(products => {
  //     this.cart.mergeProducts(products);
  //     console.log(products);

  //     this.saveToLocalStorage();
  //   });
  // }

  // public getWishlist(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.wishlistUrl).map(res => {
  //     const products = res.map(item => {
  //       const p = new Product().deserialize(item);
  //       console.log(p.image.getId());
  //       return p;
  //     });
  //     return products;
  //   });
  // }

  public addItem(product: Product): void {
    if (this.orderableCart.hasOwnProperty(product.id)) {
      this.orderableCart[product.id] += 1;
    } else {
      this.orderableCart[product.id] = 1;
    }

    this.cart.addProduct(product);
    this.saveToLocalStorage();
  }

  public removeItem(product: Product): void {
    delete this.orderableCart[product.id];
    this.cart.removeProduct(product);
    this.saveToLocalStorage();
  }

  public getGrossTotal(): number {
    return this.cart.grossTotal;
  }
  public getItemsTotal() {
    return this.cart.items.length;
  }

  public getItems(): Product[] {
    return this.cart.items;
  }

  public orderCart() {
    const url = this.orderUrl;
    const order = {
      productList: this.orderableCart
    };
    console.log(order);

    this.http
      .post<any>(url, order)
      .subscribe(res => console.log(res), (error: any) => this.handleError(error));
  }

  // public addToWishlist(id: string) {
  //   const url = this.wishlistUrl + '/' + id;
  //   this.http
  //     .post<any>(url, null)
  //     .subscribe(res => console.log(res), (error: any) => this.handleError(error));
  // }

  // public removeFromWishlist(id: string) {
  //   const url = this.wishlistUrl + '/' + id;
  //   this.http
  //     .delete<any>(url, null)
  //     .subscribe(res => console.log(res), (error: any) => this.handleError(error));
  // }

  // public deleteWishlist() {
  //   const url = this.wishlistUrl;
  //   this.http
  //     .delete<any>(url, null)
  //     .subscribe(res => console.log(res), (error: any) => this.handleError(error));
  // }

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
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
