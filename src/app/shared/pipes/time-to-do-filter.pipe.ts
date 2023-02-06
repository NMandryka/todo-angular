import { Pipe, PipeTransform } from '@angular/core';
import {Task} from "../../enviroments/interfaces";

@Pipe({
  name: 'timeToDoFilter'
})
export class TimeToDoFilterPipe implements PipeTransform {

  transform(items: Task[], timeToDo: string): Task[] {
    if(timeToDo === 'all') return items
    if(items) {
      return items.filter(item => item.timeToDo === timeToDo)
    }
    return items

  }

}
