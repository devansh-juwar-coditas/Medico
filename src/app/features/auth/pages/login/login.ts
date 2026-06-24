import { Component, inject, signal } from '@angular/core';
import { ILogin } from '../../../../interfaces/login/login';
import { email, form, required, FormField } from '@angular/forms/signals';
import { LandingHeader } from '../../../../layout/header/landing-header/landing-header';
import { LandingMain } from '../../../../layout/landing/landing-main/landing-main';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';
import { UserService } from '../../../../services/user-service';

@Component({
  selector: 'app-login',
  imports: [LandingHeader, FormField, LandingMain, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly authService = inject(AuthService);
  readonly userService = inject(UserService);
  readonly router = inject(Router);
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
  getUser() {
    this.userService.getUser().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  onSubmit(e: Event) {
    e.preventDefault();
    const loginData = this.loginModel();
    this.authService.login(loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res['accessToken']);
        localStorage.setItem('refresh-token', res['refreshToken']);

        alert('Login Successful');
        this.getUser();
        this.router.navigate(['/patient']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
