import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'http://localhost:8090/api/itemattachment/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http: HttpClient) { }

  upload(id: number, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', API + 'add/item/' + id, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    
    return this.http.request(req);
  }

  getAll(id: number): Observable<any> {
    return this.http.get(API + 'get/item/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
}
