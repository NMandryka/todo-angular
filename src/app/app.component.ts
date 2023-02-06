import {Component} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {AlertService} from "./shared/services/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService, private alertService: AlertService) {
  }

  signOut() {
    try {
      this.auth.signOut()
        .then(() => {
          this.alertService.success('you successfully log out')
        })
    }
    catch (err: any) {
      this.alertService.danger('something went wrong')
      throw new Error(err)
    }

  }
}
