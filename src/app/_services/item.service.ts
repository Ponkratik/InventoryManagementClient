import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

const API = 'http://localhost:8090/api/item/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(API + 'get/' + id, httpOptions);
  }

  add(item: Item): Observable<any> {
    return this.http.post(API + 'add/', item, httpOptions);
  }

  update(id: number, item: Item): Observable<any> {
    return this.http.put(API + 'update/' + id, item, httpOptions); 
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }
}
