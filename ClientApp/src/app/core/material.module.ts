/**
 * @author J. Wachendorfer
 */

import { NgModule } from '@angular/core';

// please put all your necessary modules from angular material in here!
import {
  MatSelectModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatRadioModule,
  MatCheckboxModule,
  MatBadgeModule
} from '@angular/material';

@NgModule({
  imports: [
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  exports: [
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  declarations: []
})
export class MaterialModule {}
