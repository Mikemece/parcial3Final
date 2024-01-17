import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImagenService } from '../../services/imagen-serv/imagen.service';
import { PruebaService } from '../../services/prueba-serv/prueba.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Pago } from '../../interfaces/Pago';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
  providers: [ImagenService, PruebaService],
})
export class CrearComponent {
  email: any = localStorage.getItem('email')
  token: any = localStorage.getItem('email')
  selectedFiles: File[] = [];
  urls: any[] = [];
  fotos_subidas: boolean = false;
  evento_subido : boolean = false;
  pago: Pago = {
    id:'',
    timestamp: new Date(),
    email: '',
    concepto: '',
    token: '',
    importe: 0,
    imagen: '',
    localizacion: '',
    long: 0,
    lat: 0
  }

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
            this.pago.imagen = this.urls[0];
            this.fotos_subidas = true;
          }
        });
    }
  }

  onSubmit() {
    //this.pago.email = this.email;
    //this.pago.email = 'mcmiguel@uma.es';
    this.pago.token = '1234'; // esta hardcoded porque haciendo el examen no iba el oAuth
    this.pruebaService.newPago(this.pago).subscribe(response => {
      console.log(response);
      this.evento_subido = true;
    });
  }
}
