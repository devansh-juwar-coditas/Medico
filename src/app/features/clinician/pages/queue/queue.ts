import { Component, inject, OnInit, signal } from '@angular/core';
import { QueueService } from '../../../../services/queue-service';
import { IQueueInterface } from '../../../../interfaces/appointments';
import { AppointmentService } from '../../../../services/appointment-service';

@Component({
  selector: 'app-queue',
  imports: [],
  templateUrl: './queue.html',
  styleUrl: './queue.scss',
})
export class Queue implements OnInit {
  readonly queueService = inject(QueueService);
  readonly appointmentService = inject(AppointmentService);
  isLoading = signal<boolean>(false);
  queueData = signal<IQueueInterface[]>([]);
  callingId = signal<string>('');
  ngOnInit(): void {
    this.loadQueue();
  }
  loadQueue() {
    this.queueService.getQueue().subscribe({
      next: (res: any) => {
        console.log(res);
        this.queueData.set(res);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  callPatient(id: string) {
    this.callingId.set(id);

    this.appointmentService.callPatient(id).subscribe({
      next: (res: any) => {
        this.callingId.set('');
        this.loadQueue();
      },
      error: (err: any) => {
        console.log(err);
        this.callingId.set('');
      },
    });
  }
  startVisit(id: string) {
    this.callingId.set(id);
    this.appointmentService.visit(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.callingId.set('');
        this.loadQueue();
      },
      error: (err: any) => {
        console.error(err);
        this.callingId.set('');
      },
    });
  }
}
