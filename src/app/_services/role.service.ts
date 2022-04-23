import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

const API = 'http://localhost:8090/api/role/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Role> {
    return this.http.get<Role>(API + 'get/' + id, httpOptions);
  }
}
