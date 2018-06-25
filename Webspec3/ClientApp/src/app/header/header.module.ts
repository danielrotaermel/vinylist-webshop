import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CartModule } from '../cart/cart.module';
import { MaterialModule } from '../core/material.module';
import { UserModule } from '../user/user.module';
import { CardOverlayComponent } from './card-overlay/card-overlay.component';
import { CategoriesComponent } from './categories/categories.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    SatPopoverModule,
    UserModule,
    CartModule
  ],
  declarations: [
    CategoriesComponent,
    NavigationBarComponent,
    CardOverlayComponent
  ],
  exports: [NavigationBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // add this line
})
export class HeaderModule {}
