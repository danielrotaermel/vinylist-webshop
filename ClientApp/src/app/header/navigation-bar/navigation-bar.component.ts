import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ProductService } from '../../product/product.service';
import { CartService } from './../../cart/cart.service';
import { AuthService } from './../../services/auth.service';
import { SessionService } from './../../services/session.service';

/**
 * @author J. Wachendorfer, Daniel Rotärmel
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @ViewChild('profile') profile;
  @ViewChild('cart') cart;

  showLogin = true;

  constructor(
    private translate: TranslateService,
    private router: Router,
    public session: SessionService,
    private authService: AuthService,
    private productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit() {}

  selectedFilterBy = this.productService.getFilterBy();

  toggleAuthView() {
    this.showLogin = !this.showLogin;
  }

  public signout() {
    this.router.navigate(['/']);
    this.authService.logout().subscribe();
  }

  filterBy(filter: string) {
    this.productService.setFilterBy(filter);
  }

  setFilterQuery(value: string) {
    this.productService.setFilterQuery(value);
    this.productService.getProducts();
  }
}
