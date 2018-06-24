import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../services/storage.service';

/**
 * @author J. Wachendorfer
 */
@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
  constructor(private translate: TranslateService, private storageService: StorageService) {}

  /**
   * currently selected language
   * needed as placeholder of the select view
   */
  selected = this.getLang();

  // function to change the language
  changeLang(lang: string) {
    this.translate.use(lang);

    // put in local storage to use the selected language when user returns to the page
    this.storageService.setItem('language', lang);
  }

  getLang() {
    return this.translate.currentLang;
  }

  ngOnInit() {}
}
