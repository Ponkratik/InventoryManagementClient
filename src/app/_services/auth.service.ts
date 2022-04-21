import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../models/region.model';
import { Role } from '../models/role.model';

const API = 'http://localhost:8090/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string, fio: string, roleByRoleId: Role, regionByRegionId: Region): Observable<any> {
    return this.http.post(API + 'signup', {
        username,
        password,
        fio,
        roleByRoleId,
        regionByRegionId
      }, httpOptions);
  }
}
