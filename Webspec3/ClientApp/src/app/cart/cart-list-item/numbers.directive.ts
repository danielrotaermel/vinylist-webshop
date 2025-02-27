/**
 *  @author Daniel Rotärmel
 */

import { Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[numbers]'
})
export class NumbersDirective {
  constructor(public el: ElementRef) {
    this.el.nativeElement.onkeypress = evt => {
      if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
      }
    };
  }
}
