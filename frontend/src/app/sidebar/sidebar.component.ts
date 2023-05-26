import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  authenticated = false;
  constructor(private loginService: LoginService, private route: Router) { }
  isLoggedIn = false;
  userName = "";
  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    if (this.isLoggedIn) {
      this.userName = this.loginService.getUserDetails();
    }
  }

  logout(): void {
    this.loginService.logout();
  }
  login() {
    console.log("here")
    this.route.navigate(['login']);
  }

}
