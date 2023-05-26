import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  API_URL = "http://localhost:3000/geekbangla/api/comment"
  //API_URL = "192.168.0.101:3000/"

  createContent(data : any) {
    return this.http.post<any>(`${this.API_URL}/create`, data);
  }

  updateContent(data : any){
    return this.http.post<any>(`${this.API_URL}/update`, data);
  }

  getAllContent(){
    return this.http.post<any>(`${this.API_URL}/get`, {});
  }

  searchContent(data : any){
    return this.http.post<any>(`${this.API_URL}/get`, data);
  }
}
