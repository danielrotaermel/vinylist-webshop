import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
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
    MatDialogModule,
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
    MatPaginatorModule,
    MatListModule
  ],
  exports: [
    MatDialogModule,
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
    MatPaginatorModule,
    MatListModule
  ],
  declarations: []
})
export class MaterialModule {}
