import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { MaterialModule } from './core/material.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderModule } from './header/header.module';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { ProductModule } from './product/product.module';
import { LocalStorageServie, StorageService } from './services/storage.service';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { UserModule } from './user/user.module';

// HttpModule is deprecated but still required somehow
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LanguageSwitcherComponent,
    FooterComponent,
    SplashscreenComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    // HttpModule is deprecated but still required somehow
    HttpModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSnackBarModule,
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
    UserModule,
    ProductModule
  ],
  providers: [
    CookieService,
    LocalStorageServie,
    { provide: StorageService, useClass: LocalStorageServie }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
