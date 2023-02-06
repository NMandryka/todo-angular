import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../../shared/services/tasks.service";
import {Task} from "../../enviroments/interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-task-page',
  templateUrl: './edit-task-page.component.html',
  styleUrls: ['./edit-task-page.component.scss']
})
export class EditTaskPageComponent implements OnInit, AfterContentChecked{
  form: FormGroup
  editTaskId: string
  task: Task
  constructor(private tasksService: TasksService,
              private route: ActivatedRoute,
              private cdref: ChangeDetectorRef) {
  }
  ngOnInit() {

    this.editTaskId = this.route.snapshot.paramMap.get('id')!

    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      timeToDo: new FormControl(null, Validators.required)
    })

    this.tasksService.getTaskById(this.editTaskId).subscribe(task => {
      this.task = task
      this.form.setValue({
        title: task.title,
        description: task.description,
        timeToDo: task.timeToDo
      })
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

  editTask() {
    const task: Task = {
      title: this.form.value.title,
      description: this.form.value.description,
      isComplete: false,
      timeToDo: this.form.value.timeToDo
    }

    this.form.reset()

    this.tasksService.editTasks(this.editTaskId, task).subscribe((task) => console.log('added'))
  }


}
