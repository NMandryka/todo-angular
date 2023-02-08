import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesRoutingModule} from "./pages-routing.module";
import {CreateTaskPageComponent} from "./create-task-page/create-task-page.component";
import {EditTaskPageComponent} from "./edit-task-page/edit-task-page.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {PipesModule} from "../shared/pipes/pipes.module";

@NgModule({
  declarations: [
    CreateTaskPageComponent,
    EditTaskPageComponent,
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    PipesModule,

  ]
})
export class PagesModule { }
