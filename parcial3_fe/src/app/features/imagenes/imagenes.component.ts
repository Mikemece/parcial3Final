import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImagenService } from '../../services/imagen-serv/imagen.service';

@Component({
  selector: 'app-imagenes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './imagenes.component.html',
  styleUrl: './imagenes.component.css',
  providers: [ImagenService]
})

export class ImagenesComponent implements OnInit{
  selectedFiles: File[] = [];
  urls: any[] = [];
  fotos_subidas: boolean = false;

  constructor(
    private http: HttpClient,
    private imagenService: ImagenService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.fotos_subidas = false;
  }

  // Cloudinary
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onButtonClicked(): void {
    if (this.selectedFiles.length > 0) {
      this.imagenService.uploadImage(this.selectedFiles).subscribe(response => {
        if (response) {
          this.urls = response.urls;
          console.log(this.urls);
          this.fotos_subidas = true;
        }
      });
    }
  }
}