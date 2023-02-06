import {NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import { CreateTaskPageComponent } from './pages/create-task-page/create-task-page.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { TimeToDoFilterPipe } from './shared/pipes/time-to-do-filter.pipe';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { EditTaskPageComponent } from './pages/edit-task-page/edit-task-page.component';
import {AngularFireModule} from "@angular/fire/compat";
import {enviroment} from "./enviroments/enviroment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { AlertComponent } from './shared/components/alert/alert.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpPageComponent,
    DashboardPageComponent,
    CreateTaskPageComponent,
    SearchPipe,
    TimeToDoFilterPipe,
    ErrorPageComponent,
    EditTaskPageComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule


  ],
  providers: [INTERCEPTOR_PROVIDER]
})
export class AppModule { }
