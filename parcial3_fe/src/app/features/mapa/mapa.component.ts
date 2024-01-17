import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PruebaService } from '../../services/prueba-serv/prueba.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
  providers: [PruebaService]
})
export class MapaComponent implements OnInit{
  locations: any[] = [];
  pagos: any[] = [];
  longs: any[] = [];
  lats: any[] = [];
  private map!: L.Map;

  constructor(private http: HttpClient, private route: ActivatedRoute, private pruebaService: PruebaService){}
  
  ngOnInit(): void {
    this.pruebaService.getAll().subscribe((data) => {
      this.pagos = data;
      for (let i = 0; i < this.pagos.length; i++) {
        this.locations[i] = {latitude: this.pagos[i].lat, longitude: this.pagos[i].long}
        console.log(this.locations[i])
      }
      this.initMap(this.locations[0]);
    })

    //this.updateMarkers([this.marker1, this.marker2])
  }

  /**Inicia un mapa con la localización enviada por atributo.*/
  private initMap(location: { latitude: number; longitude: number }): void {

    this.map = L.map('map').setView([this.locations[0].latitude, this.locations[0].longitude], 200);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'  
    }).addTo(this.map);

    //POSIBLES MARCADORES QUE PODEIS PROBAR:
    for (let i = 0; i < this.locations.length; i++) {
        L.marker([this.locations[i].latitude, this.locations[i].longitude])
       .addTo(this.map)
       .openPopup();
    }

    }
    // L.marker([location.latitude, location.longitude])
    //   .addTo(this.map)
    //   .openPopup();

    /*L.circle([location.latitude, location.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);*/

    //L.circleMarker([location.latitude, location.longitude]).addTo(this.map).openPopup();

    //CON ESTO SE PUEDEN HACER LINEAS (es un polígono con 2 vertices)
    // L.polygon([
    //   [this.marker1.latitude, this.marker1.longitude],
    //   [this.marker2.latitude, this.marker2.longitude]
    //   ]).addTo(this.map);
  }
