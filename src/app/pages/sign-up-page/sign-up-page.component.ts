import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {

  form: FormGroup

  constructor(public auth: AuthService) {
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
    this.auth.signUp(this.form.value.email, this.form.value.password)
      .then(() => console.log('sign up succesfully'))
  }

}
