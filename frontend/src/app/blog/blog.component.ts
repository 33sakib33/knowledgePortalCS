import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private contentService: ContentService, private commentService: CommentService) { }
  id: number = 0;
  blog: any = {};
  comments: any;
  newComment: string = "";
  userId: any = -1;
  fav: boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      this.id = params['id'];
    });
    this.userId = localStorage.getItem("userId")
    this.getContent()
    this.isFav()

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
    this.blog.rating = rating;


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
          // alert("comment posted")
          this.newComment = ""
          this.getContent()
        },
        error => {
          // Handle authentication error
          console.error('Login failed:', error);
        }
      );
    }
  }

  addToFav() {
    let data = {
      contentId: this.id
    }
    this.contentService.addFav(data).subscribe(
      response => {

        console.log(response)
        // alert("added to favorites")
        window.location.reload()
        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );
  }
  isFav() {
    let data = {
      content: {
        id: this.id
      }
    }
    this.contentService.isFav(data).subscribe(
      response => {

        this.fav = response.status;
        // window.location.reload()
        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );
  }
  deleteFav() {
    let data = {
      content: {
        id: this.id
      }
    }
    this.contentService.deleteFav(data).subscribe(
      response => {

        this.fav = response.status;
        window.location.reload()
        // this.route.navigate(['login']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );
  }
  deleteContent() {
    let data = {
      content: {
        id: this.blog.id
      }
    }
    this.contentService.delete(data).subscribe(
      response => {


        alert("Deleted")
        this.router.navigate(['']);
      },
      error => {
        // Handle authentication error
        console.error('Registration failed:', error);
      }
    );

  }
}
