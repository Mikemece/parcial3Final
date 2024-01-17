import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http:HttpClient) {}

  uploadImage(files: File[]): Observable<any> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    //return this.http.post<any>('http://localhost:8000/api/image/upload', formData);
    return this.http.post<any>('http://13.36.188.166:8000/api/image/upload', formData);
  }
}