import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../../interfaces/Log';

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

  postLog(log : Log): Observable<any> {
    const url = 'http://localhost:8000/api/log/';
    //const url = 'http://13.36.188.166:8000/api/pruebas/';
    return this.http.post<any>(url, log);
  }

  getLogs(): Observable<any> {
    const url = 'http://localhost:8000/api/log/';
    return this.http.get<any>(url);
  }

  getLog(idl: string): Observable<any> {
    const url = 'http://localhost:8000/api/log/'+ idl + '/';
    return this.http.get<any>(url);
  }
}
