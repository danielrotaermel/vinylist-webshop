import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Product } from './../../product/product';
import { CartService } from './../cart.service';

// import { ProductService } from '../../product/product.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {
  public cart: Observable<Product[]>;
  public itemCount: number;

  private cartSubscription: Subscription;

  constructor(private cartService: CartService) {}

  // public emptyCart(): void {
  //   this.cartService.empty();
  // }

  ngOnInit() {
    this.cart = this.cartService.getWishlist();
    // this.cartSubscription = this.cart.subscribe(cart => {
    //   this.itemCount = cart.items
    //     .map(x => x.quantity)
    //     .reduce((p, n) => p + n, 0);
    // });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
