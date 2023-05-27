import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private route: ActivatedRoute, private contentService: ContentService) { }
  id: number = 0;
  blog: any = {};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      this.id = params['id'];
    });
    this.getContent()
  }
  getContent = () => {

    let data = {
      content: {
        id: this.id
      }
    }

    this.contentService.getContent(data).subscribe(
      response => {
        this.blog = response.rows[0];
        console.log(this.blog)
        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );

  }
}
