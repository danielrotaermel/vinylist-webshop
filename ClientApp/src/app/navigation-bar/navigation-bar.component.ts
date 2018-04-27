import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * @author J. Wachendorfer
 */
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  constructor(private translate: TranslateService) { }

  // function to change the language
  changeLang(lang: string) {
    this.translate.use(lang);
  }

  getLang() {
    return this.translate.currentLang;
  }
  
  /**
   * currently selected language
   * needed as placeholder of the select view
   */
  selected = this.getLang();

  ngOnInit() {
  }

}
