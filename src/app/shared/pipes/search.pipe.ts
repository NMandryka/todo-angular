import { Pipe, PipeTransform } from '@angular/core';
import {Task} from "../../core/interfaces/task/task.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Task[], title: string): Task[] {
    if(items) {
      return items.filter(item => item.title.toLowerCase().includes(title.toLowerCase()))
    }
    return items

  }

}
