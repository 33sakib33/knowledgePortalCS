import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private contentService: ContentService, private router: Router) { }
  selectedCategory: string = "";
  blogTitle: string = "";
  blogContent: string = ""
  ngOnInit(): void {
  }

  handleImageUpload(event: any) {

  }
  createBlog() {
    if (!this.blogContent) return;
    let data = {
      content: {
        contentText: this.blogContent,
        type: 'blog',
        topic: this.selectedCategory,
        title: this.blogTitle
      }
    }
    this.contentService.createContent(data).subscribe(
      response => {
        console.log(response)
        // Assuming authentication is successful, store the token and user details in localStorage
        this.router.navigate([''])
      },
      error => {
        // Handle authentication error
        console.error('Login failed:', error);
      }
    );
  }
}
