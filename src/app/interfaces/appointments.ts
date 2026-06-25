export interface IAppointments {}
export interface IBookAppointment {
  scheduledFor: string;
  reason: string;
  clinicianId: string;
}

export interface IClinicians {
  id: string;
  name: string;
  specialty: string;
}
