import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {AlertService} from "../../shared/services/alert.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  form: FormGroup

  constructor(private auth: AuthService,
              private alertService: AlertService) {

  }
  ngOnInit() {
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

    if(this.form.invalid) {
      return;
    }

    try {
      this.auth.signIn(this.form.value.email, this.form.value.password)
        .then(
          (res) => {
            this.alertService.success('you successfully sing in')
          }
        )
    }
    catch (err) {
      this.alertService.danger('something went wrong...')
    }
  }
}
