import { Component, signal } from '@angular/core';
import { ILogin } from '../../../../interfaces/login/login';
import { email, form, required, FormField } from '@angular/forms/signals';
import { LandingHeader } from "../../../../layout/header/landing-header/landing-header";
import { LandingMain } from "../../../../layout/landing/landing-main/landing-main";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [LandingHeader, FormField, LandingMain, RouterLink],
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
