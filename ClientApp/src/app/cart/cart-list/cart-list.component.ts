import { CartService } from './../cart.service';
import { Product } from './../../product/product';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  public cart: Product[];

  constructor(private cartService: CartService) {
    this.cartService.getWishlist().subscribe(cart => {
      this.cart = cart;
      console.log(cart);
    });
    console.log('cart-list');
  }

  ngOnInit() {}
}
