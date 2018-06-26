import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

/**
 *  @author Daniel Rotärmel
 */

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss']
})
export class OrderOverviewComponent {
  constructor(
    public translateService: TranslateService,
    public dialogRef: MatDialogRef<OrderOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTranslationKey(): string {
    if (this.translateService.currentLang.toString() === 'de') {
      return 'de_DE';
    } else {
      return 'en_US';
    }
  }
}
