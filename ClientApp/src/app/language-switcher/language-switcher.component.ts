import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * @author J. Wachendorfer
 */
@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  constructor(private translate: TranslateService) { }

    /**
   * currently selected language
   * needed as placeholder of the select view
   */
  selected = this.getLang();

  // function to change the language
  changeLang(lang: string) {
    this.translate.use(lang);
  }

  getLang() {
    return this.translate.currentLang;
  }

  ngOnInit() {
  }

}
