import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { MaterialModule } from './core/material.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderModule } from './header/header.module';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { ProductModule } from './product/product.module';
import { LocalStorageService, StorageService } from './services/storage.service';
import { UserModule } from './user/user.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, LanguageSwitcherComponent, FooterComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
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
    UserModule,
    ProductModule
  ],
  providers: [LocalStorageService, { provide: StorageService, useClass: LocalStorageService }],
  bootstrap: [AppComponent]
})
export class AppModule {}
