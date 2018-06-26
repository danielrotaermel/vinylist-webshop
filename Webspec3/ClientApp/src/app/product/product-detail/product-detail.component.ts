import { WishlistService } from './../../wishlist/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Product } from '../product';
import { ProductPrice } from '../product-price';
import { ProductTranslation } from '../product-translation';
import { ProductService } from '../product.service';
import { CartService } from './../../cart/cart.service';

/** @author Janina Wachendorfer */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  descriptionAvailable: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    public cartService: CartService,
    public wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.descriptionAvailable = this.checkIfAvailable('this.getTranslation().getDescription()');
  }

  navigateBack(product: Product) {
    this.router.navigate(['/']);
  }

  /**
   * Check if given string is empty or null
   * Needed for our description field to keep it empty if no product description is available
   * @param text the string to be checked
   */
  private checkIfAvailable(text: string): boolean {
    if (text && text.length > 0) {
      return true;
    }
    return false;
  }

  isGerman(): boolean {
    return this.translateService.currentLang.toString() === 'de';
  }

  getReleaseDate(): string {
    const date = this.product.getFormattedDate();
    if (this.isGerman()) {
      return date[2] + '.' + date[1] + '.' + date[0];
    }
    return date[1] + '/' + date[2] + '/' + date[0];
  }

  getTranslationKey(): string {
    if (this.isGerman()) {
      return 'de_DE';
    }
    return 'en_US';
  }

  getTranslation(): ProductTranslation {
    return this.product.getTranslationByKey(this.getTranslationKey());
  }

  getPrice(): ProductPrice {
    if (this.isGerman()) {
      return this.product.getPriceByKey('EUR');
    }
    return this.product.getPriceByKey('USD');
  }

  getProduct(id: string): void {
    this.productService.getProduct(id).subscribe(prod => (this.product = prod));
  }
}
