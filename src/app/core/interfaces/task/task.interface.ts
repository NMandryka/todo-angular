import {TimeToDoEnum} from "../../enums/timeToDo/timeToDo.enum";

export interface Task {
  title: string
  description: string
  id?: string
  isComplete: boolean,
  timeToDo: TimeToDoEnum
}
