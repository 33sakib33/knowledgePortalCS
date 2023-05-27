import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  
  @Input('type') type: string = '';
  @Output('ratingEmitter') ratingEmitter: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }
  stars: number[] = [1, 2, 3, 4, 5];
  currentRating: number = 0;

  highlightStars(rating: number) {
    this.currentRating = rating;
  }

  updateRating(rating: number) {
    this.currentRating = rating;
  }

  clicked() {
    this.ratingEmitter.emit(this.currentRating);
  }

}
