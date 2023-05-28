import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private contentService: ContentService, private router: Router) { }
  blogs = new Array();
  searchParam: any = "";
  headTitle = "Latest";

  ngOnInit(): void {

    this.getContent();
  }
  ngOnChanges(): void {

    this.getContent();
  }
  getContent = () => {
    let data = {
      content: {
        type: "blog"
      }
    }
    this.contentService.getAllContent(data).subscribe(
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
  searchGet() {
    let data = {
      content: {

      },
      searchString: this.searchParam

    }
    this.contentService.getContent(data).subscribe(
      response => {
        this.blogs = response.rows;
        console.log(this.blogs)
        console.log(this.blogs)
        if (this.searchParam)
          this.headTitle = "Search result for" + " " + this.searchParam;
        else this.headTitle = "Latest"

        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );
  }
  createPost() {
    this.router.navigate(['createBlog'])
  }

}


