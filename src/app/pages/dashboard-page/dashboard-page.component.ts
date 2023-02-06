import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TasksService} from "../../shared/services/tasks.service";
import {Task} from "../../enviroments/interfaces";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{
  tasks : Task[]

  constructor(public tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.getAll().subscribe((response: Task[]) => {
      console.log(response)
      this.tasks = response
    })
  }

  addTask() {

  }

}
