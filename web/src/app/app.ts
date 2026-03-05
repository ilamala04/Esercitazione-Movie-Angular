import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieList } from './components/movie/movie-list';
import { MovieItem } from "./components/movie/movie-item/movie-item";
import { MovieModal } from './components/movie/movie-modal/movie-modal';
import { Logout } from "./components/auth/logout/logout";
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieList, MovieModal, Logout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web');

  platformId = inject(PLATFORM_ID);

  isUserLogged() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') != null;
    }
    return false;
  }
}
