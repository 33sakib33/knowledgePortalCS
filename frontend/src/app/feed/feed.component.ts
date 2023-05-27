import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private contentService: ContentService) { }
  blogs = new Array();
  ngOnInit(): void {

    this.getContent();
  }
  ngOnChanges(): void {

    this.getContent();
  }
  getContent = () => {
    this.contentService.getAllContent().subscribe(
      response => {
        this.blogs = response.rows;
        console.log(this.blogs)
        console.log(this.blogs)
        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );
  }

}
