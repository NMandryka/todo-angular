import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Alert} from "../../core/interfaces/alert/alert.interface";
import {AlertEnum} from "../../core/enums/alert/alert.enum";


@Injectable({providedIn: 'root'})
export class AlertService {
  public alert$ = new Subject<Alert>()

  success(text: string) {
    this.alert$.next({type: AlertEnum.Success, text})
  }
  warning(text: string) {
    this.alert$.next({type: AlertEnum.Warning, text})
  }
  danger(text: string) {
    this.alert$.next({type: AlertEnum.Danger, text})
  }
}
