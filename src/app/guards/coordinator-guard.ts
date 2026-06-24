import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const coordinatorGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const role = userService.role();
  const router = inject(Router);
  console.log('Role : ', role);

  if (role === 'COORDINATOR') {
    return true;
  }
  alert('Only Coordinators can access these page!');
  router.navigate(['/login']);
  return false;
};
