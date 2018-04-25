import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * @author J. Wachendorfer
 */
@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

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
