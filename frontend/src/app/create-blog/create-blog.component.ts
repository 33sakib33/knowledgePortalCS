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
  cats: any;
  ngOnInit(): void {
    this.getCategory()
  }

  handleImageUpload(event: any) {


  }
  createBlog() {
    if (!this.blogContent) return;
    let data = {
      content: {
        contentText: this.blogContent,
        type: 'blog',
        categoryId: this.selectedCategory,
        topic: this.cats[Number(this.selectedCategory)-1].topic,
        title: this.blogTitle,
      }
    }
    this.contentService.createContent(data).subscribe(
      response => {
        // Assuming authentication is successful, store the token and user details in localStorage
        alert("posted")
        console.log("posted")
        this.router.navigate([''])
      },
      error => {
        // Handle authentication error
        console.error('Login failed:', error);
      }
    );
  }
  getCategory() {

    this.contentService.getCategory().subscribe(
      response => {
        // Assuming authentication is successful, store the token and user details in localStorage
        this.cats = response;
        console.log(this.cats)
      },
      error => {
        // Handle authentication error
        console.error('Login failed:', error);
      }
    );
  }
}
