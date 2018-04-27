import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['de','en']);
    translate.setDefaultLang('en');
    
    /*
    * determines the browser language to use it automatically
    * If the browser language isn't available in the i18n files, the default language is used
    * */
    translate.use(translate.getBrowserLang());
  }
}
