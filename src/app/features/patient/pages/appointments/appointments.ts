import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { BookAppointments } from '../../../../modals/book-appointments/book-appointments';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../services/appointment-service';
import { IAppointments, IBookAppointment } from '../../../../interfaces/appointments';
import { form, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-appointments',
  imports: [RouterLink, FormField],
  templateUrl: './appointments.html',
  styleUrl: './appointments.scss',
})
export class Appointments implements OnInit {
  readonly dialog = inject(Dialog);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly appointmentService = inject(AppointmentService);
  showRescheduleForm = signal('');
  rescheduleModel = signal({ scheduleFor: '' });
  rescheduleForm = form(this.rescheduleModel, (path) => {
    required(path.scheduleFor, {
      message: 'Date is required!',
    });
  });
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
        this.isLoading.set(false);
      },
    });
  }

  checkIn(id: string) {
    this.appointmentService.checkInPatient(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loadAppointments();
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  cancel(id: string) {
    this.appointmentService.cancelAppointment(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loadAppointments();
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error(err);
        this.loadAppointments();
        this.isLoading.set(false);
      },
    });
  }

  toggleReschedule(id: string) {
    if (this.showRescheduleForm()) {
      this.showRescheduleForm.set('');
      this.rescheduleModel.set({ scheduleFor: '' });
    } else {
      this.showRescheduleForm.set(id);
      this.rescheduleModel.set({ scheduleFor: '' });
    }
  }

  onReschedule(e: Event) {
    e.preventDefault();
    const id = this.showRescheduleForm();
    const scheduleDate = this.rescheduleModel();
    this.appointmentService.rescheduleAppointment(id, scheduleDate).subscribe({
      next: (res: any) => {
        console.log(res);
        this.loadAppointments();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
