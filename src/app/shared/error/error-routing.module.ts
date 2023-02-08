import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "./error-page/error-page.component";


const routes: Routes = [
  {path: '', component: ErrorPageComponent}
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ErrorRoutingModule { }
