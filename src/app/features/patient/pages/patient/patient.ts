import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user-service';

@Component({
  selector: 'app-patient',
  imports: [],
  templateUrl: './patient.html',
  styleUrl: './patient.scss',
})
export class Patient implements OnInit {
  readonly userService = inject(UserService);
  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
