import { Routes } from '@angular/router';
import { Clinician } from './pages/clinician/clinician';
import { clinicianGuard } from '../../guards/clinician-guard';

export const clinicianRoutes: Routes = [
  {
    path: '',
    // canActivate: [clinicianGuard],
    component: Clinician,
    children: [
      {
        path: '',
        redirectTo: 'queue',
        pathMatch: 'full',
      },
      {
        path: 'queue',
        loadComponent: () => import('./pages/queue/queue').then((component) => component.Queue),
      },
    ],
  },
];
