import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {AngularFireModule} from "@angular/fire/compat";
import {enviroment} from "../enviroments/enviroment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {CommonModule} from "@angular/common";
import {AuthModule} from "./shared/auth/auth.module";
import {PagesModule} from "./pages/pages.module";
import {PipesModule} from "./shared/pipes/pipes.module";
import {AlertModule} from "./shared/alert/alert.module";
import {ErrorModule} from "./shared/error/error.module";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireAuthModule,
    AuthModule,
    PagesModule,
    AlertModule,
    ErrorModule

  ],
  providers: [INTERCEPTOR_PROVIDER]
})
export class AppModule { }
