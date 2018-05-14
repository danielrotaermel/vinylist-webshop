import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
//HttpModule is deprecated but still required somehow
import { HttpModule } from '@angular/http'
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AngularSvgIconModule } from "angular-svg-icon";

import { AppComponent } from "./app.component";
import { UserModule } from "./user/user.module";
import { MaterialModule } from "./core/material.module";
import { LanguageSwitcherComponent } from "./language-switcher/language-switcher.component";
import { FooterComponent } from "./footer/footer.component";
import { SplashscreenComponent } from "./splashscreen/splashscreen.component";
import { HeaderModule } from "./header/header.module";
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { ApiService } from "./api.service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSwitcherComponent,
    FooterComponent,
    SplashscreenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    //HttpModule is deprecated but still required somehow
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MaterialModule,
    AngularSvgIconModule,
    HeaderModule,
    UserModule
  ],
  providers: [
    LoginService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
