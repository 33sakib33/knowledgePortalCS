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

  ngOnInit(): void {
  }

  handleImageUpload(event: any) {

  }
  createPost() {

  }
}
