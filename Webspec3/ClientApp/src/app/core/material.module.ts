/**
 * @author J. Wachendorfer
 */
import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

/**
 * @author J. Wachendorfer
 */

// please put all your necessary modules from angular material in here!
@NgModule({
  imports: [
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
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
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
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
