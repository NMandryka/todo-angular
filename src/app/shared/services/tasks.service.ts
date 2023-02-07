import {Injectable, Injector, OnInit} from "@angular/core";
import {fbDbResponse, Task} from "src/app/enviroments/interfaces";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../enviroments/enviroment";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class TasksService{

  userId: string
  constructor(private http: HttpClient,
              private injector: Injector) {
  }


  createDbForNewUser(userId: string): Observable<any> {
    const firstTask: Task = {
      timeToDo: "slow",
      title: "first task",
      description: "first task description",
      isComplete: false
    }
    return this.http.post(`${enviroment.firebase.fbDb}/users/${userId}/tasks.json`, firstTask)
  }
  getAll(): Observable<any> {

    const user = JSON.parse(localStorage.getItem('user')!)
    if(user) {
      this.userId = user.uid
    }

    return this.http.get(`${enviroment.firebase.fbDb}/users/${this.userId}/tasks.json`)
      .pipe(map((response: {[key: string]: any}) => {

        return Object
          .keys(response)
          .map((key) => ({
            ...response[key],
            id: key
          }))
      }))
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<any>(`${enviroment.firebase.fbDb}/users/${this.userId}/tasks.json`, task)
      .pipe(
        map((response: fbDbResponse) => {
          return {
            ...task,
            id: response.name
          }
        })
      )
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${enviroment.firebase.fbDb}/users/${this.userId}/tasks/${id}.json`)
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${enviroment.firebase.fbDb}/users/${this.userId}/tasks/${id}.json`)
  }
  editTasks(id: string, task: Task) {
    return this.http.patch(`${enviroment.firebase.fbDb}/users/${this.userId}/tasks/${id}.json`, task)
  }


}
