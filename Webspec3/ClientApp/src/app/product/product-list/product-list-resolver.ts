import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Category } from '../category';
import { CategoriesService } from '../category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

/** @author Janina Wachendorfer */
@Injectable()
export class ProductListResolver implements Resolve<Observable<Product[]>> {
  constructor(private productService: ProductService) {}

  resolve() {
    return this.productService.getProducts();
  }
}

@Injectable()
export class CategoriesResolver implements Resolve<Observable<Category[]>> {
  constructor(private categoriesService: CategoriesService) {}

  resolve() {
    return this.categoriesService.getCategories();
  }
}
