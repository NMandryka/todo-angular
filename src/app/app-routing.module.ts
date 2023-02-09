import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {DashboardPageComponent} from "./pages/dashboard-page/dashboard-page.component";




const routes: Routes = [
  {path: '', component: DashboardPageComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'dashboard', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  {path: '**', loadChildren: () => import('./shared/error/error.module').then(m => m.ErrorModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],

})
export class AppRoutingModule { }
