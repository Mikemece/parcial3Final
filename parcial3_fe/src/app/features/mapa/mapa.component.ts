import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit{
  location = {latitude: 36.7213, longitude: -4.4213};
  marker1 = {latitude: 37.7213, longitude: -5.4213};
  marker2 = {latitude: 36.7213, longitude: -4.0};
  private map!: L.Map;

  constructor(private http: HttpClient, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.initMap(this.location);
    //this.updateMarkers([this.marker1, this.marker2])
  }

  /**Inicia un mapa con la localización enviada por atributo.*/
  private initMap(location: { latitude: number; longitude: number }): void {

    this.map = L.map('map').setView([this.location.latitude, this.location.longitude], 200);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'  
    }).addTo(this.map);

    //POSIBLES MARCADORES QUE PODEIS PROBAR:
  
    L.marker([location.latitude, location.longitude])
      .addTo(this.map)
      .openPopup();

    /*L.circle([location.latitude, location.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);*/

    //L.circleMarker([location.latitude, location.longitude]).addTo(this.map).openPopup();

    //CON ESTO SE PUEDEN HACER LINEAS (es un polígono con 2 vertices)
    L.polygon([
      [this.marker1.latitude, this.marker1.longitude],
      [this.marker2.latitude, this.marker2.longitude]
      ]).addTo(this.map);
  }
  /**Crea un marker en cada posición enviada como array*/
  updateMarkers(markerLocations: { latitude: number; longitude: number }[]): void{
    for(const marker of markerLocations){
      this.location = marker;
      L.marker([marker.latitude, marker.longitude])
      .addTo(this.map)
      .openPopup();
    }
  }
}