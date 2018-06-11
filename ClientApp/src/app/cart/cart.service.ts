import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './../product/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private wishlistUrl = 'api/v1/wishlist';

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<Product[]> {
    console.log('getting');
    return this.http.get<Product[]>(this.wishlistUrl).map(res => {
      const products = res.map(item => {
        return new Product().deserialize(item);
      });
      return products;
    });
  }
}
