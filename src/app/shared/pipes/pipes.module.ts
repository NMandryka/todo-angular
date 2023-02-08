import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchPipe} from "./search.pipe";
import {TimeToDoFilterPipe} from "./time-to-do-filter.pipe";



@NgModule({
  declarations: [SearchPipe, TimeToDoFilterPipe],
  exports: [
    SearchPipe,
    TimeToDoFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
