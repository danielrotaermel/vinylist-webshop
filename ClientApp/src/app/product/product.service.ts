import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import { Category } from './category';

/** @author Janina Wachendorfer */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private productUrl = 'api/v1/products/paged';
  private productIdUrl = 'api/v1/products';

  private sortBy: string = 'Artist';
  private sortDirection: string = 'ASC';
  private languageCode: string = 'de_DE';
  private page: number = 1;
  private pageCount: number;

  private sortByField: string = 'sortBy';
  private sortDirectionField: string = 'sortDirection';
  private launguageCodeField: string = 'languageCode';
  private pageField: string = 'Page';

  /**
   * Setter for "sort by" value
   * @param sort can be Artist, Label or ReleaseDate
   */
  public setSortBy(sort: string) {
    this.sortBy = sort;
  }

  /**
   * Setter for sort direction
   * @param direction can be ASC (ascending) oder DSC (descending)
   */
  public setSortDirection(direction: string) {
    this.sortDirection = direction;
  }

  /**
   * Setter for language code
   * @param language can be "de_DE" or "en_US"
   */
  public setLanguageCode(language: string) {
    this.languageCode = language;
  }

  /**
   * add params for appending them at an url
   * @param field Field (e.g. "sortBy")
   * @param value the Field's value (e.g. "Artist")
   */
  private addParam(field: string, value: any) {
    return '&' + field + '=' + value;
  }

  /**
   * Applies parameter (sortBy, sortDirection, LanguageCode and current page) to url
   * @param url url on which the parameters should be applied
   */
  private applyParameters(url: string): string {
    if (url.indexOf('?') === -1) {
      url += '?' + this.sortByField + '=' + this.sortBy;
    } else {
      url += this.addParam(this.sortByField, this.sortBy);
    }
    url += this.addParam(this.sortDirectionField, this.sortDirection);
    url += this.addParam(this.launguageCodeField, this.languageCode);
    url += this.addParam(this.pageField, this.page);
    return url;
  }

  deserializeProducts(productsPages: any): Product[] {
    this.pageCount = productsPages.pageCount;
    const products = new Array<Product>();
    productsPages.items.forEach(element => {
      products.push(new Product().deserialize(element));
    });
    return products;
  }

  /**
   * gets products by category
   * attention! doesn't work yet! Will be fixed soon :-)
   * @param category
   */
  getProductsWithCategory(category: Category): Observable<Product[]> {
    const url = this.productUrl + '?categoryId=' + category.getId();
    return this.http.get<Product[]>(this.applyParameters(url)).pipe(
      map(products => this.deserializeProducts(products)),
      catchError(this.handleError<Product[]>('getProducts'))
    );
  }

  // get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.applyParameters(this.productUrl)).pipe(
      map(products => this.deserializeProducts(products)),
      catchError(this.handleError('getProducts', []))
    );
  }

  // get product by ID
  getProduct(id: string): Observable<Product> {
    const url = this.productIdUrl + '/' + id;
    return this.http.get<Product>(url).pipe(
      map(product => new Product().deserialize(product)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /**
   * Error Handling if something went wrong
   * @param operation name of the operation that failed
   * @param result some value to return to keep the app running
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // return empty result to keep shop runnning
      return of(result as T);
    };
  }

  getPage(): number {
    return this.page;
  }

  setPage(newPage: number) {
    // && newPage <= this.pageCount if backend is able to tell the correct counts
    if (newPage >= 1) {
      this.page = newPage;
    }
  }
}
