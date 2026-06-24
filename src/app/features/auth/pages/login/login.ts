import { Component, signal } from '@angular/core';
import { ILogin } from '../../../../interfaces/login/login';
import { email, form, required, FormField } from '@angular/forms/signals';
import { LandingHeader } from "../../../../layout/header/landing-header/landing-header";

@Component({
  selector: 'app-login',
  imports: [LandingHeader, FormField],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginModel = signal<ILogin>({
    email: '',
    password: '',
  });
  loginForm = form(this.loginModel, (path) => {
    required(path.email, {
      message: 'Email is required!',
    });
    email(path.email, {
      message: 'Enter valid email!',
    });
    required(path.password, {
      message: 'Password is required!',
    });
  });
  onSubmit(e : Event) {

  }
}
