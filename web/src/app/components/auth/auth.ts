import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  readonly API_URL: string = 'http://localhost:8000/dj-rest-auth';

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login/`, {
      username: username,
      password: password
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout/`, {});
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  saveToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}