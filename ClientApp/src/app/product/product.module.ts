import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListItemComponent } from "./product-list-item/product-list-item.component";
import { ProductFilterComponent } from "./product-filter/product-filter.component";

import { TranslateModule } from "@ngx-translate/core";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "../core/material.module";

import { ProductDetailResolver } from "./product-detail/product-detail-resolvers";

import {
  ProductListResolver,
  CategoriesResolver
} from "./product-list/product-list-resolver";
const routes: Routes = [
  {
    path: "",
    component: ProductListComponent,
    resolve: {
      products: ProductListResolver,
      categories: CategoriesResolver
    }
  },
  {
    path: "product/:id",
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
    InfiniteScrollModule
  ],
  exports: [RouterModule],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductListItemComponent,
    ProductFilterComponent
  ],
  providers: [ProductDetailResolver, ProductListResolver, CategoriesResolver]
})
export class ProductModule {}
