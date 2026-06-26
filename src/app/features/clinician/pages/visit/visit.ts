import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../../services/appointment-service';
import { IAppointments } from '../../../../interfaces/appointments';

@Component({
  selector: 'app-visit',
  imports: [],
  templateUrl: './visit.html',
  styleUrl: './visit.scss',
})
export class Visit implements OnInit {
  readonly router = inject(ActivatedRoute);
  readonly route = inject(Router);
  readonly appointmentService = inject(AppointmentService);
  appointmentId = signal<string>('');
  appointment = signal<IAppointments | null>(null);
  complete = signal<boolean>(false);
  summary = signal<string>('Patient has high fever. Take paracetamol post lunch for 3 days');
  ngOnInit(): void {
    const id = this.router.snapshot.params['id'];
    this.appointmentId.set(id);
    this.loadVisit(id);
  }
  loadVisit(id: string) {
    this.appointmentService.getAppointmentbyId(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.appointment.set(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  completeVisit() {
    this.complete.set(true);
    this.appointmentService.completeAppointment(this.appointmentId(), this.summary()).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
