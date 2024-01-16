import { Component, OnInit } from '@angular/core';
import { OauthComponent } from '../oauth/oauth.component';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { OauthService } from '../../services/oauth-serv/oauth.service';
import { Log } from '../../interfaces/Log';
import { PruebaService } from '../../services/prueba-serv/prueba.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [OauthComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [OauthService, PruebaService]
})

export class NavbarComponent{
  loggedIn = false;
  token: any = localStorage.getItem('token');
  email: any = localStorage.getItem("email");
  log: Log = {
    tokenID: '',
    email: '',
    iat: new Date(),
    exp: new Date()
  };

  constructor(private authService: SocialAuthService, private router: Router, private pruebaService: PruebaService) {}


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

  ngOnInit(){

    if(this.token!=null && this.token!=undefined){
      this.loggedIn = true;
    }

    //Si hay token y no esta ya guardado lo guarda en un log
    if (this.loggedIn) {
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
  }

  signOut(): void{
    this.authService.signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("photoUrl");
    location.reload();
  }

  redirigirSubirImagen(): void{
    this.router.navigate(['/imagenes']);
  }

  redirigirMapa(): void{
    this.router.navigate(['/mapa'])
  }
  redirigirLogs(): void{
    this.router.navigate(['/logs'])
  }

}