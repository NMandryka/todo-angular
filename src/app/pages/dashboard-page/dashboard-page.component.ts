import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from "../../shared/services/tasks.service";
import {Task} from "../../enviroments/interfaces";
import { Router} from "@angular/router";
import {catchError, Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  tasks : Task[]
  search = ''
  loading = true
  timeToDo = 'all'
  getSub: Subscription
  delSub: Subscription
  page = 1


  constructor(public tasksService: TasksService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getSub = this.tasksService.getAll().subscribe((response: Task[]) => {

      this.router.navigate([], {
        queryParams: {
          page: this.page
        }
      })

      this.tasks = response
      this.loading = false
    })
  }


  deletePost(id: string) {
    this.delSub = this.tasksService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id)
      this.alertService.success('you successfully deleted task')
    }, (err) => {
      catchError(err)
      this.alertService.danger('something went wrong')
    })
  }

  editTask(id: string) {
    this.router.navigate(['dashboard', 'tasks', 'edit', id])
  }

  ngOnDestroy() {
    if(this.getSub) {
      this.getSub.unsubscribe()
    }
    if(this.delSub) {
      this.delSub.unsubscribe()
    }
  }

  handlePageChanged(event: any) {
    this.page = event
    this.router.navigate([], {
      queryParams: {
        page: this.page
      }
    })
  }

}
