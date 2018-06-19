import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Category } from '../category';
import { CategoriesService } from '../category.service';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

/** @author Janina Wachendorfer */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  categories: Category[];
  disabled = true;
  selectable: boolean = true;
  removable: boolean = true;
  selectedSortBy = this.productService.getSortBy();
  selectedSortDirection = this.productService.getSortDirection();
  currentPage = this.productService.getCurrentPage();
  totalItems = this.productService.getTotalItems();
  subscription: Subscription;

  paginatorOptions = {
    itemsPerPage: 9,
    currentPage: this.currentPage,
    totalItems: this.totalItems
  };

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products = this.route.snapshot.data['products'];
    this.categories = this.route.snapshot.data['categories'];
    this.subscription = this.productService.productsChanged.subscribe(prod => {
      this.products = prod;
      this.paginatorOptions.currentPage = this.productService.getCurrentPage();
      this.paginatorOptions.totalItems = this.productService.getTotalItems();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.resetProducts();
  }

  refreshProducts() {
    this.productService.getProducts().subscribe(prod => (this.products = prod));
  }

  /**
   * resets category filters etc.
   */
  resetProducts() {
    this.productService.setCategoryFilter(null);
    this.refreshProducts();
  }

  /**
   * selects products of given category - not implemented yet, but soon will be :-)
   * @param category category after which products should be filtered
   */
  switchCategory(category: Category) {
    this.productService.setCategoryFilter(category);
    this.refreshProducts();
  }

  /**
   * for pagination
   */
  pageChange(newPage) {
    this.productService.setPage(newPage);
    this.refreshProducts();
  }

  /**
   * will sort the results by a specific string
   * @param sort string after which results shall be sorted (Artist, Label or ReleaseDate)
   */
  sortBy(sort: string) {
    this.productService.setSortBy(sort);
    this.refreshProducts();
  }

  /**
   * changes sort direction to be ascending or descending
   * @param dir ASC (ascending) or DESC (descending)
   */
  changeSortDirection(dir: string) {
    this.productService.setSortDirection(dir);
    this.refreshProducts();
  }
}
