import { Component, OnInit } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ProductPrice } from "../product-price";
import { ProductTranslation } from "../product-translation";

/** @author Janina Wachendorfer */
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data["product"];
  }

  getTranslationKey(): string {
    if (this.translateService.currentLang.toString() === "de") {
      return "de_DE";
    } else {
      return "en_US";
    }
  }

  getTranslation(): ProductTranslation {
    return this.product.getTranslationByKey(this.getTranslationKey());
  }

  getPrice(): ProductPrice {
    if (this.translateService.currentLang.toString() === "de") {
      return this.product.getPriceByKey("EUR");
    }
    return this.product.getPriceByKey("USD");
  }

  getProduct(id: string): void {
    this.productService.getProduct(id).subscribe(prod => (this.product = prod));
  }
}
