import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user-service';
import { LandingHeader } from '../../../../layout/header/landing-header/landing-header';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient',
  imports: [LandingHeader, RouterLink, RouterOutlet],
  templateUrl: './patient.html',
  styleUrl: './patient.scss',
})
export class Patient {
  readonly router = inject(Router);

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
