/**
 * @author J. Wachendorfer
 */
import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatPaginatorModule
} from '@angular/material';

/**
 * @author J. Wachendorfer
 */

// please put all your necessary modules from angular material in here!
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
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule
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
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class MaterialModule {}
