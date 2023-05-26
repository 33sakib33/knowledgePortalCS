import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private route: Router, private cookieService: CookieService) {
  }
  email: string = "";
  password: string = "";
  str = "Explore and Learn";
  ngOnInit(): void {
  }

  login() {
    if (this.email != "" && this.password != "") {
      console.log("logging in")
      var data = {
        email: this.email,
        password: this.password
      }

      this.loginService.login(data).subscribe(
        response => {
          // Assuming authentication is successful, store the token and user details in localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.userName));
          console.log(response)
          this.cookieService.set('token', response['token'])
          this.route.navigate([''])
        },
        error => {
          // Handle authentication error
          console.error('Login failed:', error);
        }
      );
    }
  }

  register() {
    this.route.navigate(['register'])
  }
  // fn = async () => {
  //   try {
  //     let
  //   }
  //   catch (error) {
  //     throw Error(error)
  //   }
  // }

}
