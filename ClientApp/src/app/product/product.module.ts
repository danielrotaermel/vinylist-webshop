import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListItemComponent } from "./product-list-item/product-list-item.component";
import { ProductFilterComponent } from "./product-filter/product-filter.component";

import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "product/:id", component: ProductDetailComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductListItemComponent,
    ProductFilterComponent
  ]
})
export class ProductModule {}
