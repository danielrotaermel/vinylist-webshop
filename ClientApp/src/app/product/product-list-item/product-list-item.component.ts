/** @author Janina Wachendorfer */
import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-product-list-item",
  templateUrl: "./product-list-item.component.html",
  styleUrls: ["./product-list-item.component.scss"]
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit() {}
}
