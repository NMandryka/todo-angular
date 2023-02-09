import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertType} from "../../../../core/interfaces/alert/alert.interface";
import {AlertService} from "../alert.service";
import {Subscription, take} from "rxjs";
import {AlertEnum} from "../../../../core/enums/alert/alert.enum";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  delay = 5000
  public text: string
  public type: AlertType
  alertSub: Subscription

  constructor(private alertService: AlertService) {
    this.alertSub = this.alertService.alert$.pipe(take(1)).subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  public get alertEnum() {
    return AlertEnum
  }

}
