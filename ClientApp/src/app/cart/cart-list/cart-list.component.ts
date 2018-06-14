import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Product } from './../../product/product';
import { AuthService } from './../../services/auth.service';
import { CartService } from './../cart.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  public cart: Observable<Product[]>;
  public itemCount: number;

  private cartSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // read wishlit from localstorage
    // resolve wishlist if loggedin
    // this.cartService.resolveWishlist();
  }
}
