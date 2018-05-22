import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../core/material.module';
import { RouterModule } from '@angular/router';
import { NavOverlayComponent } from './nav-overlay/nav-overlay.component';
import { SatPopoverModule } from '@ncstate/sat-popover';

@NgModule({
  imports: [
    SatPopoverModule,
    CommonModule,
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    CategoriesComponent,
    NavigationBarComponent,
    NavOverlayComponent
  ],
  exports: [NavigationBarComponent, NavOverlayComponent]
})
export class HeaderModule {}
