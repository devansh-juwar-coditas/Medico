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
}
