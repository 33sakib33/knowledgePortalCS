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
  blogs = new Array();
  recommendations: any;
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    if (this.userId) this.train();
    if (this.userId) this.recommend();

  }
  train = () => {
    let data = {
      userId: this.userId
    }
    this.contentService.train(data).subscribe(
      response => {
        this.recommendations = response.recommendations;
        this.getContent(this.recommendations[0][0]);
        this.getContent(this.recommendations[1][0])
        this.getContent(this.recommendations[2][0])
        console.log(this.blogs)
        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );

  }
  recommend = () => {
    let data = {
      userId: this.userId
    }
    this.contentService.recommend(data).subscribe(
      response => {
        this.recommendations = response.recommendations;
        this.getContent(this.recommendations[0][0]);
        this.getContent(this.recommendations[1][0])
        this.getContent(this.recommendations[2][0])
        console.log(this.blogs)
        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );

  }
  getContent = (catId: any) => {
    // window.location.reload();
    console.log("hellllllooo")
    console.log(catId)
    let data = {
      content: {
        categoryId: catId,
        type: "blog"
      }
    }

    this.contentService.getAllContent(data).subscribe(
      response => {
        this.blogs = this.blogs.concat(response.rows);
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