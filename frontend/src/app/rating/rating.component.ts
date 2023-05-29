import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  constructor(private contentService: ContentService) {

  }

  @Input('type') type: string = '';
  @Output('ratingEmitter') ratingEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Input() blog: any;
  ngOnInit(): void {
    // this.currentRating=this.blog.
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
    let data = {
      content: {
        id: this.blog.id,
        title: this.blog.title,
        contentText: this.blog.contentText,
        topic: this.blog.topic,
        type: this.blog.type,
        rating: this.blog.rating,
        shares: this.blog.shares,
        approve: this.blog.approve,
        categoryId: this.blog.categoryId
      },
      newRating: this.currentRating
    }
    this.contentService.updateContent(data).subscribe(response => {
      console.log(response)
      // Assuming authentication is successful, store the token and user details in localStorage

    },
      error => {
        // Handle authentication error
        console.error('Login failed:', error);
      })

  }

}
