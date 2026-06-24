import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = signal('');
  readonly http = inject(HttpClient);
  getUser() {
    return this.http.get('https://xhkrpfff-7000.inc1.devtunnels.ms/auth/me');
  }
}
