import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  API_URL = "http://10.100.103.68:3000/geekbangla/api/comment"
  //API_URL = "192.168.0.101:3000/"

  createComment(data: any) {
    let token: any = localStorage.getItem('token')
    const header = new HttpHeaders().set('Authorization', token);
    return this.http.post<any>(`${this.API_URL}/create`, data, { headers: header });
  }

  updateComment(data: any) {
    return this.http.post<any>(`${this.API_URL}/update`, data);
  }

  getAllComment(data: any) {
    return this.http.post<any>(`${this.API_URL}/get`, data);
  }

  searchComment(data: any) {
    return this.http.post<any>(`${this.API_URL}/get`, data);
  }
}
