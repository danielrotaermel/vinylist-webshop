import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CartListComponent, CartListItemComponent],
  exports: []
})
export class CartModule {}
