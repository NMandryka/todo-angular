import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task, TimeToDo} from "../../enviroments/interfaces";
import {TasksService} from "../../shared/services/tasks.service";
import {ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss']
})
export class CreateTaskPageComponent implements OnInit, AfterContentChecked{

  form: FormGroup

  constructor(private tasksService: TasksService, private cdref: ChangeDetectorRef) {
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

    this.tasksService.createTask(task).subscribe((task) => console.log('added'))
  }


}
