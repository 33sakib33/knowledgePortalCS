
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username!: any;

  constructor(private http: HttpClient) { }
  API_URL = "http://localhost:3000/geekbangla/api/user"

  // API_URL_1 = 'http://127.0.0.1/auth'
  // API_URL_2 = 'http://127.0.0.1/status'
  // API_URL_3 = 'http://127.0.0.1/story'

  getUser(data: any) {
    let token: any = localStorage.getItem('token')
    const header = new HttpHeaders().set('Authorization', token);
    // Perform authentication logic, e.g., make an API call to verify credentials
    return this.http.post<any>(`${this.API_URL}/get`, data, { headers: header });

  }


}
