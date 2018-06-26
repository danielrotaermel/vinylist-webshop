/**
 * @author Daniel Rotärmel
 */

import { Component, Input, OnInit } from '@angular/core';

import { SessionService } from './../../services/session.service';
import { WishlistService } from './../wishlist.service';


@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.scss']
})
export class WishlistListComponent implements OnInit {
  @Input('card') card;
  constructor(public wishlistService: WishlistService, public sessionService: SessionService) {}

  ngOnInit() {
    this.wishlistService.init();
  }
}
