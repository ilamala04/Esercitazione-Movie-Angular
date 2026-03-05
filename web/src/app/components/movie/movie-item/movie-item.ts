import { Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { Movie } from '../../../models/Movie';
@Component({
  selector: 'app-movie-item',
  imports: [],
  templateUrl: './movie-item.html',
  styleUrl: './movie-item.css',
})
export class MovieItem {
  movie: InputSignal<Movie> = input.required()
  @Output() deleteMovieEvent: EventEmitter<Movie> = new EventEmitter()
 
  deleteMovie(): void {
  this.deleteMovieEvent.emit(this.movie());
  }

}
