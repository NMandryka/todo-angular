import {Component} from '@angular/core';
import {TasksService} from "../../core/services/tasks.service";
import {Task} from "../../core/interfaces/task/task.interface";
import {Router} from "@angular/router";
import {catchError, take} from "rxjs";
import {AlertService} from "../../shared/alert/alert.service";
import {TimeToDoEnum} from "../../core/enums/timeToDo/timeToDo.enum";


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  tasks : Task[]
  search = ''
  loading = true
  timeToDo = TimeToDoEnum.ALL
  page = 1


  constructor(public tasksService: TasksService,
              private router: Router,
              private alertService: AlertService)
  {
    this.tasksService.getAll().pipe(take(1)).subscribe((response: Task[]) => {
      this.setPageParam()
      this.tasks = response
      this.loading = false
    })

  }

  setPageParam() {
    this.router.navigate([], {
      queryParams: {
        page: this.page
      }
    })
  }

  public get timeToDoEnum(): typeof TimeToDoEnum {
    return TimeToDoEnum
  }
  deletePost(id: string) {
    this.tasksService.deleteTask(id).pipe(take(1)).subscribe(() => {
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

  handlePageChanged(event: any) {
    this.page = event
    this.setPageParam()
  }

}
