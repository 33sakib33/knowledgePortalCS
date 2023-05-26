import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fullname: string = "";
  username: string = "";
  password: string = "";
  email: string = "";

  constructor(private loginService: LoginService, private route: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.username != "" && this.password != "" && this.email != "") {
      console.log("Registering User")
      var data = {
        fullName: this.fullname,
        email: this.email,
        userName: this.username,
        password: this.password
      }

      this.loginService.register(data).subscribe(
        response => {
          // console.log(response);
          this.route.navigate(['login']);
        },
        error => {
          // Handle authentication error
          console.error('Registration failed:', error);
        }
      );
    }
  }

  login() {
    this.route.navigate(['login']);
  }
}
