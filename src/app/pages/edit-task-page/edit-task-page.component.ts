import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../../core/services/tasks.service";
import {Task} from "../../core/interfaces/task/task.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, take} from "rxjs";
import {AlertService} from "../../shared/alert/alert.service";
import {TimeToDoEnum} from "../../core/enums/timeToDo/timeToDo.enum";

@Component({
  selector: 'app-edit-task-page',
  templateUrl: './edit-task-page.component.html',
  styleUrls: ['./edit-task-page.component.scss']
})
export class EditTaskPageComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    timeToDo: new FormControl(null, Validators.required)
  })
  editTaskId: string
  task: Task

  constructor(private tasksService: TasksService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router)
  {
    this.editTaskId = this.route.snapshot.paramMap.get('id')!

    this.tasksService.getTaskById(this.editTaskId).pipe(take(1)).subscribe((task: Task) => {
      task.timeToDo = task.timeToDo.toUpperCase() as TimeToDoEnum
      this.task = task
      console.log(task)
      console.log(this.task.timeToDo)

      this.form.setValue({
        title: task.title,
        description: task.description,
        timeToDo: task.timeToDo
      })
    })
  }

  changeTimeToDo(value: string) {
    this.form.patchValue({
      timeToDo: value
    })

  }

  editTask() {
    const task: Task = {
      title: this.form.value.title,
      description: this.form.value.description,
      isComplete: false,
      timeToDo: this.form.value.timeToDo
    }

    this.form.reset()

    this.tasksService.editTasks(this.editTaskId, task).pipe(take(1)).subscribe(() => {
      this.alertService.success('you successfully edired task')
      this.router.navigate(['dashboard'])
    }, (err) => {
      catchError(err)
      this.alertService.danger('something went wrong')
    })
  }


}
