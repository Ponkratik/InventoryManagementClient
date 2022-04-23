import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../models/region.model';

const API = 'http://localhost:8090/api/region/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Region[]> {
    return this.http.get<Region[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Region> {
    return this.http.get<Region>(API + 'get/' + id, httpOptions);
  }
}
