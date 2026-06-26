import { Component, inject } from '@angular/core';
import { LandingHeader } from '../../../../layout/header/landing-header/landing-header';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-clinician',
  imports: [LandingHeader, RouterLink, RouterOutlet],
  templateUrl: './clinician.html',
  styleUrl: './clinician.scss',
})
export class Clinician {
  readonly router = inject(Router);
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
