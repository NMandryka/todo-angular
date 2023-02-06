import {Injectable} from "@angular/core";
import {fbDbResponse, Task} from "src/app/enviroments/interfaces";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../enviroments/enviroment";

@Injectable({providedIn: 'root'})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {

    return this.http.get(`${enviroment.firebase.fbDb}/tasks.json`)
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
    return this.http.post<any>(`${enviroment.firebase.fbDb}/tasks.json`, task)
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
    return this.http.delete(`${enviroment.firebase.fbDb}/tasks/${id}.json`)
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${enviroment.firebase.fbDb}/tasks/${id}.json`)
  }
  editTasks(id: string, task: Task) {
    return this.http.patch(`${enviroment.firebase.fbDb}/tasks/${id}.json`, task)
  }


}
