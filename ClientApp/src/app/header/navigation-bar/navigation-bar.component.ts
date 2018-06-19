import { Router, RouterModule } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../product/product.service';
import { ProductListComponent } from '../../product/product-list/product-list.component';

/**
 * @author J. Wachendorfer
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @ViewChild('profile') profile;

  showRegister = false;
  showLogin = true;

  selectedFilterBy = this.productService.getFilterBy();

  toggleAuthView() {
    this.showLogin = !this.showLogin;
    this.showRegister = !this.showRegister;
  }

  constructor(
    private translate: TranslateService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {}

  test() {
    alert('Callback Test');
  }

  filterBy(filter: string) {
    this.productService.setFilterBy(filter);
  }

  setFilterQuery(value: string) {
    this.productService.setFilterQuery(value);
    this.productService.getProducts();
  }
}
