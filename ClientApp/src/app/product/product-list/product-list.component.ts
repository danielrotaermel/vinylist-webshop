import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Category } from '../category';
import { CategoriesService } from '../category.service';

import { ActivatedRoute } from '@angular/router';

/** @author Janina Wachendorfer */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  categories: Category[];
  disabled = true;
  selectable: boolean = true;
  removable: boolean = true;
  selectedGenres = [];
  selectedSortBy = this.productService.getSortBy();
  selectedSortDirection = this.productService.getSortDirection();
  currentPage = this.productService.getCurrentPage();
  pageSize = this.productService.getItemsPerPage();
  total = this.productService.getTotalItems();

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products = this.route.snapshot.data['products'];
    this.categories = this.route.snapshot.data['categories'];
  }

  /**
   * resets category filters etc.
   */
  resetProducts() {
    this.productService.getProducts().subscribe(prod => (this.products = prod));
  }

  /**
   * selects products of given category - not implemented yet, but soon will be :-)
   * @param category category after which products should be filtered
   */
  switchCategory(category: Category) {
    this.productService.getProductsWithCategory(category).subscribe(prod => (this.products = prod));
  }

  /**
   * adds genre to the array of selected genres
   * @param genre genre which will be added
   */
  addGenre(genre: string) {
    this.selectedGenres.push(genre);
  }

  /**
   * checks if array of selected genres already contains the given genre
   * @param genre genre which should be checked
   */
  hasGenre(genre: string): boolean {
    if (this.selectedGenres.indexOf(genre) > -1) {
      return true;
    }
    return false;
  }

  /**
   * remove genre from the array of selected genres
   * @param genre genre which should be removed
   */
  remove(genre: string): void {
    let index = this.selectedGenres.indexOf(genre);

    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
    }
  }

  /**
   * for infinity scrolling
   */
  onScroll() {
    this.productService.setPage(this.productService.getPage() + +1);
    this.productService.getProducts().subscribe(prod =>
      prod.forEach(element => {
        this.products.push(element);
      })
    );
  }

  /**
   * manages the chips appearing on the top of the page after selecting one category
   * @param category just selected category to be added as chip
   */
  manageChips(category: Category) {
    if (!this.disabled && !this.hasGenre(category.getTitle())) {
      this.addGenre(category.getTitle());
    } else {
      this.remove(category.getTitle());
    }
  }

  /**
   * not implemented yet... but will sort the results
   * @param sort string after which results shall be sorted (Artist, Label or ReleaseDate)
   */
  sortBy(sort: string) {
    this.productService.setSortBy(sort);
    this.resetProducts();
  }

  /**
   * changes sort direction to be ascending or descending
   * @param dir ASC (ascending) or DESC (descending)
   */
  changeSortDirection(dir: string) {
    this.productService.setSortDirection(dir);
    this.resetProducts();
  }
}
