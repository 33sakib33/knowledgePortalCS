import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private route: ActivatedRoute, private contentService: ContentService, private commentService: CommentService) { }
  id: number = 0;
  blog: any = {};
  comments: any;
  newComment: string = "";
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
    let data2 = {
      comment: {
        contentId: this.id
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
    this.commentService.getAllComment(data2).subscribe(
      response => {
        this.comments = response.rows;
        console.log(this.comments)
        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );

  }

  ratingReceived(rating: number) {
    console.log('rating received', rating)


  }

  makeComment = () => {
    if (this.newComment) {
      let pload = {
        comment: {
          text: this.newComment,
          contentId: this.id
        }
      }
      this.commentService.createComment(pload).subscribe(
        response => {
          // Assuming authentication is successful, store the token and user details in localStorage

        },
        error => {
          // Handle authentication error
          console.error('Login failed:', error);
        }
      );
    }
  }
}
