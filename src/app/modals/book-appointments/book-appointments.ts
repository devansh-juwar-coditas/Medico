import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { IBookAppointment } from '../../interfaces/appointments';
import { form, required, FormField } from '@angular/forms/signals';
import { clinicianId } from '../../shared/environment';

@Component({
  selector: 'app-book-appointments',
  imports: [FormField],
  templateUrl: './book-appointments.html',
  styleUrl: './book-appointments.scss',
})
export class BookAppointments {
  readonly dialogRef = inject(DialogRef);
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
  onBook(e: Event) {
    e.preventDefault();
    const bookedData = this.bookAppointmentModel();
    this.dialogRef.close({
      ...bookedData,
      clinicianId: clinicianId.id,
    });
  }
}
