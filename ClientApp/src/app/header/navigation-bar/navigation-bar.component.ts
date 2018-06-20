import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ProductService } from '../../product/product.service';
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
export class NavigationBarComponent implements OnInit, DoCheck {
  @ViewChild('profile') profile;

  showLogin = true;
  showRegister = false;
  loggedIn = false;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private session: SessionService,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit() {}

  ngDoCheck() {
    this.loggedIn = this.session.isLoggedIn();
    this.loggedIn ? this.hideAuthView() : this.showAuthView();
  }

  selectedFilterBy = this.productService.getFilterBy();

  toggleAuthView() {
    this.showLogin = !this.showLogin;
    this.showRegister = !this.showRegister;
  }

  hideAuthView() {
    this.showLogin = false;
    this.showRegister = false;
  }

  showAuthView() {
    this.showLogin = true;
    this.showRegister = false;
  }

  public signout() {
    this.router.navigate(['/']);
    this.authService.logout().subscribe();
  }

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
