import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../enviroments/interfaces";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  form: FormGroup

  constructor(private auth: AuthService) {

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

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(() => console.log('work'))
  }
}
