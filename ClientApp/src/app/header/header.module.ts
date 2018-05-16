import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoriesComponent } from "./categories/categories.component";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialModule } from "../core/material.module";
import { RouterModule } from "@angular/router";
import { CartOverlayComponent } from './cart-overlay/cart-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [CategoriesComponent, NavigationBarComponent, CartOverlayComponent],
  exports: [NavigationBarComponent]
})
export class HeaderModule {}
