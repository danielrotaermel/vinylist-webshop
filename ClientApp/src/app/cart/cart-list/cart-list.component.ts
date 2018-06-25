import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  @Input('card') card;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cartService.init();
  }
}
