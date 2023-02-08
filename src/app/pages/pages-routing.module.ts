import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {CreateTaskPageComponent} from "./create-task-page/create-task-page.component";
import {EditTaskPageComponent} from "./edit-task-page/edit-task-page.component";

const routes: Routes = [
  {path: '', component: DashboardPageComponent},
  {path: 'create-task', component: CreateTaskPageComponent},
  {path: 'tasks/edit/:id', component: EditTaskPageComponent},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
