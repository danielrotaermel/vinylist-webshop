import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * @author J. Wachendorfer
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  constructor(private translate: TranslateService) { }

  // currently selected language
  selectedLang = this.getLang();

  // function to change the language
  langSelectHandler(event: any) {
    this.translate.use(event.target.value);
  }

  getLang() {
    return this.translate.currentLang;
  }

  ngOnInit() {
  }

}
