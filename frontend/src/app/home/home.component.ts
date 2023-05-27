import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post';
import { Story } from '../story';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LoginService } from '../login.service';
import { ContentService } from '../content.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  domsanitizer: DomSanitizer | undefined

  constructor(private loginService: LoginService, private contentService: ContentService, private route: Router, private sanitizer: DomSanitizer) { }
  isLoggedIn: boolean = false;
  postText: string = "";

  image: any
  uid: any
  uploadata = new FormData();

  stories: Story[] = []
  posts: Post[] = []
  images: String[] = []

  urls: SafeUrl[] = [];

  minioUrl = "http://10.100.103.50/story/story/"

  //minioUrl = "http://127.0.0.1:9000/stories/"

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    if (!this.isLoggedIn) {
      //alert("Logged In as .. " + String(this.username))
      //this.getStories();
      //this.getFeed();
    }
    // this.getContent();

  }

  private getUser() {
    return localStorage.getItem('username') || "";
  }

  onChanged(event: any) {
    this.image = event.target.files[0];
    this.uploadata.append('image', this.image);
  }

  logout(): void {
    this.loginService.logout();
    this.route.navigate(['login']);
  }

  // uploadPost(){
  //   var data = {
  //     //username : this.username,
  //     text : this.postText
  //   }
  //   this.userService.postStatus(data).subscribe((response: any) =>{
  //     console.log(response);
  //     this.getFeed();
  //     this.postText = ""
  //   });
  // }

  // uploadStory(){
  //   this.userService.addStory(this.uploadata).subscribe((response: { toString: () => any; })=>{
  //     alert(response.toString())
  //     this.getStories();
  //   });
  // }

  // getStories(){
  //   this.userService.getStories().subscribe((response: Story[])=>{
  //     this.stories = response
  //     var data = {
  //       'data' : this.stories
  //     }
  //     this.userService.getEncodedImages(data).subscribe((resp: { data: String[]; })=>{
  //       console.log(resp)
  //       this.images = resp.data
  //       this.urls = []
  //       for(var i=0; i<this.images.length; i++){
  //         this.urls.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + this.images[i]));
  //         //this.images[i] = this.domsanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.images[i])
  //       }

  //       console.log(this.images)
  //     });
  //     console.log(this.stories)

  //   });
  // }

  // getFeed(){
  //   this.userService.getFeed().subscribe((response: Post[])=>{
  //     this.posts = response
  //     console.log(this.posts)
  //   });
  // }

  // reloadCurrentRoute() {
  //   let currentUrl = this.route.url;
  //   this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
  //       this.route.navigate([currentUrl]);
  //   });
  // }

}
