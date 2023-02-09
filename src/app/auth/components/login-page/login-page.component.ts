import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {AlertService} from "../../../shared/alert/alert.service";
import {createPasswordStrengthValidator} from "../../../core/validators/create-strong-password.validator";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  form: FormGroup
  showPassword = false

  constructor(private auth: AuthService,
              private alertService: AlertService) {

  }
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required

      ])
    })
  }

  submit() {

    if(this.form.invalid) {
      return;
    }

    this.auth.signIn(this.form.value.email, this.form.value.password)
      .then(() => {
          this.alertService.success('you successfully sing in')
        }
      )
      .catch(() => this.alertService.danger('there is no user with this data'))

  }
}
