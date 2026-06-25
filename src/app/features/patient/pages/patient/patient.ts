import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user-service';
import { LandingHeader } from '../../../../layout/header/landing-header/landing-header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient',
  imports: [LandingHeader, RouterLink],
  templateUrl: './patient.html',
  styleUrl: './patient.scss',
})
export class Patient {
  logout() {}
}
