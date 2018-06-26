import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Product } from '../product';
import { ProductPrice } from '../product-price';
import { ProductTranslation } from '../product-translation';
import { CartService } from './../../cart/cart.service';

/** @author Janina Wachendorfer */
@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;

  constructor(public cartService: CartService, private translateService: TranslateService) {}

  ngOnInit() {}

  getTranslationKey(): string {
    if (this.translateService.currentLang.toString() === 'de') {
      return 'de_DE';
    } else {
      return 'en_US';
    }
  }

  getTranslation(): ProductTranslation {
    return this.product.getTranslationByKey(this.getTranslationKey());
  }

  getPrice(): ProductPrice {
    if (this.translateService.currentLang.toString() === 'de') {
      return this.product.getPriceByKey('EUR');
    }
    return this.product.getPriceByKey('USD');
  }
}
