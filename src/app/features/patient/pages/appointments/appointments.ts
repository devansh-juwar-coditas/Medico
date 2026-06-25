import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { BookAppointments } from '../../../../modals/book-appointments/book-appointments';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../../services/appointment-service';
import { IBookAppointment } from '../../../../interfaces/appointments';

@Component({
  selector: 'app-appointments',
  imports: [],
  templateUrl: './appointments.html',
  styleUrl: './appointments.scss',
})
export class Appointments implements OnInit {
  readonly dialog = inject(Dialog);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly appointmentService = inject(AppointmentService);

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      if (this.router.url.includes('/appointments/book-appointment')) {
        console.log(true);

        this.dialog.open(BookAppointments, {
          disableClose: true,
        });
      }
    });
  }

  bookAppointments() {
    this.router.navigate(['patient/appointments/book-appointment']);
    const dialogRef = this.dialog.open(BookAppointments, {
      disableClose: true,
    });
 
  }
}
