import { Routes } from '@angular/router';
import { Clinician } from './pages/clinician/clinician';
import { clinicianGuard } from '../../guards/clinician-guard';

export const clinicianRoutes: Routes = [
  {
    path: '',
    // canActivate: [clinicianGuard],
    component: Clinician,
  },
];
