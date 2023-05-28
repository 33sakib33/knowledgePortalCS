import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {





  constructor(private router: Router, private userService: UserService, private contentService: ContentService) { }

  userdata: any;
  authenticated: boolean = false;
  favCount: number = 0;
  createdCount: number = 0;

  ngOnInit(): void {
    console.log("here")
    this.getDetails()
    console.log("here")

  }

  // editProfile()
  // {
  //   this.router.navigate(['../editProfile']);
  // }

  getDetails() {

    let uid = localStorage.getItem('userId')
    let data = {
      user: {
        id: uid
      }
    }
    this.userService.getUser(data).subscribe(
      (response: any) => {
        // Assuming authentication is successful, store the token and user details in localStorage
        this.userdata = response[0]
        this.userdata.createdContent = this.userdata.createdContent.reverse()
        this.favCount = this.userdata.favvoriteContents.length;
        this.createdCount = this.userdata.createdContent.length;
        console.log("here1")
        console.log(this.userdata)
      },
      (error: any) => {
        // Handle authentication error
        console.error('Login failed:', error);
      }
    );
  }
  // getBlogs() {

  //   let uid = localStorage.getItem('userId')
  //   let data = {
  //     user: {
  //       id: uid
  //     }
  //   }
  //   this.userService.getUser(data).subscribe(
  //     (response: any) => {
  //       // Assuming authentication is successful, store the token and user details in localStorage
  //       this.userdata = response[0]
  //       console.log("here1")
  //       console.log(this.userdata)
  //     },
  //     (error: any) => {
  //       // Handle authentication error
  //       console.error('Login failed:', error);
  //     }
  //   );
  // }
}


