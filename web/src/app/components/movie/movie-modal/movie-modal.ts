import { Component, EventEmitter, InputSignal, Output, input } from '@angular/core';
import { StreamingChannel } from '../../../models/streaming_channels';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Movie } from '../../../models/Movie';
import { ReactiveFormsModule } from
'@angular/forms';

@Component({
  selector: 'app-movie-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-modal.html',
  styleUrl: './movie-modal.css',
})
export class MovieModal {
  addMovieForm: FormGroup;
  
  channelList: InputSignal<StreamingChannel[]> = input.required<StreamingChannel[]>();

  @Output() addMovieEvent: EventEmitter<Movie> = new EventEmitter();


  constructor(private formBuilder: FormBuilder) {
    this.addMovieForm = this.formBuilder.group({
      title: [''],
      director: [''],
      description: [''],
      streaming_channel: ['']
    });
  }

  onSubmit(): void {
    if (this.addMovieForm.valid) {
      const formValue = this.addMovieForm.value;
      // In caso lo streaming_channel sia un id, ricostruiamo l'oggetto
      const selectedChannel = this.channelList().find(ch => ch.id == formValue.streaming_channel);
      this.addMovieEvent.emit({
        title: formValue.title,
        description: formValue.description,
        director:formValue.director,
        streaming_channel: selectedChannel
      } as Movie);

      // Reset del form
      this.addMovieForm.reset({ streaming_channel: '' });
    }
  }
}