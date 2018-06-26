/**
 *  @author Daniel Rotärmel
 */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';

import { Product } from '../product/product';
import { StorageService } from '../services/storage.service';
import { Cart } from './../models/cart.model';
import { SessionService } from './../services/session.service';
import { UserService } from './../services/user.service';

const CART_KEY = 'cart';
const ORDERABLE_CART_KEY = 'orderableCart';
const ORDER_URL = '/api/v1/orders';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: Cart = new Cart();
  public orderableCart = {};
  public lastOrder = {};

  private products: Product[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private sessionService: SessionService,
    private storageService: StorageService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  public saveToLocalStorage() {
    this.storageService.setItem(CART_KEY, this.cart);
    this.storageService.setItem(ORDERABLE_CART_KEY, this.orderableCart);
  }
  public getFromLocalStorage() {
    this.cart = new Cart().deserialize(this.storageService.getItem(CART_KEY));
    this.orderableCart = this.storageService.getItem(ORDERABLE_CART_KEY);
  }

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

  /**
   * resetCart()
   * resets cart and orderableCart and saves to localStorage
   */
  public resetCart() {
    this.cart = new Cart();
    this.orderableCart = {};
    this.saveToLocalStorage();
  }

  public setProductCount(product, count) {
    if (this.cart.items.includes(product)) {
      this.orderableCart[product.id] += 1;
      this.saveToLocalStorage();
    }
  }

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

  public getCurrencyId(): string {
    return this.translateService.currentLang.toString() === 'de' ? 'EUR' : 'USD';
  }

  public orderCart(): Observable<any> {
    const url = ORDER_URL;
    const order = {
      productList: this.orderableCart,
      currencyId: this.getCurrencyId()
    };

    return this.http.post<any>(url, order).map(
      res => {
        console.log('response', res);
        res.orderProductEntities = res.orderProducts.map(item => {
          item.product = new Product().deserialize(item.product);
          return item;
        });
        this.lastOrder = res;
        this.resetCart();
        return res;
      },
      (error: any) => this.handleError(error)
    );
  }

  public getProductCount(product) {
    if (this.cart.items.includes(product)) {
      return this.orderableCart[product.id];
    }
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
