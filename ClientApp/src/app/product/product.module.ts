import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductListComponent, ProductDetailComponent, ProductListItemComponent, ProductFilterComponent]
})
export class ProductModule { }
