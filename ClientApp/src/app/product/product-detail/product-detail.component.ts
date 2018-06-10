import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductPrice } from '../product-price';
import { ProductTranslation } from '../product-translation';

/** @author Janina Wachendorfer */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
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
