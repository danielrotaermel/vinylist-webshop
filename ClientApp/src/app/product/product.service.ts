/** @author Janina Wachendorfer */
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Product } from "./product";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private productUrl = "api/v1/products";

  // get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      //tap(products => console.log("fetched products")),
      catchError(this.handleError("getProducts", []))
    );
  }

  // get product by ID
  getProduct(id: string): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      //tap(_ => console.log(`fetched product id=${id}`)),
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

      //console.log(`${operation} failed: ${error.message}`);

      // return empty result to keep shop runnning
      return of(result as T);
    };
  }
}
