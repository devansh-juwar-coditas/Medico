import { Routes } from '@angular/router';
import { Patient } from './pages/patient/patient';
import { patientGuard } from '../../guards/patient-guard';

export const patientRoutes: Routes = [
  {
    path: '',
    canActivate: [patientGuard],
    component: Patient,
  },
];
