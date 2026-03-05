import { Routes } from '@angular/router';
import { MovieList } from './components/movie/movie-list';
import { Login } from './components/auth/login/login';
import { authGuard } from './components/auth/auth-guard';


export const routes: Routes = [
 {path: '', component: MovieList,
    canActivate: [authGuard]
 },
 {path: 'login', component: Login},
];