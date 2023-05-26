import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  API_URL = "http://localhost:3000/geekbangla/api/user"
  //API_URL = "192.168.0.101:3000/"

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(data: any) {
    // Perform authentication logic, e.g., make an API call to verify credentials
    return this.http.post<any>(`${this.API_URL}/login`, data);
  }

  register(data: any) {
    return this.http.post<any>(`${this.API_URL}/create`, data);
  }

  logout(): void {
    // Remove the token and user details from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUserDetails(): any {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
}
