import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('user');

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = JSON.parse(user).role;
  const requiredRole = route.data['role'];

  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    alert('You do not have permission to access this page');
    router.navigate(['/records']);
    return false;
  }

  return true;
};
