import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }
  API_URL = "http://10.100.103.68:3000/geekbangla/api/content"
  //API_URL = "192.168.0.101:3000/"

  createContent(data: any) {
    return this.http.post<any>(`${this.API_URL}/create`, data);
  }

  updateContent(data: any) {
    return this.http.post<any>(`${this.API_URL}/update`, data);
  }

  getAllContent() {
    return this.http.post<any>(`${this.API_URL}/get`, {});
  }
  getContent(data: any) {
    return this.http.post<any>(`${this.API_URL}/get`,  data);
  }

  searchContent(data: any) {
    return this.http.post<any>(`${this.API_URL}/get`, data);
  }

}
