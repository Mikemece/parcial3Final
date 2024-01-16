import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { ImagenesComponent } from './features/imagenes/imagenes.component';
import { MapaComponent } from './features/mapa/mapa.component';
import { LogComponent } from './features/log/log.component';
import { CrearComponent } from './features/crear/crear.component';

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
    },
    {
        path: 'logs',
        component: LogComponent,
        title: 'Logs'
    },
    {
        path: 'crear',
        component: CrearComponent,
        title: 'Crear'
    }
];
