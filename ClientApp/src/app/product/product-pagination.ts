import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

/**
 * @author Janina Wachendorfer
 */
export class ProductPagination extends MatPaginatorIntl {
  translate: TranslateService;
  itemsPerPageLabel = 'Items per page';
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';
  getRangeLabel = function(page, pageSize, length) {
    const of = this.translate ? this.translate.instant('PRODUCT.OF') : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('PRODUCT.ITEMS_PER_PAGE');
    this.nextPageLabel = this.translate.instant('PRODUCT.NEXT_PAGE');
    this.previousPageLabel = this.translate.instant('PRODUCT.PREV_PAGE');
  }
}
