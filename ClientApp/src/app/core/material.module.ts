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
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: []
})
export class MaterialModule { }
