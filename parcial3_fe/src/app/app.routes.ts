import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { ImagenesComponent } from './features/imagenes/imagenes.component';
import { MapaComponent } from './features/mapa/mapa.component';

export const routes: Routes = [

    {
        path: '',
        component: InicioComponent,
        title: 'Inicio'
    },
    {
        path: 'imagenes',
        component: ImagenesComponent,
        title: 'Imagenes'
    },    
    {
        path: 'mapa',
        component: MapaComponent,
        title: 'Mapa'
    }
];
