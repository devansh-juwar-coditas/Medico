import { Component, inject, OnInit, signal } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { form, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-intake',
  imports: [FormField],
  templateUrl: './intake.html',
  styleUrl: './intake.scss',
})
export class Intake implements OnInit {
  readonly appointmentService = inject(AppointmentService);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  appointmentId = signal<string>('');
  intakeModel = signal({
    props1: '',
    props2: '',
    props3: '',
  });
  intakeForm = form(this.intakeModel, (path) => {
    required(path.props1, {
      message: 'Please describe...',
    });
    required(path.props2, {
      message: 'Please describe',
    });
    required(path.props3, {
      message: 'Please describe',
    });
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.appointmentId.set(id);
    }
  }
  submitIntake(e: Event) {
    e.preventDefault();
    const data = this.intakeModel();
    if (!data) {
      return;
    }
    const answers: Record<string, string> = {};
    if (data.props1) {
      answers['props1'] = data.props1;
    }
    if (data.props2) {
      answers['props2'] = data.props2;
    }
    if (data.props3) {
      answers['props3'] = data.props3;
    }
    
    
  }
}
