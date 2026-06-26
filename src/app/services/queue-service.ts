import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../shared/environment';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  http = inject(HttpClient);
  queueData = signal<any[]>([])
  
  getQueue() {
    return this.http.get(`${environment.baseUrl}/queue`);
  }
}
