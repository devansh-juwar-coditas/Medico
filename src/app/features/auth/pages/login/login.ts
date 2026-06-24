import { Component, inject, signal } from '@angular/core';
import { ILogin } from '../../../../interfaces/login/login';
import { email, form, required, FormField } from '@angular/forms/signals';
import { LandingHeader } from '../../../../layout/header/landing-header/landing-header';
import { LandingMain } from '../../../../layout/landing/landing-main/landing-main';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [LandingHeader, FormField, LandingMain, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly authService = inject(AuthService);

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
  onSubmit(e: Event) {
    e.preventDefault();
    const loginData = this.loginModel();
    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', JSON.stringify(res['accessToken']));
        localStorage.setItem('refresh-token', JSON.stringify(res['refreshToken']));

        alert('Login Successful');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
