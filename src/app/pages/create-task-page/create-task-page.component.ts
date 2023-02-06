import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../enviroments/interfaces";
import {TasksService} from "../../shared/services/tasks.service";
import {ChangeDetectorRef } from '@angular/core';
import {catchError, Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss']
})
export class CreateTaskPageComponent implements OnInit, AfterContentChecked, OnDestroy{

  form: FormGroup
  createSub = Subscription

  constructor(private tasksService: TasksService,
              private cdref: ChangeDetectorRef,
              private alertService: AlertService) {
  }
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      description: new FormControl(null, [
        Validators.required
      ]),
      timeToDo: new FormControl('fast', )
    })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges()
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

    this.tasksService.createTask(task).subscribe(() => {
      this.alertService.success('You successfully added new task')
    }, (err) => {
      catchError(err)
      this.alertService.danger('something went wrong')
    })
  }

  ngOnDestroy() {

  }

}
