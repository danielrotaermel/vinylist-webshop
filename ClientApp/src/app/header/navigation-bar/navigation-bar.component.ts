import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
/**
 * @author J. Wachendorfer
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @ViewChild('profile') profile;

  hidden = true;

  constructor(private translate: TranslateService, private router: Router) {
    console.log(this.router.url);
  }

  ngOnInit() {}

  test() {
    alert('Callback Test');
  }
}
