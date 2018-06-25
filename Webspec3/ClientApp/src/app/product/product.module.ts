import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../core/material.module';

import { ProductDetailResolver } from './product-detail/product-detail-resolvers';

import { ProductListResolver, CategoriesResolver } from './product-list/product-list-resolver';
import { ProductPagination } from './product-pagination';
import { MatPaginatorIntl } from '@angular/material';
const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    resolve: {
      products: ProductListResolver,
      categories: CategoriesResolver
    }
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    resolve: { product: ProductDetailResolver }
  }
];

/** @author Janina Wachendorfer */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MaterialModule,
    TranslateModule,
    FormsModule,
    InfiniteScrollModule,
    NgxPaginationModule
  ],
  exports: [RouterModule],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductListItemComponent,
    ProductFilterComponent
  ],
  providers: [
    ProductDetailResolver,
    ProductListResolver,
    CategoriesResolver,
    ProductListComponent,
    {
      provide: MatPaginatorIntl,
      useFactory: translate => {
        const service = new ProductPagination();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService]
    }
  ]
})
export class ProductModule {}
