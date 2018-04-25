import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['de', 'en']);
    // default language can easily be changed to english if we decide so
    translate.setDefaultLang('de');
    translate.use('de');
  }
}
