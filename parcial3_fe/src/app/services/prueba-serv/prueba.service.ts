import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../../interfaces/Log';
import { Pago } from '../../interfaces/Pago';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor(private http:HttpClient) { }

  getAll() : Observable<any> {
    //const url = 'http://localhost:8000/api/pagos/';
    const url = 'http://13.36.188.166:8000/api/pagos/';
    return this.http.get<any>(url);
  }

  newPago(pago :Pago): Observable<any>{
    //const url = 'http://localhost:8000/api/pagos/';
    const url = 'http://13.36.188.166:8000/api/pagos/';
    return this.http.post<any>(url, pago);
  }

  deletePago(idp: string): Observable<any>{
    //const url = 'http://localhost:8000/api/pagos/'+ idp +'/';
    const url = 'http://13.36.188.166:8000/api/pagos/'+ idp +'/';
    return this.http.delete<any>(url);
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
