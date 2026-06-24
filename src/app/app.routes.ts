import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('../app/features/auth/auth.routes').then((route) => route.authRoutes),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('../app/features/patient/patient.routes').then((route) => route.patientRoutes),
  },
  {
    path: 'compounder',
    loadChildren: () =>
      import('../app/features/compounder/compounder.routes').then(
        (route) => route.compounderRoutes,
      ),
  },
  {
    path: 'clinician',
    loadChildren: () =>
      import('../app/features/clinician/clinician.routes').then((route) => route.clinicianRoutes),
  },
];
