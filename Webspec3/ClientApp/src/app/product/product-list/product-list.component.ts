import { Component, OnInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductPrice } from '../product-price';
import { ProductTranslation } from '../product-translation';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Category } from '../category';
import { CategoriesService } from '../category.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageEvent, MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';

/** @author Janina Wachendorfer, Alexander Merker */
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
  selectedView: string = 'normal';
  currentPage = this.productService.getCurrentPage();
  totalItems = this.productService.getTotalItems();
  subscription: Subscription;
  priceKey: string;
  pageSizeOptions = [9, 18, 36];
  pageEvent: PageEvent;

  private paginator: MatPaginator;

  displayedColumns = ['artist', 'title', 'price', 'favorite', 'cart'];

  paginatorOptions = {
    itemsPerPage: 9,
    currentPage: this.currentPage,
    totalItems: this.totalItems
  };

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router
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

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    if (this) {
      this.paginator = mp;
      this.paginator.page.pipe(tap(() => this.changePagingSettings())).subscribe();
    }
  }
  changePagingSettings() {
    this.paginatorOptions.totalItems = this.pageEvent.length;
    this.productService.setItemsPerPage(this.pageEvent.pageSize);
    this.paginatorOptions.itemsPerPage = this.pageEvent.pageSize;
    this.productService.setPage(this.pageEvent.pageIndex + 1);
    this.paginatorOptions.currentPage = this.pageEvent.pageIndex;
    this.refreshProducts();
  }

  getTranslationKey(): string {
    if (this.translateService.currentLang.toString() === 'de') {
      return 'de_DE';
    } else {
      return 'en_US';
    }
  }

  /**
   * extra navigation needed for the table view;
   * in the "normal" view, the navigation is handled within the product list item
   * @param product
   */
  navigateToDetails(product: Product) {
    this.router.navigate(['/product', product.id]);
  }

  /**
   *
   * @param product
   */
  getTranslation(product: Product): ProductTranslation {
    return product.getTranslationByKey(this.getTranslationKey());
  }

  /**
   * returns price by given key for a specific product;
   * afterwards calls the product-function on the given product to get the correct price
   * @param product the product of which the price is required
   */
  getPrice(product: Product): ProductPrice {
    if (this.translateService.currentLang.toString() === 'de') {
      return product.getPriceByKey('EUR');
    }
    return product.getPriceByKey('USD');
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
   * for pagination; changes current page to a given value
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

  /**
   * Changes active view - to normal view (default) or table view
   * @param view "normal" or "table"
   */
  changeActiveView(view: string) {
    this.selectedView = view;
    this.paginatorOptions.itemsPerPage = 9;
    this.productService.setItemsPerPage(this.paginatorOptions.itemsPerPage);
    this.paginatorOptions.currentPage = 0;
    this.productService.setPage(this.paginatorOptions.currentPage + 1);
    this.refreshProducts();
  }
}
