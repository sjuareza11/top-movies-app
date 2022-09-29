import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../../core/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() public movie: Movie = {} as Movie;

  constructor() {
  }

  ngOnInit(): void {
  }
}
