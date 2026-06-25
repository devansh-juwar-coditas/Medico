import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const clinicianGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  // const role = userService.role();
  const role = localStorage.getItem('role') 
  const router = inject(Router);
  if (role === 'CLINICIAN') {
    return true;
  }
  alert('Only Clincians can access these page!');
  router.navigate(['/login']);
  return false;
};
