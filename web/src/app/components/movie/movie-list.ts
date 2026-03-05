import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Movie } from '../../models/Movie';
import { MovieApi } from './movie-api';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieItem } from './movie-item/movie-item';
import { StreamingChannel } from '../../models/streaming_channels';
import { MovieModal } from "./movie-modal/movie-modal";

@Component({
  selector: 'app-movie-list',
  imports: [MovieItem, MovieModal],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit, OnDestroy {
  movieList:WritableSignal<Movie[]>=signal<Movie[]>(new Array<Movie>());
  channelList:WritableSignal<StreamingChannel[]>=signal<StreamingChannel[]>(new Array<StreamingChannel>());

  private subscription: Subscription = new Subscription();
  constructor(private api: MovieApi) { }
  ngOnInit(): void {
    this.onGetMovieList();
    this.onGetChannelList();
  }
  onGetChannelList(): void {
    this.subscription.add(
      this.api.getChannelList().subscribe({
        next: (channels: StreamingChannel[]) => {
          this.channelList.set(channels);
        },
        error: (e: HttpErrorResponse) => {
          console.error(
            `Cannot connect to API: Error: ${e.status} - ${e.message}`
          );
        }
      })
    );
  }
  onGetMovieList(): void {
    this.subscription.add(
      this.api.getMovieList().subscribe({
        next: (movieList: Movie[]): void => {
          this.movieList.set(movieList);
        },
        error: (e: HttpErrorResponse) => {
          throw Error(
            `Cannot connect to API: Error: ${e.status} - ${e.message}`
          );
        }
      })
    );
  }
  onDeleteMovie(movieId: number): void {
    this.subscription.add(
    this.api.deleteMovie(movieId).subscribe({
    error: (e: HttpErrorResponse) => {
      throw Error(
        `Cannot connect to API: Error: ${e.status} - ${e.message}`
        );
        },
        complete: () => {
        this.onGetMovieList();
        }
        })
        );
       }
       

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddMovie(movie: Movie) {
    this.subscription.add(
    this.api.addMovie(movie).subscribe({
    error: (e: HttpErrorResponse) => {
    console.log(e)
    },
    complete: (): void => {
    this.onGetMovieList();
    }
    })
    )
   }
   
  
}

