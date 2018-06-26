import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../services/storage.service';

const translations: any = { TESTING: 'Ich teste die Komponente' };

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}

class MockStorageService {
  public setItem(key: string, value: any) {}
}

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let translate: TranslateService;

  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSwitcherComponent],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        }),
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        LanguageSwitcherComponent,
        { provide: StorageService, useClass: MockStorageService }
      ]
    });
    // inject both the component and the dependent service.
    component = TestBed.get(LanguageSwitcherComponent);
    translate = TestBed.get(TranslateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use EN', () => {
    translate.use('en');
    expect(component.getLang()).toBe('en');
  });

  it('should change language to DE', () => {
    translate.use('en');
    component.changeLang('de');
    expect(component.getLang()).toBe('de');
  });
});
