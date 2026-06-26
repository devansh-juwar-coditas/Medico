import { Component, inject, OnInit, signal } from '@angular/core';
import { QueueService } from '../../../../services/queue-service';

@Component({
  selector: 'app-compounder',
  imports: [],
  templateUrl: './compounder.html',
  styleUrl: './compounder.scss',
})
export class Compounder implements OnInit {
  readonly queueService = inject(QueueService);
  checkedInPatients = signal<any[]>([]);
  bookedPatients = signal<any[]>([]);
  queueData = signal<any[]>([]);
  ngOnInit(): void {
    this.loadQueue();
  }
  loadQueue() {
    this.queueService.getQueue().subscribe({
      next: (res: any) => {
        this.queueData.set(res);
        const checkedInData = this.queueData().filter((current) => current.status === 'CHECKED_IN');
        this.checkedInPatients.set(checkedInData);

        const bookedData = this.queueData().filter((current) => current.status === 'BOOKED');
        this.bookedPatients.set(bookedData);

        console.log('Checked in : ', this.checkedInPatients());
        console.log('Booked ', this.bookedPatients());
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
