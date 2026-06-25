import { Routes } from '@angular/router';
import { Patient } from './pages/patient/patient';
import { patientGuard } from '../../guards/patient-guard';
import { Appointments } from './pages/appointments/appointments';
import { Queue } from './pages/queue/queue';
import { BookAppointments } from '../../modals/book-appointments/book-appointments';
import { Intake } from './pages/intake/intake';

export const patientRoutes: Routes = [
  {
    path: '',
    component: Patient,
    children: [
      {
        path: '',
        redirectTo: 'appointments',
        pathMatch: 'full',
      },
      {
        path: 'appointments',
        component: Appointments,
      },
      {
        path: 'queue',
        component: Queue,
      },
      {
        path: 'appointments/book-appointment',
        component: Appointments,
      },
      {
        path: 'appointments/:id/intake',
        component: Intake,
      },
    ],
  },
];
