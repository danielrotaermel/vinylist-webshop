import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-overlay',
  templateUrl: './card-overlay.component.html',
  styleUrls: ['./card-overlay.component.scss']
})
export class CardOverlayComponent implements OnInit {
  @Input() badgeCount: number = 0;
  @Input() cornerButton: string = 'close';
  @Input() anchorButton: string = 'expand_more';

  @ViewChild('popover') public popover;

  hideBadge = true;

  constructor() {}

  ngOnInit() {
    if (this.badgeCount > 0) {
      this.hideBadge = false;
    }
  }

  // ngAfterViewInit() {
  //   if (this.badgeCount > 0) {
  //     this.popover.open();
  //   }
  // }
}
