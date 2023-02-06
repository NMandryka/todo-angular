import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SignUpPageComponent} from "./pages/sign-up-page/sign-up-page.component";
import {DashboardPageComponent} from "./pages/dashboard-page/dashboard-page.component";
import {AuthGuard} from "./shared/services/auth.guard";
import {CreateTaskPageComponent} from "./pages/create-task-page/create-task-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'signUp',component: SignUpPageComponent},
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [
      AuthGuard
    ]},
  {path: 'create-task', component: CreateTaskPageComponent, canActivate: [
      AuthGuard
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
