import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {AlertService} from "../../../alert/alert.service";


@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  form: FormGroup
  showPassword = false

  constructor(public auth: AuthService, private alertService: AlertService) {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required, Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6)
      ])
    })
  }

  submit() {
    try {
      this.auth.signUp(this.form.value.email, this.form.value.password)
        .then(() => this.alertService.success('you successfully created account'))
    }
    catch (err: any) {
      throw new Error(err)
    }
  }



}
