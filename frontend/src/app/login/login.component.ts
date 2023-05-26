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

    constructor(private loginService:LoginService, private route: Router, private cookieService : CookieService) {
    }
    username : string = "";
    password :string = "";
    
    ngOnInit(): void {
    }
   
    login(){
      if(this.username != "" && this.password != "")
      {
        console.log("logging in")
        var data = {
          userName: this.username,
          password: this.password
        }

        this.loginService.login(data).subscribe(
          response => {
            // Assuming authentication is successful, store the token and user details in localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            console.log(response)
            this.cookieService.set('token', response['token'])
          },
          error => {
            // Handle authentication error
            console.error('Login failed:', error);
          }
        );
      }
    }

    register(){
      this.route.navigate(['register'])
    }

}
