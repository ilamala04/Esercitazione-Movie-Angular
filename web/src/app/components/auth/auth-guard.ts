import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean => {
 const token: string | null = localStorage.getItem('token');
 const router: Router = inject(Router);
 if (!token) {
 router.navigate(['login'], {
 queryParams: {
 returnUrl: state.url
 }
 });
 return false;
 }
 return true;
};
