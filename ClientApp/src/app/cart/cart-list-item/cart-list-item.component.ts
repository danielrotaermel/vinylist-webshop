import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Product } from '../../product/product';
import { ProductPrice } from './../../product/product-price';
import { ProductTranslation } from './../../product/product-translation';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.scss']
})
export class CartListItemComponent implements OnInit {
  @Input() product: Product;
  @ViewChild('itemCount') itemCount;

  constructor(private translateService: TranslateService, public cartService: CartService) {}

  ngOnInit() {
    // if (this.product !== null) {
    // }
  }

  updateLocalStorage() {
    this.cartService.saveToLocalStorage();
  }

  getTranslationKey(): string {
    if (this.translateService.currentLang.toString() === 'de') {
      return 'de_DE';
    } else {
      return 'en_US';
    }
  }

  // public numberInputValidator(event: any): void {
  //   this.itemCount.
  //   // console.log(event.target.value);
  //   // const pattern = /^[a-zA-Z0-9]*$/;
  //   // const pattern = /\D/g;
  //   // //let inputChar = String.fromCharCode(event.charCode)
  //   // if (!pattern.test(event.target.value)) {
  //   //   console.log(pattern.test(event.target.value));
  //   //   console.log(event.target.value.replace(pattern, ''));
  //   //   console.log(event.target.value);
  //   //   event.target.value = event.target.value.replace(pattern, '');
  //   //   // invalid character, prevent input
  //   // }
  // }

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
