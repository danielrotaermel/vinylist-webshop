import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../core/material.module';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { NumbersDirective } from './cart-list-item/numbers.directive';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, TranslateModule, FormsModule],
  declarations: [CartListComponent, CartListItemComponent, NumbersDirective],
  exports: [CartListComponent]
})
export class CartModule {}
