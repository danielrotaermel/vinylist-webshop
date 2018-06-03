import { Component, OnInit } from "@angular/core";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { Category } from "../category";
import { CategoriesService } from "../category.service";

import { ActivatedRoute } from "@angular/router";

/** @author Janina Wachendorfer */
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  products: Product[];
  categories: Category[];
  checked = false;
  disabled = true;
  selectable: boolean = true;
  removable: boolean = true;
  selectedGenres = [];

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products = this.route.snapshot.data["products"];
    this.categories = this.route.snapshot.data["categories"];
  }

  resetProducts() {
    this.productService.getProducts().subscribe(prod => (this.products = prod));
  }

  switchCategory(category: Category) {
    this.productService
      .getProductsWithCategory(category)
      .subscribe(prod => (this.products = prod));
  }

  addGenre(genre: string) {
    this.selectedGenres.push(genre);
  }

  remove(genre: string): void {
    let index = this.selectedGenres.indexOf(genre);

    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
    }
  }

  manageChips(category: Category) {
    if (!this.checked) {
      this.addGenre(category.getTitle());
    } else {
      this.remove(category.getTitle());
    }
  }
}
