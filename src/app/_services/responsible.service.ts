import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsible } from '../models/responsible.model';

const API = 'http://localhost:8090/api/responsible/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Responsible[]> {
    return this.http.get<Responsible[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Responsible> {
    return this.http.get<Responsible>(API + 'get/' + id, httpOptions);
  }

  update(id: number, responsible: Responsible): Observable<any> {
    return this.http.put(API + 'update/' + id, responsible, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
}
