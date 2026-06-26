import { inject, Injectable } from '@angular/core';
import { IBookAppointment, IClinicians } from '../interfaces/appointments';
import { HttpClient } from '@angular/common/http';
import { environment } from '../shared/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  http = inject(HttpClient);
  bookAppointment(data: IBookAppointment) {
    return this.http.post(`${environment.baseUrl}/appointments`, data);
  }
  getAllClinicians() {
    return this.http.get<IClinicians[]>(`${environment.baseUrl}/clinicians`);
  }

  getAllAppointments() {
    return this.http.get(`${environment.baseUrl}/appointments`);
  }
  checkInPatient(id: string) {
    return this.http.post(`${environment.baseUrl}/appointments/${id}/check-in`, {});
  }
  completeIntake(data: any, id: string) {
    return this.http.post(`${environment.baseUrl}/appointments/${id}/intake`, data);
  }
  callPatient(id: string) {
    return this.http.post(`${environment.baseUrl}/appointments/${id}/call`, {});
  }
  completeAppointment(id: string) {
    return this.http.post(`${environment.baseUrl}/appointments/${id}/complete`, {});
  }
  cancelAppointment(id: string) {
    return this.http.post(`${environment.baseUrl}/appointments/${id}/cancel`, {});
  }
  rescheduleAppointment(id: string, scheduleFor: { scheduleFor: string }) {
    const scheduledFor = new Date(scheduleFor.scheduleFor).toISOString();

    return this.http.post(`${environment.baseUrl}/appointments/${id}/reschedule`, { scheduledFor });
  }
}
