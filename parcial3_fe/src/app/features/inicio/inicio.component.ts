import { Component, OnInit } from '@angular/core';
import { OauthComponent } from '../oauth/oauth.component';
import { Router } from '@angular/router';
import { PruebaService } from '../../services/prueba-serv/prueba.service';
import { CommonModule } from '@angular/common';
import { Log } from '../../interfaces/Log';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [OauthComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  providers: [PruebaService]
})
export class InicioComponent implements OnInit {
  token: any = localStorage.getItem("token");
  email: any = localStorage.getItem("email");
  stored: boolean = false;

  log: Log = {
    tokenID: '',
    email: '',
    iat: new Date(),
    exp: new Date()
  };

  constructor(private pruebaService: PruebaService) { }

  prueba: any[] = [];

  //Para sacara los datos del tokenID
  tokenToJWT(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    var payload = JSON.parse(jsonPayload)
    console.log(payload)
    this.log.exp = new Date(payload.exp * 1000)
    this.log.iat = new Date(payload.iat * 1000)
    this.log.email = this.email
    this.log.tokenID = this.token
  }

  ngOnInit(): void {

    //Si hay token y no esta ya guardado lo guarda en un log
    if (this.token != null) {
      this.tokenToJWT(this.token);
      this.pruebaService.getLog(this.token).subscribe(data => {
        console.log('Ya almacenado')
      }, error => {
        this.pruebaService.postLog(this.log).subscribe(
          response => {
            console.log('Nuevo log creado: ', response);
          }, error => {
            console.error('Error creando log:', error);
          });
      }
      );
    }

    this.pruebaService.getAll().subscribe((data) => {
      this.prueba = data;
    })
  }

}