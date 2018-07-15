import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ProtectedComponent} from './protected/protected.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./modules/service/auth.interceptor";
import {AuthGuard} from "./app-routing/guards/auth.guard";
import {AdminLayoutComponent} from './_layouts/admin-layout/admin-layout.component';
import {FooterComponent} from './_layouts/footer/footer.component';
import {
    MatButtonModule,
    MatDialogModule, MatIconModule, MatListModule, MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule, MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AdminSidebarComponent} from "./_layouts/admin-sidebar/admin-sidebar.component";
import {MediaMatcher} from "@angular/cdk/layout";
import {NotificationService} from "./modules/notification/notification.service";
import {HotkeyModule} from "angular2-hotkeys";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LoaderComponent} from './_layouts/loader/loader.component';
import {LoaderService} from "./modules/loader/loader.service";
import {DeleteConfirmDialogComponent} from './_layouts/delete-confirm-dialog/delete-confirm-dialog.component';
import {BreadcrumbsComponent} from './_layouts/breadcrumbs/breadcrumbs.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HeaderComponent} from "./_layouts/header/header.component";
import {AppErrorHandler} from "./modules/error/app.error.handler";
import {ErrorService} from "./modules/error/error.service";
import {ErrorComponent} from './error/error.component';
import {ConfigService} from "./modules/config/config.service";
import {TwitterModule} from "./twitter/twitter.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProtectedComponent,
    AdminLayoutComponent,
    AdminSidebarComponent,
    FooterComponent,
    LoaderComponent,
    DeleteConfirmDialogComponent,
    BreadcrumbsComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ErrorComponent,
  ],
  imports: [
    // angular modules
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HotkeyModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),

    // material modules
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,

    // custom modules
    TwitterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    MediaMatcher,
    NotificationService,
    LoaderService,
    ErrorService,
    ConfigService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteConfirmDialogComponent]
})
export class AppModule {}
