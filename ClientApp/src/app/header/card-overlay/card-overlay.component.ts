import {
  Component,
  Input,
  OnInit,
  Directive,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';

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
    console.log(this.popover);
  }

  // ngAfterViewInit() {
  //   if (this.badgeCount > 0) {
  //     this.popover.open();
  //   }
  // }
}

@Directive({
  selector: '[onClickClose]'
})
class onClickClose {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    console.log('hi');
    window.alert('hi');
  }
}
