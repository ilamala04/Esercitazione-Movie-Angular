import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movie } from '../../models/Movie';
import { Observable } from 'rxjs'; 
import { StreamingChannel } from '../../models/streaming_channels';
@Injectable({
 providedIn: 'root'
})
export class MovieApi {
 readonly API_URL: string = 'http://localhost:8000/api'
 private http: HttpClient = inject(HttpClient)
 constructor() { }
 // NEW!
 getMovieList(): Observable<Movie[]> {
 return this.http.get<Movie[]>(`${this.API_URL}/movies/`);
 }

 deleteMovie(movieId: number): Observable<Movie> {
  return this.http.delete<Movie>(`${this.API_URL}/movies/${movieId}/`)
 }
 getChannelList(): Observable<StreamingChannel[]> {
  return this.http.get<StreamingChannel[]>(
  `${this.API_URL}/channels/`
  )
 };

 addMovie(movie: Movie): Observable<Movie> {
   return this.http.post<Movie>(`${this.API_URL}/movies/`, {
     title: movie.title,
     description: movie.description,
     director:movie.director,
     streaming_channel: movie.streaming_channel.id
   });
 }
   
}