import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subscription, Subject } from 'rxjs';
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
  private filterByCategory: Category;
  private filterBy: string = 'Artist';
  private filterQuery: string;

  private page: number = 1;
  private pageCount: number;
  private totalItems: number = 1;
  private itemsPerPage: number = 9;

  private sortByField: string = 'sortBy';
  private sortDirectionField: string = 'sortDirection';
  private languageCodeField: string = 'languageCode';
  private pageField: string = 'Page';
  private itemsPerPageField: string = 'ItemsPerPage';
  private filterByCategoryField: string = 'FilterByCategory';
  private filterByField: string = 'FilterBy';
  private filterQueryField: string = 'FilterQuery';

  private currentProducts: Product[];

  /**
   * Subject which can be used to get informed that the products have been changed
   */
  productsChanged = new Subject<Product[]>();

  /**
   * Setter for "sort by" value
   * @param sort can be 'Artist', 'Label' or 'ReleaseDate'
   */
  public setSortBy(sort: string) {
    this.sortBy = sort;
  }

  /**
   * Setter for category filtering
   * @param category the category after which results shall be filtered
   */
  public setCategoryFilter(category: Category) {
    this.filterByCategory = category;
  }

  /**
   * Setter for "filterBy" value
   * @param filter can be 'Artist', 'Label', 'ReleaseDate', 'Description', 'DescriptionShort' or 'Title'
   */
  public setFilterBy(filter: string) {
    this.filterBy = filter;
  }

  /**
   * Setter for query to filter products
   * @param query string after what you want to search
   */
  public setFilterQuery(query: string) {
    this.filterQuery = query;
  }

  public setPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.pageCount) {
      this.page = newPage;
    }
  }

  public setCurrentProducts(products: Product[]) {
    this.currentProducts = products;
  }

  public setItemsPerPage(items: number) {
    this.itemsPerPage = items;
  }

  public getPage(): number {
    return this.page;
  }

  public getFilterBy(): string {
    return this.filterBy;
  }

  public getSortBy(): string {
    return this.sortBy;
  }

  public getSortDirection(): string {
    return this.sortDirection;
  }

  public getTotalItems(): number {
    return this.totalItems;
  }

  public getPageCount(): number {
    return this.pageCount;
  }

  public getCurrentPage(): number {
    return this.page;
  }

  public getItemsPerPage(): number {
    return this.itemsPerPage;
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
    if (!value || value === null || value.length === 0) {
      return '';
    } else {
      return '&' + field + '=' + value;
    }
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
    if (this.filterByCategory != null) {
      url += this.addParam(this.filterByCategoryField, this.filterByCategory.getId());
    }
    url += this.addParam(this.pageField, this.page);
    url += this.addParam(this.itemsPerPageField, this.itemsPerPage);
    url += this.addParam(this.sortDirectionField, this.sortDirection);
    url += this.addParam(this.languageCodeField, this.languageCode);
    url += this.addParam(this.filterByField, this.filterBy);
    url += this.addParam(this.filterQueryField, this.filterQuery);

    return url;
  }

  deserializePagedProducts(productsPages: any): Product[] {
    this.pageCount = productsPages.pageCount;
    this.totalItems = productsPages.totalItems;
    console.log(this.totalItems);
    const products = new Array<Product>();
    productsPages.items.forEach(element => {
      products.push(new Product().deserialize(element));
    });
    this.currentProducts = products;

    this.productsChanged.next(this.currentProducts);
    return products;
  }

  // get all products
  getProducts(): Observable<Product[]> {
    this.updateProducts();
    return Observable.of(this.currentProducts);
  }

  private updateProducts() {
    this.fetchProducts().subscribe();
  }

  private fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.applyParameters(this.productUrl)).pipe(
      map(products => this.deserializePagedProducts(products)),
      catchError(this.handleError('getProducts', []))
    );
  }

  // get product by ID
  getProduct(id: string): Observable<Product> {
    const url = this.productIdUrl + '/' + id;
    const pos = this.currentProducts.findIndex(prod => prod.id === id);
    if (pos > -1) {
      return Observable.of(this.currentProducts[pos]);
    }
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
}
