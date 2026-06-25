import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IBookAppointment, IClinicians } from '../../interfaces/appointments';
import { form, required, FormField } from '@angular/forms/signals';
import { clinicianId } from '../../shared/environment';
import { AppointmentService } from '../../services/appointment-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-appointments',
  imports: [FormField],
  templateUrl: './book-appointments.html',
  styleUrl: './book-appointments.scss',
})
export class BookAppointments implements OnInit {
  readonly dialogRef = inject(DialogRef);
  readonly router = inject(Router)

  clinicians = signal<IClinicians[]>([]);
  doctor = signal<string>('');
  readonly appointmentService = inject(AppointmentService);
  ngOnInit(): void {
    this.appointmentService.getAllClinicians().subscribe({
      next: (res: IClinicians[]) => {
        this.clinicians.set(res);
      },
    });
  }

  bookAppointmentModel = signal<IBookAppointment>({
    scheduledFor: '',
    reason: '',
    clinicianId: '',
  });
  bookAppointmentForm = form(this.bookAppointmentModel, (path) => {
    required(path.scheduledFor, {
      message: 'Please enter the date',
    });
    required(path.reason, {
      message: 'Please specifiy your reason for the visit',
    });
  });

  onChange(e: Event) {
    e.preventDefault();
    const value = (e.target as HTMLInputElement).value;
    // console.log(value);
    this.doctor.set(value);
  }

  onBook(e: Event) {
    e.preventDefault();
    const bookedData = this.bookAppointmentModel();
    const clinician: any = this.clinicians().filter((current) => current.name === this.doctor());
    if (!clinician) {
      return;
    }

    const data = {
      ...bookedData,
      scheduledFor: new Date(bookedData.scheduledFor).toISOString(),
      clinicianId: clinician[0].id,
    };

    this.appointmentService.bookAppointment(data).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/patient/appointments'])
  }
}
