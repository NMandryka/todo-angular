import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {SignUpPageComponent} from "./components/sign-up-page/sign-up-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: LoginPageComponent
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent
  }
]
@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
