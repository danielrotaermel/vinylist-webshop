import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ProductService } from '../product.service';
import { Product } from '../product';

/** @author Janina Wachendorfer */
@Injectable()
export class ProductDetailResolver implements Resolve<Observable<Product>> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.getProduct(route.paramMap.get('id'));
  }
}
