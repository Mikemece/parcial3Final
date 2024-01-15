import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http:HttpClient) { }

  getAll() : Observable<any> {
    const url = 'http://localhost:8000/api/pruebas/';
    //const url = 'http://13.36.188.166:8000/api/pruebas/';
    return this.http.get<any>(url);
  }
}
