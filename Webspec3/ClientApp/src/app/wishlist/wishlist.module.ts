/**
 * @author Daniel Rotärmel
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './../core/material.module';
import { WishlistItemComponent } from './wishlist-item/wishlist-item.component';
import { WishlistListComponent } from './wishlist-list/wishlist-list.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, TranslateModule, FormsModule],
  declarations: [WishlistListComponent, WishlistItemComponent],
  exports: [WishlistListComponent]
})
export class WishlistModule {}
