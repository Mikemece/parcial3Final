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
export class InicioComponent implements OnInit {

  token: any = localStorage.getItem("token");
  email: any = localStorage.getItem("email");

  constructor(private pruebaService: PruebaService, private router: Router) { }
  pagos: any[] = [];

  ngOnInit(): void {
    this.pruebaService.getAll().subscribe((data) => {
      this.pagos = data;
    })
  }

  eliminar(idp: string){

    this.pruebaService.deletePago(idp).subscribe(response =>{
      location.reload();
    })
  }

  redirigirCrear(){
    this.router.navigate(['/crear']);
  }

}