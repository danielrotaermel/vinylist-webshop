import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  constructor(private translate: TranslateService, private storageService: StorageService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('en');

    /*
    * Checks, if the user has already selected a language which was put in the local storage.
    * If no language is found, the browser language gets selected automatically.
    * If the browser language isn't available in the i18n files, the default language (english) is used
    * */
    if (storageService.getItem('language')) {
      translate.use(storageService.getItem('language'));
    } else {
      translate.use(translate.getBrowserLang());
    }
  }
}
