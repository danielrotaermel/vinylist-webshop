import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MockComponent } from "../test-helper/mock.component";
import { NavigationBarComponent } from "./navigation-bar.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import {
  TranslateService,
  TranslateLoader,
  TranslateModule
} from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { MaterialModule } from "../angular-material/material.module";
let translations: any = { TESTING: "Ich teste die Komponente" };

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}
describe("NavigationBarComponent", () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationBarComponent,
        MockComponent({ selector: "app-language-switcher" })
      ],
      imports: [
        AngularSvgIconModule,
        MaterialModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        }),
        HttpClientModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
