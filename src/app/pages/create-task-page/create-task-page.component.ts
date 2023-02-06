import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../enviroments/interfaces";
import {TasksService} from "../../shared/services/tasks.service";

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss']
})
export class CreateTaskPageComponent implements OnInit{

  form: FormGroup

  constructor(private tasksService: TasksService) {
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

  // changeTimeToDo() {
  //   console.log(this.form.value.timeToDo)
  // }

  createTask() {
    const task: Task = {
      title: this.form.value.title,
      description: this.form.value.description,
      isComplete: false,
      timeToDo: 'fast'
    }

    this.form.reset()

    this.tasksService.createTask(task).subscribe((task) => console.log(task))
  }


}
