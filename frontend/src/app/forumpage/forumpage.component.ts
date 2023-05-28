import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-forumpage',
  templateUrl: './forumpage.component.html',
  styleUrls: ['./forumpage.component.css']
})
export class ForumpageComponent implements OnInit {

  constructor(private contentService: ContentService, private route: ActivatedRoute, private commentService: CommentService) { }
  id: number = 0;
  blog: any = {};
  comments: any = {}
  newComment: string = "";
  userName: string | any = "";
  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: number; }) => {
      console.log(params)
      this.id = params['id'];
    });
    this.getContent()
    this.userName = localStorage.getItem('user');
  }
  getContent() {
    let data = {
      content: {
        id: this.id,
      }

    }
    this.contentService.getContentByTopic(data).subscribe(
      response => {
        this.blog = response.rows[0];

        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );
    let data2 = {
      comment: {
        contentId: this.id
      }
    }
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
