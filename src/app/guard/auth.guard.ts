import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if the JWT token exists in localStorage
  const jwtToken = localStorage.getItem('jwt_token');

  if (jwtToken) {
    return true; // Allow access to the route
  }

  // Redirect to the login page if the token is not found
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false; // Deny access to the route
};