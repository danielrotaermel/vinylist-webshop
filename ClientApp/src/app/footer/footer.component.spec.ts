import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from '../test-helper/mock.component';
import { FooterComponent } from './footer.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';
let translations: any = {"TESTING": "Ich teste die Komponente"};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}
describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent,
        MockComponent({ selector: 'app-language-switcher' }) ],
        imports: [
          AngularSvgIconModule,
          TranslateModule.forRoot({
            loader: {provide: TranslateLoader, useClass: FakeLoader}
          }),
          HttpClientModule,
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
