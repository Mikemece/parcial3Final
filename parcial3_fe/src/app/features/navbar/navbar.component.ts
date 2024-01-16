import { Component, OnInit } from '@angular/core';
import { OauthComponent } from '../oauth/oauth.component';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { OauthService } from '../../services/oauth-serv/oauth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [OauthComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [OauthService]
})
export class NavbarComponent{
  loggedIn = false;
  token = localStorage.getItem('token');

  constructor(private authService: SocialAuthService, private router: Router) {}

  ngOnInit(){
    if(this.token!=null && this.token!=undefined){
      this.loggedIn = true;
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