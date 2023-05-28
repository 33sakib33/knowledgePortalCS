import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }
  // API_URL = "http://10.100.103.68:3000/geekbangla/api/content"
  API_URL = "http://localhost:3000/geekbangla/api/content"
  //API_URL = "192.168.0.101:3000/"

  createContent(data: any) {
    let token: any = localStorage.getItem('token')
    const header = new HttpHeaders().set('Authorization', token);
    return this.http.post<any>(`${this.API_URL}/create`, data, { headers: header });
  }

  updateContent(data: any) {
    return this.http.post<any>(`${this.API_URL}/update`, data);
  }

  getAllContent(data: any) {
    return this.http.post<any>(`${this.API_URL}/get`, data);
  }
  getContent(data: any) {
    return this.http.post<any>(`${this.API_URL}/get`, data);
  }

  searchContent(data: any) {
    return this.http.post<any>(`${this.API_URL}/get`, data);
  }
  getContentByTopic(data: any) {
    return this.http.post<any>(`${this.API_URL}/get`, data);

  }
  addFav(data: any) {
    let token: any = localStorage.getItem('token')
    const header = new HttpHeaders().set('Authorization', token);
    return this.http.post<any>(`${this.API_URL}/addFav`, data, { headers: header });

  }
  delete(data: any) {
    let token: any = localStorage.getItem('token')
    const header = new HttpHeaders().set('Authorization', token);
    return this.http.post<any>(`${this.API_URL}/delete`, data, { headers: header });
  }

}
