import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-recommended-feed',
  templateUrl: './recommended-feed.component.html',
  styleUrls: ['./recommended-feed.component.css']
})
export class RecommendedFeedComponent implements OnInit {

  constructor(private contentService: ContentService) { }
  userId: any;
  blogs: any;
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) this.getContent();
  }
  getContent = () => {
    // window.location.reload();
    let data = {
      content: {
        type: "blog"
      }
    }
    this.contentService.getAllContent(data).subscribe(
      response => {
        this.blogs = response.rows;
        // console.log(this.blogs)
        console.log("In reccccc")
        console.log(this.blogs)
        console.log("In out reccccc")

        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );
  }
}