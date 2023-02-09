import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {SignUpPageComponent} from "./components/sign-up-page/sign-up-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthRoutingModule} from "./auth-routing.module";



@NgModule({
  declarations: [LoginPageComponent, SignUpPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
