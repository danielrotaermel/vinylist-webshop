import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../core/material.module';
import { RouterModule } from '@angular/router';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { RegisterComponent } from '../user/register/register.component';
import { UserModule } from '../user/user.module';
import { CardOverlayComponent } from './card-overlay/card-overlay.component';

@NgModule({
  imports: [
    CommonModule,
    AngularSvgIconModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    SatPopoverModule,
    UserModule
  ],
  declarations: [CategoriesComponent, NavigationBarComponent, CardOverlayComponent],
  exports: [NavigationBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // add this line
})
export class HeaderModule {}
