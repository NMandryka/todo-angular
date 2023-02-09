import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {AlertService} from "../../../shared/components/alert/alert.service";



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required, Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required

    ])
  })
  showPassword = false

  constructor(private auth: AuthService,
              private alertService: AlertService) {}

  submit() {

    if(this.form.invalid) {
      return;
    }


    this.auth.signIn(this.form.value.email, this.form.value.password)
      .then(() => this.alertService.success('you successfully sing in'))

  }
}
