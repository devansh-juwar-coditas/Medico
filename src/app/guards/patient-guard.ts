import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const patientGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const role = localStorage.getItem('role');
  const router = inject(Router);
  if (role === 'PATIENT') {
    return true;
  }
  alert('Only Patient can access this route!');
  router.navigate(['/login']);
  return false;
};
