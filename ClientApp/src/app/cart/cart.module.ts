import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CartListComponent, CartListItemComponent],
  exports: [CartListComponent]
})
export class CartModule {}
