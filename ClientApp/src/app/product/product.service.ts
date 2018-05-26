import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Product } from "./product";

/** @author Janina Wachendorfer */
@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private productUrl = "api/v1/products";

  deserializeProducts(productsRaw: Array<any>): Product[] {
    let products = new Array<Product>();
    productsRaw.forEach(element => {
      products.push(new Product().deserialize(element));
    });
    return products;
  }

  // get all products
  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productUrl)
      .pipe(
        map(products => this.deserializeProducts(products)),
        catchError(this.handleError("getProducts", []))
      );
  }

  // get product by ID
  getProduct(id: string): Observable<Product> {
    const url = this.productUrl + "/" + id;
    return this.http
      .get<Product>(url)
      .pipe(
        map(product => new Product().deserialize(product)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  /**
   * Error Handling if something went wrong
   * @param operation name of the operation that failed
   * @param result some value to return to keep the app running
   */
  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // return empty result to keep shop runnning
      return of(result as T);
    };
  }
}
