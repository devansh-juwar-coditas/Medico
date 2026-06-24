import { Component, signal } from '@angular/core';
import { LandingHeader } from '../../../../layout/header/landing-header/landing-header';
import { LandingMain } from '../../../../layout/landing/landing-main/landing-main';
import { IRegister } from '../../../../interfaces/register/register';
import { email, form, required, FormField } from '@angular/forms/signals';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [LandingHeader, LandingMain, FormField, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerModel = signal<IRegister>({
    email: '',
    password: '',
    name: '',
  });
  registerForm = form(this.registerModel, (path) => {
    required(path.email, {
      message: 'Email is required!',
    });
    email(path.email, {
      message: 'Enter valid email!',
    });
    required(path.password, {
      message: 'Password is required!',
    });
    required(path.name, {
      message: 'Name is required!',
    });
  });
  onSubmit(e: Event) {}
}
