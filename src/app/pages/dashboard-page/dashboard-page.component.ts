import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TasksService} from "../../shared/services/tasks.service";
import {Task} from "../../enviroments/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit{
  tasks : Task[]
  search = ''
  loading = true
  timeToDo = 'all'

  constructor(public tasksService: TasksService, private router: Router) {
  }

  ngOnInit() {
    this.tasksService.getAll().subscribe((response: Task[]) => {
      this.tasks = response
      this.loading = false
    })
  }


  deletePost(id: string) {
    this.tasksService.deleteTask(id).subscribe((response) => {
      this.tasks = this.tasks.filter(task => task.id !== id)
    })
  }

  editTask(id: string) {
    this.router.navigate(['dashboard', 'tasks', 'edit', id])
  }
}
