export interface IAppointments {
  id: string;
  patientId: string;
  clinicianId: string;
  scheduledFor: string;
  reason: string;
  status: 'BOOKED' | 'CHECKED_IN' | 'CALLED' | 'IN_VISIT' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  patient: IPatient;
  clinician: IClinicians;
  intake: string | null;
}
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

export interface IPatient {
  id: string;
  name: string;
  email: string;
}

export interface IIntake {
  answers: {
    props1: string;
    props2: string;
    props3: string;
  };
}
