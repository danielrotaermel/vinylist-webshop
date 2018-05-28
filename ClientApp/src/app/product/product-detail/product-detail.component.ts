import { Component, OnInit } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { ActivatedRoute } from "@angular/router";

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data["product"];
  }

  getProduct(id: string): void {
    this.productService.getProduct(id).subscribe(prod => (this.product = prod));
  }
}
