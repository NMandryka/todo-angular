import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../core/interfaces/task/task.interface";
import {TasksService} from "../../core/services/tasks.service";
import {TimeToDoEnum} from "../../core/enums/timeToDo/timeToDo.enum";
import {catchError, Subscription} from "rxjs";
import {AlertService} from "../../shared/components/alert/alert.service";
import {trimValidator} from "../../core/validators/trim.validator";

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss']
})
export class CreateTaskPageComponent implements OnDestroy, AfterViewInit{

  form: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      trimValidator()
    ]),
    description: new FormControl(null, [
      Validators.required,
      trimValidator()
    ]),
    timeToDo: new FormControl(TimeToDoEnum.FAST)
  })

  createSub: Subscription

  constructor(private tasksService: TasksService,
              private alertService: AlertService,
              private cdr: ChangeDetectorRef
              ) {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }

  public get timeToDoEnum(): typeof TimeToDoEnum {
    return TimeToDoEnum
  }

  changeTimeToDo(value: string) {
    this.form.patchValue({
      timeToDo: value
    })
  }

  createTask() {
    const task: Task = {
      title: this.form.value.title,
      description: this.form.value.description,
      isComplete: false,
      timeToDo: this.form.value.timeToDo
    }

    this.form.reset()

    this.createSub = this.tasksService.createTask(task).subscribe(() => {
      this.alertService.success('You successfully added new task')
    }, (err) => {
      catchError(err)
      this.alertService.danger('something went wrong')
    })
  }

  ngOnDestroy() {
    if(this.createSub) {
      this.createSub.unsubscribe()
    }
  }



}
