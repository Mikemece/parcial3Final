import { Component, OnInit } from '@angular/core';
import { OauthComponent } from '../oauth/oauth.component';
import { Router } from '@angular/router';
import { PruebaService } from '../../services/prueba-serv/prueba.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [OauthComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  providers: [PruebaService]
})
export class InicioComponent implements OnInit{
  token = localStorage.getItem("token");

  constructor(private router: Router, private pruebaService: PruebaService){}

  prueba : any[] = [];
  
  ngOnInit(): void {
    this.pruebaService.getAll().subscribe((data)=>{
      this.prueba = data;
    })
  }
}