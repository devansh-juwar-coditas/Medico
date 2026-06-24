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
    const role = this.userService.role();
    console.log(role);
  }
}
