import { Component, inject, OnInit } from '@angular/core';
import { QueueService } from '../../../../services/queue-service';

@Component({
  selector: 'app-queue',
  imports: [],
  templateUrl: './queue.html',
  styleUrl: './queue.scss',
})
export class Queue implements OnInit {
  readonly queueService = inject(QueueService);
  ngOnInit(): void {
    this.loadQueue();
  }
  loadQueue() {
    this.queueService.getQueue().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
