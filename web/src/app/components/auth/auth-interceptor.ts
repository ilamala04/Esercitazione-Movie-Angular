import { HttpErrorResponse, HttpEvent,HttpInterceptorFn} from '@angular/common/http';
  import { inject } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable, catchError, throwError } from 'rxjs';
  export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const router: Router = inject(Router);
   const token: string | null = localStorage.getItem('token');
   if (token) {
   req = req.clone({
   setHeaders: { Authorization: 'Token ' + token }
   });
   }
   return next(req).pipe(
   catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
   if (error.status === 401 || error.status === undefined) {
   localStorage.removeItem('token');
   router.navigate(['auth', 'login']);
   }
   return throwError(() => error);
   })
   );
  };
