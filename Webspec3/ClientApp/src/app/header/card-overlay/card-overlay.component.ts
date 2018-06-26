/**
 * @author Daniel Rotärmel
 */

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

  constructor() {}

  ngOnInit() {}

  isBadgeHidden() {
    return this.badgeCount === 0 ? true : false;
  }
}
