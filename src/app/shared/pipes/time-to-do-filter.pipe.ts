import { Pipe, PipeTransform } from '@angular/core';
import {Task} from "../../core/interfaces/task/task.interface";
import {TimeToDoEnum} from "../../core/enums/timeToDo/timeToDo.enum";

@Pipe({
  name: 'timeToDoFilter'
})
export class TimeToDoFilterPipe implements PipeTransform {

  transform(items: Task[], timeToDo: string): Task[] {
    if(timeToDo === TimeToDoEnum.ALL) return items
    if(items) {
      return items.filter(item => item.timeToDo === timeToDo)
    }
    return items

  }

}
