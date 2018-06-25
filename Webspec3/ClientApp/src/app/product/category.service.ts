import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Category } from './category';

/** @author Janina Wachendorfer */
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoryUrl = 'api/v1/categories';

  constructor(private http: HttpClient) {}

  deserializeCategories(categoriesRaw: Array<any>): Category[] {
    const categories = new Array<Category>();
    categoriesRaw.forEach(element => {
      categories.push(new Category().deserialize(element));
    });
    return categories;
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.categoryUrl)
      .pipe(
        map(categories => this.deserializeCategories(categories)),
        catchError(this.handleError<Category[]>('getCategories'))
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
