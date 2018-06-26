/**
 * @author Daniel Rotärmel
 */

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Product } from '../../product/product';
import { CartService } from './../../cart/cart.service';
import { ProductPrice } from './../../product/product-price';
import { ProductTranslation } from './../../product/product-translation';
import { WishlistService } from './../wishlist.service';


@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent implements OnInit {
  @Input() product: Product;
  @ViewChild('itemCount') itemCount;

  constructor(
    private translateService: TranslateService,
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  ngOnInit() {}

  getTranslationKey(): string {
    if (this.translateService.currentLang.toString() === 'de') {
      return 'de_DE';
    } else {
      return 'en_US';
    }
  }

  public setToDefault(): void {
    if (this.cartService.getProductCount(this.product) === null)
      this.cartService.setProductCount(this.product, 1);
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
