import { Component, OnDestroy, inject } from '@angular/core';
import { Auth } from '../auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
 selector: 'app-logout',
 imports: [],
 templateUrl: './logout.html',
 styleUrl: './logout.css'
})
export class Logout implements OnDestroy {
 private authService: Auth = inject(Auth);
 private router: Router = inject(Router);
 private subscription: Subscription = new Subscription();

 onLogout(): void {
 this.subscription.add(
 this.authService.logout().subscribe({
 next: () => {
 localStorage.removeItem('token');
 this.router.navigate(['/login']);
 },
 error: (e: HttpErrorResponse) => {
 console.error(`An Error occurred: ${e}`);
 }
 })
 );
 }
 ngOnDestroy(): void {
 this.subscription.unsubscribe()
 }
}