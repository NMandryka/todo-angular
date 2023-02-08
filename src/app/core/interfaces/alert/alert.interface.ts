import {AlertEnum} from "../../enums/alert/alert.enum";

export type AlertType = AlertEnum

export interface Alert {
  type: AlertType
  text: string
}
