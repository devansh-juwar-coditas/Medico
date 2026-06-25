import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { BookAppointments } from '../../../../modals/book-appointments/book-appointments';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../services/appointment-service';
import { IAppointments, IBookAppointment } from '../../../../interfaces/appointments';

@Component({
  selector: 'app-appointments',
  imports: [RouterLink],
  templateUrl: './appointments.html',
  styleUrl: './appointments.scss',
})
export class Appointments implements OnInit {
  readonly dialog = inject(Dialog);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly appointmentService = inject(AppointmentService);
  appointments = signal<IAppointments[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      if (this.router.url.includes('/appointments/book-appointment')) {
        console.log(true);

        this.dialog.open(BookAppointments, {
          disableClose: true,
        });
      }
    });

    this.loadAppointments();
  }

  bookAppointments() {
    this.router.navigate(['patient/appointments/book-appointment']);
    const dialogRef = this.dialog.open(BookAppointments, {
      disableClose: true,
    });
  }

  loadAppointments() {
    this.isLoading.set(true);
    this.appointmentService.getAllAppointments().subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading.set(false);
        this.appointments.set(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  checkIn(id: string) {
    this.appointmentService.checkInPatient(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  cancel(id: string) {}
}
