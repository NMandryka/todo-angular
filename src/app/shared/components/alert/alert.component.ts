import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertType} from "../../../enviroments/interfaces";
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy{

  delay = 5000
  public text: string
  public type: AlertType
  alertSub: Subscription

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy() {
    if(this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }
}
