import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImagenService } from '../../services/imagen-serv/imagen.service';
import { PruebaService } from '../../services/prueba-serv/prueba.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
  providers: [ImagenService, PruebaService],
})
export class CrearComponent {
  selectedFiles: File[] = [];
  urls: any[] = [];
  fotos_subidas: boolean = false;
  evento_subido : boolean = false;

  constructor(
    private http: HttpClient,
    private imagenService: ImagenService,
    private router: Router,
    private pruebaService: PruebaService
  ) {}

  ngOnInit(): void {
    this.fotos_subidas = false;
    this.evento_subido = false;
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
      this.imagenService
        .uploadImage(this.selectedFiles)
        .subscribe((response) => {
          if (response) {
            this.urls = response.urls;
            //this.prueba.imagen = this.urls[0];
            this.fotos_subidas = true;
          }
        });
    }
  }

  onSubmit() {
    let organizador : any;
    // organizador = localStorage.getItem('email');
    // //this.prueba.organizador = 'diegolr02@uma.es';

    // //this.pruebaService.createPrueba(this.prueba).subscribe(response => {
    //   console.log(response);
    //   this.evento_subido = true;
    // });
     }
}
